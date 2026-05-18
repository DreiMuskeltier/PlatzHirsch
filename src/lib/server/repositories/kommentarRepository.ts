import { prisma } from '../db/prisma';

export const kommentarRepository = {

  // 👉 Neuen Kommentar erstellen
  create(data: {
    text: string;
    userId: string;
    ortId: string;
  }) {
    return prisma.kommentar.create({
      data
    });
  },

  // 👉 Alle Kommentare eines Orts laden
  findByOrtId(ortId: string) {
    return prisma.kommentar.findMany({
      where: {
        ortId
      },

      include: {
        user: true
      },

      orderBy: {
        createdAt: 'desc'
      }
    });
  }

};