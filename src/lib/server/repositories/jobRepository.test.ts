import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jobRepository } from './jobRepository';
import { prisma } from '../db/prisma';

vi.mock('../db/prisma', () => ({
    prisma: {
        job: {
            findMany: vi.fn(),
        },
    },
}));

describe('jobRepository', () => {
    it('should find pending jobs', async () => {
        vi.mocked(prisma.job.findMany).mockResolvedValue([]);
        await jobRepository.findPending();
        expect(prisma.job.findMany).toHaveBeenCalledWith({
            where: { status: 'PENDING' }
        });
    });
});
