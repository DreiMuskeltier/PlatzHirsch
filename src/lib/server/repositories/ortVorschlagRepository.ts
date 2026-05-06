import { prisma } from '../db/prisma';

export const ortVorschlagRepository = {
  create(data: any) {
    return prisma.ortVorschlag.create({ data });
  }
};