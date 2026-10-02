import { create } from 'zustand';

interface CartItem {
	productId: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addItem: (productId: string, quantity: number) => void;
	setQuantity: (productId: string, quantity: number) => void;
	removeItem: (productId: string) => void;
	totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	addItem: (productId, quantity) => {
		if (!productId || !Number.isInteger(quantity) || quantity < 1) {
			return;
		}

		set((state) => {
			const existingItem = state.items.find((item) => item.productId === productId);

			if (existingItem) {
				return {
					items: state.items.map((item) =>
						item.productId === productId
							? { ...item, quantity: item.quantity + quantity }
							: item,
					),
				};
			}

			return { items: [...state.items, { productId, quantity }] };
		});
	},
	setQuantity: (productId, quantity) => {
		if (!Number.isInteger(quantity)) {
			return;
		}

		set((state) => ({
			items:
				quantity < 1
					? state.items.filter((item) => item.productId !== productId)
					: state.items.map((item) =>
							item.productId === productId ? { ...item, quantity } : item,
						),
		}));
	},
	removeItem: (productId) => {
		set((state) => ({
			items: state.items.filter((item) => item.productId !== productId),
		}));
	},
	totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));
