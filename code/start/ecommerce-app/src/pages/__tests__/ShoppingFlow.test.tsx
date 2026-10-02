import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import Header from '../../components/Header';
import { useCartStore } from '../../stores/useCartStore';
import Cart from '../Cart';
import ProductDetail from '../ProductDetail';
import Products from '../Products';

const productName = 'AMD Ryzen 7 9800X3D';

afterEach(() => {
  act(() => useCartStore.setState({ items: [] }));
});

describe('shopping flow', () => {
  it('opens a product, adds quantities from detail and listing, then shows the merged cart', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: 60_000 } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/products']}>
          <Header />
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const productLink = await screen.findByRole('link', { name: productName });
    act(() => fireEvent.click(productLink));
    expect(await screen.findByRole('heading', { name: productName })).toBeDefined();

    act(() => fireEvent.click(screen.getByRole('button', { name: `Increase Quantity for ${productName}` })));
    act(() => fireEvent.click(screen.getByRole('button', { name: 'Add to cart' })));
    expect(await screen.findByText('Added 2 to cart')).toBeDefined();

    act(() => fireEvent.click(screen.getByRole('link', { name: 'Back to products' })));
    const productHeading = await screen.findByRole('heading', { name: productName });
    const productCard = productHeading.closest('article');
    expect(productCard).not.toBeNull();

    act(() => fireEvent.click(within(productCard as HTMLElement).getByRole('button', { name: `Increase Quantity for ${productName}` })));
    act(() => fireEvent.click(within(productCard as HTMLElement).getByRole('button', { name: 'Add to cart' })));
    expect(await screen.findByRole('link', { name: 'Cart (4)' })).toBeDefined();

    act(() => fireEvent.click(screen.getByRole('link', { name: 'Cart (4)' })));
    expect(await screen.findByRole('heading', { name: 'Your cart' })).toBeDefined();
    expect((screen.getByRole('spinbutton', { name: `Quantity for ${productName}` }) as HTMLInputElement).value).toBe('4');
    const subtotalRow = screen.getByText('Subtotal').parentElement;
    expect(within(subtotalRow as HTMLElement).getByText('$1,919.96')).toBeDefined();
  });
});