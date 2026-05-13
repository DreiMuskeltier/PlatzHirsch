import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyButton from './MyButton.svelte';

describe('MyButton.svelte', () => {
    it('should render with the default label', () => {
        render(MyButton);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Click me');
    });

    it('should render with a custom label', () => {
        render(MyButton, { label: 'Submit' });
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Submit');
    });
});
