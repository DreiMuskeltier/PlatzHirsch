import { prisma } from '../db/prisma';

export const favoriteRepository = {
  // Alle Favoriten eines Users oder Gastes laden (mit Ort-Daten)
  findAll(userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.favorite.findMany({
        where: { userId },
        include: { ort: { include: { tags: true } } }
      });
    }
    return prisma.favorite.findMany({
      where: { sessionId },
      include: { ort: { include: { tags: true } } }
    });
  },

  // Favorit hinzufügen
  add(ortId: string, userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.favorite.upsert({
        where: { userId_ortId: { userId, ortId } },
        update: {},
        create: { userId, ortId }
      });
    }
    return prisma.favorite.upsert({
      where: { sessionId_ortId: { sessionId: sessionId!, ortId } },
      update: {},
      create: { sessionId, ortId }
    });
  },

  // Favorit entfernen
  remove(ortId: string, userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.favorite.deleteMany({
        where: { userId, ortId }
      });
    }
    return prisma.favorite.deleteMany({
      where: { sessionId, ortId }
    });
  },

  // Prüfen ob ein Ort bereits favorisiert ist
  isFavorit(ortId: string, userId?: string, sessionId?: string) {
    if (userId) {
      return prisma.favorite.findUnique({
        where: { userId_ortId: { userId, ortId } }
      });
    }
    return prisma.favorite.findFirst({
      where: { sessionId, ortId }
    });
  }
};