import { render } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Map from './Map.svelte';

// Mock Leaflet because it doesn't play well with jsdom's lack of layout
vi.mock('leaflet', () => {
    const L = {
        map: vi.fn().mockReturnValue({
            setView: vi.fn().mockReturnThis(),
            remove: vi.fn(),
            addLayer: vi.fn().mockReturnThis(),
            addTo: vi.fn().mockReturnThis(),
            on: vi.fn(),
            off: vi.fn(),
        }),
        tileLayer: vi.fn().mockReturnValue({
            addTo: vi.fn().mockReturnThis(),
        }),
        Icon: {
            Default: {
                prototype: {},
                mergeOptions: vi.fn()
            }
        },
        marker: vi.fn().mockReturnValue({
            addTo: vi.fn().mockReturnThis(),
            bindPopup: vi.fn().mockReturnThis(),
        }),
        popup: vi.fn().mockReturnValue({
            setContent: vi.fn().mockReturnThis(),
        })
    };
    return {
        ...L,
        default: L
    };
});

// Mock fetch for ladeOrte
global.fetch = vi.fn();

describe('Map.svelte', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(fetch).mockResolvedValue({
            json: async () => []
        } as any);
    });

    it('should render the map container', async () => {
        const { container } = render(Map);
        const mapDiv = container.querySelector('.map');
        expect(mapDiv).toBeTruthy();
    });
});
