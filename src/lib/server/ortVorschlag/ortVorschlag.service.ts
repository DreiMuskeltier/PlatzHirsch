import { prisma } from '../db/prisma';
import { OrtVorschlagFactory } from './ortVorschlag.factory';

export class OrtVorschlagService {
static async getAll() {
    return prisma.ortVorschlag.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }


  static async create(input: any) {
    const data = OrtVorschlagFactory.create(input);

    return prisma.ortVorschlag.create({
      data
    });
  }
}