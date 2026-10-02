import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../stores/useCartStore';
import QuantityControl from './QuantityControl';

interface ProductCardProps {
	product: Product;
}

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

function ProductCard({ product }: ProductCardProps) {
	const featuredSpecification = Object.entries(product.specifications)[0];
	const [quantity, setQuantity] = useState(1);
	const [addedMessage, setAddedMessage] = useState('');
	const inCartQuantity = useCartStore(
		(state) => state.items.find((item) => item.productId === product.id)?.quantity ?? 0,
	);
	const addItem = useCartStore((state) => state.addItem);
	const availableQuantity = product.stock - inCartQuantity;
	const quantityLimit = Math.max(1, availableQuantity);

	const handleAddToCart = () => {
		addItem(product.id, quantity);
		setAddedMessage(`Added ${quantity} to cart`);
		setQuantity(1);
	};

	return (
		<article className="overflow-hidden rounded border border-white/10 bg-zinc-900">
			<Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
				<img
					src={product.image}
					alt=""
					className="aspect-[4/3] w-full bg-zinc-800 object-cover"
				/>
			</Link>
			<div className="space-y-3 p-4">
				<div className="flex items-center justify-between gap-3">
					<span className="text-xs font-semibold uppercase text-sky-300">
						{product.category.replace('-', ' ')}
					</span>
					<div className="flex items-center gap-2">
						{product.popularityRank !== undefined && product.popularityRank <= 5 && (
							<span className="text-xs font-medium text-amber-300">Popular</span>
						)}
						<span className="text-xs text-zinc-400">{product.brand}</span>
					</div>
				</div>
				<h2 className="min-h-12 text-base font-semibold text-zinc-100">
					<Link to={`/products/${product.id}`} className="hover:text-sky-200">
						{product.name}
					</Link>
				</h2>
				<p className="line-clamp-2 min-h-10 text-sm text-zinc-300">{product.description}</p>
				{featuredSpecification && (
					<p className="text-xs text-zinc-400">
						{featuredSpecification[0]}: {featuredSpecification[1]}
					</p>
				)}
				<div className="flex items-end justify-between border-t border-white/10 pt-3">
					<span className="text-lg font-bold text-white">{currency.format(product.price)}</span>
					<span className="text-xs text-zinc-400">{product.stock} in stock</span>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<QuantityControl
						value={quantity}
						max={quantityLimit}
						label={`Quantity for ${product.name}`}
						onChange={setQuantity}
					/>
					<button
						type="button"
						disabled={availableQuantity < quantity}
						onClick={handleAddToCart}
						className="flex-1 rounded bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
					>
						{availableQuantity > 0 ? 'Add to cart' : 'Out of stock'}
					</button>
				</div>
				<p aria-live="polite" className="min-h-4 text-xs text-emerald-300">{addedMessage}</p>
			</div>
		</article>
	);
}

export default ProductCard;
