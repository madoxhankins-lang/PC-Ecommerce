import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
	it('shows the store navigation links', () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		expect(screen.getByRole('link', { name: 'PC Parts' })).toBeDefined();
		expect(screen.getByRole('link', { name: 'Products' })).toBeDefined();
		expect(screen.getByRole('link', { name: 'Cart' })).toBeDefined();
		expect(screen.getByRole('link', { name: 'My Orders' })).toBeDefined();
		expect(screen.getByRole('link', { name: 'Profile' })).toBeDefined();
	});

	it('opens the mobile navigation and closes it after navigation', async () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
		const mobileNavigation = screen.getByRole('complementary', { name: 'Mobile navigation' });

		expect(within(mobileNavigation).getByRole('link', { name: 'Products' })).toBeDefined();
		expect(within(mobileNavigation).getByRole('link', { name: 'My Orders' })).toBeDefined();
		fireEvent.click(within(mobileNavigation).getByRole('link', { name: 'Products' }));
		expect(screen.queryByRole('complementary', { name: 'Mobile navigation' })).toBeNull();
	});
});
