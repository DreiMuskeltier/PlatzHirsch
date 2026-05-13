import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Login Page Smoke Test', () => {
    it('should render the login page without crashing', () => {
        render(Page, { form: { error: undefined } });
        
        // Check for elements that should always be there
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Passwort')).toBeTruthy();
        expect(screen.getByText('Als Gast fortfahren')).toBeTruthy();
    });

    it('should show error message if form has error', () => {
        render(Page, { form: { error: 'Invalid credentials' } });
        expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
});
