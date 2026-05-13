import { describe, it, expect } from 'vitest';
import { OrtFactory } from './ort.factory';

describe('OrtFactory', () => {
    it('should transform a proposal (Vorschlag) into a valid Ort object', () => {
        const mockVorschlag = {
            id: 'v-1',
            name: 'Schöner Park',
            beschreibung: 'Ein toller Ort',
            lat: 53.5,
            lng: 10.0,
            createdById: 'user-99',
            status: 'BEANTRAGT'
        };

        const result = OrtFactory.fromVorschlag(mockVorschlag);

        expect(result).toEqual({
            name: 'Schöner Park',
            beschreibung: 'Ein toller Ort',
            lat: 53.5,
            lng: 10.0,
            createdById: 'user-99'
        });
    });

    it('should handle missing description by keeping it as undefined or null if that is the input', () => {
        const mockVorschlag = {
            name: 'Minimal Ort',
            lat: 0,
            lng: 0,
            createdById: 'user-1'
        };

        const result = OrtFactory.fromVorschlag(mockVorschlag);
        expect(result.name).toBe('Minimal Ort');
        expect(result.beschreibung).toBeUndefined();
    });
});
