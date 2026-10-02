import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Products from '../Products';

describe('Products page', () => {
  it('loads products through React Query and renders product cards', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByRole('heading', { name: 'ASUS Dual GeForce RTX 2060 OC 6GB' })).toBeDefined();
    expect(screen.getByText(/63 products.*popular picks first/)).toBeDefined();
    expect(screen.getAllByRole('heading', { level: 2 })[0].textContent).toBe('AMD Ryzen 7 9800X3D');
  });
});