import { afterEach, describe, expect, it } from 'vitest';
import { useCartStore } from '../useCartStore';

afterEach(() => {
	useCartStore.setState({ items: [] });
});

describe('useCartStore', () => {
	it('adds multiple units and combines later additions for the same product', () => {
		const cart = useCartStore.getState();

		cart.addItem('cpu-amd-ryzen-7-9800x3d', 3);
		useCartStore.getState().addItem('cpu-amd-ryzen-7-9800x3d', 2);

		expect(useCartStore.getState().items).toEqual([
			{ productId: 'cpu-amd-ryzen-7-9800x3d', quantity: 5 },
		]);
		expect(useCartStore.getState().totalItems()).toBe(5);
	});

	it('updates and removes cart lines', () => {
		useCartStore.getState().addItem('gpu-msi-rtx-5070-gaming-trio', 2);
		useCartStore.getState().setQuantity('gpu-msi-rtx-5070-gaming-trio', 4);

		expect(useCartStore.getState().totalItems()).toBe(4);

		useCartStore.getState().removeItem('gpu-msi-rtx-5070-gaming-trio');
		expect(useCartStore.getState().items).toEqual([]);
	});
});