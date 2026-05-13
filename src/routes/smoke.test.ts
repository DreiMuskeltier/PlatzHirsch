import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page Smoke Test', () => {
    it('should render the home page without crashing', () => {
        render(Page);
        expect(screen.getByText('PLATZHIRSCH')).toBeTruthy();
        expect(screen.getByAltText('Hirsch')).toBeTruthy();
    });
});
