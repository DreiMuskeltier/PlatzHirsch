import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ortRepository } from './ortRepository';
import { prisma } from '../db/prisma';

vi.mock('../db/prisma', () => ({
    prisma: {
        ort: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
        },
    },
}));

describe('ortRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should find all locations', async () => {
        const mockOrte = [{ id: '1', name: 'Ort 1' }];
        vi.mocked(prisma.ort.findMany).mockResolvedValue(mockOrte as any);

        const result = await ortRepository.findAll();
        expect(result).toEqual(mockOrte);
        expect(prisma.ort.findMany).toHaveBeenCalled();
    });

    it('should find location by id', async () => {
        const mockOrt = { id: '123', name: 'Target' };
        vi.mocked(prisma.ort.findUnique).mockResolvedValue(mockOrt as any);

        const result = await ortRepository.findById('123');
        expect(result).toEqual(mockOrt);
        expect(prisma.ort.findUnique).toHaveBeenCalledWith({
            where: { id: '123' }
        });
    });

    it('should search by name', async () => {
        vi.mocked(prisma.ort.findMany).mockResolvedValue([]);
        await ortRepository.searchByName('Park');
        expect(prisma.ort.findMany).toHaveBeenCalledWith({
            where: {
                name: { contains: 'Park' }
            }
        });
    });

    it('should find in bounding box', async () => {
        vi.mocked(prisma.ort.findMany).mockResolvedValue([]);
        const bounds = { minLat: 10, maxLat: 20, minLng: 30, maxLng: 40 };
        await ortRepository.findInBoundingBox(bounds);
        expect(prisma.ort.findMany).toHaveBeenCalledWith({
            where: {
                lat: { gte: 10, lte: 20 },
                lng: { gte: 30, lte: 40 }
            }
        });
    });
});
