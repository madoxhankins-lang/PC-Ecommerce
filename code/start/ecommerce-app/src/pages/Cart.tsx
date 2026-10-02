import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import QuantityControl from '../components/QuantityControl';
import { useCartStore } from '../stores/useCartStore';
import type { Product } from '../types';

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

function Cart() {
	const items = useCartStore((state) => state.items);
	const setQuantity = useCartStore((state) => state.setQuantity);
	const removeItem = useCartStore((state) => state.removeItem);
	const productsQuery = useQuery<Product[], Error>({
		queryKey: ['products'],
		queryFn: fetchProducts,
		enabled: items.length > 0,
	});

	if (items.length === 0) {
		return (
			<main className="mx-auto max-w-3xl px-4 py-16 text-center">
				<h1 className="text-2xl font-semibold text-white">Your cart is empty</h1>
				<p className="mt-3 text-sm text-zinc-400">Choose a quantity on any product card to add it here.</p>
				<Link to="/products" className="mt-6 inline-block rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900">
					Browse products
				</Link>
			</main>
		);
	}

	if (productsQuery.isLoading) {
		return <p role="status" className="py-16 text-center text-zinc-300">Loading cart...</p>;
	}

	if (productsQuery.isError) {
		return <p role="alert" className="py-16 text-center text-zinc-300">Cart products could not be loaded.</p>;
	}

	const productsById = new Map(productsQuery.data.map((product) => [product.id, product]));
	const cartLines = items.flatMap((item) => {
		const product = productsById.get(item.productId);
		return product ? [{ product, quantity: item.quantity }] : [];
	});
	const subtotal = cartLines.reduce((total, item) => total + item.product.price * item.quantity, 0);

	return (
		<main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-zinc-100">Your cart</h1>
			<div className="mt-6 divide-y divide-white/10 border-y border-white/10">
				{cartLines.map(({ product, quantity }) => (
					<article key={product.id} className="flex flex-wrap items-center gap-4 py-5 sm:flex-nowrap">
						<img src={product.image} alt="" className="h-20 w-24 rounded bg-zinc-900 object-cover" />
						<div className="min-w-48 flex-1">
							<Link to={`/products/${product.id}`} className="font-semibold text-zinc-100 hover:text-sky-200">
								{product.name}
							</Link>
							<p className="mt-1 text-sm text-zinc-400">{currency.format(product.price)} each</p>
						</div>
						<QuantityControl
							value={quantity}
							max={Math.max(1, product.stock)}
							label={`Quantity for ${product.name}`}
							onChange={(nextQuantity) => setQuantity(product.id, nextQuantity)}
						/>
						<p className="w-24 text-right font-semibold text-white">{currency.format(product.price * quantity)}</p>
						<button
							type="button"
							onClick={() => removeItem(product.id)}
							className="text-sm text-zinc-400 underline decoration-white/20 underline-offset-4 hover:text-white"
						>
							Remove
						</button>
					</article>
				))}
			</div>
			<div className="ml-auto mt-6 max-w-sm border-t border-white/10 pt-4">
				<div className="flex justify-between text-lg font-semibold text-white">
					<span>Subtotal</span>
					<span>{currency.format(subtotal)}</span>
				</div>
				<p className="mt-2 text-xs text-zinc-500">Shipping and tax are not included in this demo.</p>
			</div>
		</main>
	);
}

export default Cart;
