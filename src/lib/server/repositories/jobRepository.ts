import { prisma } from '../db/prisma';

export const jobRepository = {
  findPending() {
    return prisma.job.findMany({
      where: { status: "PENDING" }
    });
  }
};