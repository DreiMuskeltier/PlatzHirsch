import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrtVorschlagService } from './ortVorschlag.service';
import { prisma } from '../db/prisma';

// 1. Mock the Prisma client
vi.mock('../db/prisma', () => ({
    prisma: {
        ortVorschlag: {
            create: vi.fn(),
            findMany: vi.fn(),
        },
    },
}));

describe('OrtVorschlagService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a new location proposal', async () => {
        const mockInput = {
            name: 'Test Park',
            beschreibung: 'A nice park',
            lat: 52.5,
            lng: 13.4,
            userId: 'user-123'
        };

        const mockResult = {
            id: 'proposal-1',
            ...mockInput,
            status: 'BEANTRAGT',
            createdAt: new Date()
        };

        // 2. Tell the mock what to return
        vi.mocked(prisma.ortVorschlag.create).mockResolvedValue(mockResult as any);

        const result = await OrtVorschlagService.create(mockInput);

        // 3. Assertions
        expect(prisma.ortVorschlag.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                name: 'Test Park',
                createdById: 'user-123',
                status: 'BEANTRAGT'
            })
        });
        expect(result).toEqual(mockResult);
    });

    it('should return all proposals ordered by date', async () => {
        const mockList = [{ id: '1', name: 'Ort 1' }, { id: '2', name: 'Ort 2' }];
        vi.mocked(prisma.ortVorschlag.findMany).mockResolvedValue(mockList as any);

        const result = await OrtVorschlagService.getAll();

        expect(prisma.ortVorschlag.findMany).toHaveBeenCalledWith({
            orderBy: { createdAt: 'desc' }
        });
        expect(result).toHaveLength(2);
    });
});
