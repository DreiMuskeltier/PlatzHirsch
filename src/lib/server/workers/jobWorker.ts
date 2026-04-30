import { prisma } from '../db/prisma';
import { sendEmail } from '../services/emailService';
import { JobTypes } from '../queue/jobTypes';
import type {JobType, JobPayloadMap } from '../queue/jobTypes';



// 🔥 Helper für typisiertes Parsing
function parsePayload<T extends JobType>(
  job: { type: T; payload: string }
): JobPayloadMap[T] {
  return JSON.parse(job.payload);
}

export async function runWorker() {
  const jobs = await prisma.job.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    take: 5
  });

  for (const job of jobs) {
    try {
      await prisma.job.update({
        where: { id: job.id },
        data: { status: "PROCESSING" }
      });

      // 🔥 Typisiertes Payload
      const payload = parsePayload(job as any);

      switch (job.type as JobType) {
        case JobTypes.ORT_UPDATED:
          await handleOrtUpdated(payload as JobPayloadMap["ORT_UPDATED"]);
          break;

        case JobTypes.NEW_COMMENT:
          // optional später
          break;

        default:
          throw new Error(`Unbekannter Job-Typ: ${job.type}`);
      }

      await prisma.job.update({
        where: { id: job.id },
        data: { status: "DONE" }
      });

    } catch (err) {
      const attempts = job.attempts + 1;

      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: attempts > 3 ? "FAILED" : "PENDING",
          attempts: { increment: 1 },
          lastError: String(err)
        }
      });
    }
  }
}

// 🔥 verbessert (parallel)
async function handleOrtUpdated(payload: { ortId: string }) {
  const favorites = await prisma.favorite.findMany({
    where: { ortId: payload.ortId },
    include: { user: true }
  });

  await Promise.all(
    favorites.map(fav =>
      sendEmail(
        fav.user.email,
        "Ort wurde aktualisiert",
        `Ein gespeicherter Ort wurde geändert.`
      )
    )
  );
}