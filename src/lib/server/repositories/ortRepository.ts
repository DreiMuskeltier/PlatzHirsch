import { prisma } from '../db/prisma';

export const ortRepository = {

  // 👉 Alle Orte (alle sind bereits freigegeben)
  findAll() {
    return prisma.ort.findMany();
  },

  // 👉 Einzelnen Ort laden
  findById(id: string) {
    return prisma.ort.findUnique({
      where: { id }
    });
  },

  // 👉 Suche nach Name
  searchByName(query: string) {
    return prisma.ort.findMany({
      where: {
        name: {
          contains: query
        }
      }
    });
  },
  findInBoundingBox(bounds: {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}) {
  return prisma.ort.findMany({
    where: {
      lat: {
        gte: bounds.minLat,
        lte: bounds.maxLat
      },
      lng: {
        gte: bounds.minLng,
        lte: bounds.maxLng
      }
    }
  });
}
};