import { prisma } from '../db/prisma';
import type { JobType, JobPayloadMap } from './jobTypes';

export async function enqueueJob<T extends JobType>(
  type: T,
  payload: JobPayloadMap[T]
) {
  return prisma.job.create({
    data: {
      type,
      payload: JSON.stringify(payload),
      status: "PENDING"
    }
  });
}