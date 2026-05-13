import { vi } from 'vitest';
import { readable } from 'svelte/store';

// Mock SvelteKit modules
vi.mock('$app/navigation', () => ({
    goto: vi.fn(),
    afterNavigate: vi.fn(),
    beforeNavigate: vi.fn(),
}));

vi.mock('$app/stores', () => ({
    page: readable({
        url: new URL('http://localhost'),
        params: {},
        route: { id: '/' },
        status: 200,
        error: null,
        data: {},
        form: null
    }),
    navigating: readable(null),
    updated: readable(false),
}));

// Mock SvelteKit environment
vi.mock('$app/environment', () => ({
    browser: true,
    dev: true,
    building: false,
    version: 'test'
}));
