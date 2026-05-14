import { prisma } from '../db/prisma';

export const bewertungenRepository = {
  // Bewertung speichern oder updaten
  upsert(ortId: string, sterne: number, userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.bewertung.upsert({
        where: { userId_ortId: { userId, ortId } },
        update: { sterne },
        create: { userId, ortId, sterne }
      });
    }
    return prisma.bewertung.upsert({
      where: { sessionId_ortId: { sessionId: sessionId!, ortId } },
      update: { sterne },
      create: { sessionId, ortId, sterne }
    });
  },

  // Alle Bewertungen eines Users oder Gastes laden
  findAll(userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.bewertung.findMany({
        where: { userId }
      });
    }
    return prisma.bewertung.findMany({
      where: { sessionId }
    });
  },

  // Einzelne Bewertung laden
  findOne(ortId: string, userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.bewertung.findUnique({
        where: { userId_ortId: { userId, ortId } }
      });
    }
    return prisma.bewertung.findFirst({
      where: { sessionId, ortId }
    });
  }
};