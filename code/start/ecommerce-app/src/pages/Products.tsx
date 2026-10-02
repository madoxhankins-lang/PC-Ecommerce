import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import ProductList from '../components/ProductList';
import type { Product, ProductCategory } from '../types';

const categoryLabels: Record<ProductCategory, string> = {
	cpu: 'CPUs',
	gpu: 'GPUs',
	ram: 'Memory',
	motherboard: 'Motherboards',
	ssd: 'Storage',
	'power-supply': 'Power Supplies',
	case: 'Cases',
	cooler: 'Cooling',
};

function Products() {
	const productsQuery = useQuery<Product[], Error>({
		queryKey: ['products'],
		queryFn: fetchProducts,
	});

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
	const [maxPrice, setMaxPrice] = useState(2500);
	const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

	const filteredProducts = useMemo(() => {
		if (!productsQuery.data) {
			return [];
		}

		const allProducts = [...productsQuery.data];
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const matches = allProducts.filter((product) => {
			const matchesText =
				normalizedSearch.length === 0 ||
				product.name.toLowerCase().includes(normalizedSearch) ||
				product.brand.toLowerCase().includes(normalizedSearch) ||
				product.category.toLowerCase().includes(normalizedSearch);
			const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
			const matchesPrice = product.price <= maxPrice;
			return matchesText && matchesCategory && matchesPrice;
		});

		matches.sort((first, second) => {
			switch (sortBy) {
				case 'price-low':
					return first.price - second.price;
				case 'price-high':
					return second.price - first.price;
				case 'rating':
					return second.rating - first.rating;
				case 'featured':
				default:
					return (first.popularityRank ?? Number.MAX_SAFE_INTEGER) - (second.popularityRank ?? Number.MAX_SAFE_INTEGER);
			}
		});

		return matches;
	}, [maxPrice, productsQuery.data, searchTerm, selectedCategory, sortBy]);

	const categories = ['all', ...(productsQuery.data ? [...new Set(productsQuery.data.map((product) => product.category))] : [])] as const;
	const highestPrice = productsQuery.data ? Math.max(...productsQuery.data.map((product) => product.price)) : 2500;

	return (
		<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<header className="mb-8 border-b border-white/10 pb-5">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">PC components</p>
				<div className="mt-2 flex flex-wrap items-end justify-between gap-3">
					<h1 className="text-3xl font-bold text-zinc-100">Shop parts</h1>
					<Link to="/" className="text-sm font-medium text-sky-300 hover:text-sky-200">
						Back to home
					</Link>
				</div>
			</header>

			{productsQuery.isLoading && (
				<p role="status" className="py-12 text-center text-zinc-300">
					Loading products...
				</p>
			)}

			{productsQuery.isError && (
				<div role="alert" className="mx-auto max-w-lg py-12 text-center">
					<p className="font-semibold text-zinc-100">Products could not be loaded.</p>
					<p className="mt-2 text-sm text-zinc-400">{productsQuery.error.message}</p>
					<button
						type="button"
						onClick={() => void productsQuery.refetch()}
						className="mt-4 rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
					>
						Try again
					</button>
				</div>
			)}

			{productsQuery.isSuccess && (
				<div className="space-y-6">
					<div className="rounded border border-white/10 bg-zinc-900 p-4">
						<div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
							<label className="block text-sm text-zinc-300">
								<span className="mb-2 block font-medium text-zinc-100">Search</span>
								<input
									type="search"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder="Search GPUs, CPUs, memory..."
									className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-sky-500"
								/>
							</label>

							<label className="block text-sm text-zinc-300">
								<span className="mb-2 block font-medium text-zinc-100">Sort by</span>
								<select
									value={sortBy}
									onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-low' | 'price-high' | 'rating')}
									className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
								>
									<option value="featured">Popular picks</option>
									<option value="price-low">Price: Low to high</option>
									<option value="price-high">Price: High to low</option>
									<option value="rating">Top rated</option>
								</select>
							</label>

							<label className="block text-sm text-zinc-300">
								<span className="mb-2 block font-medium text-zinc-100">Max price</span>
								<div className="flex items-center gap-3">
									<input
										type="range"
										min={200}
										max={highestPrice}
										value={maxPrice}
										onChange={(event) => setMaxPrice(Number(event.target.value))}
										className="w-full accent-sky-500"
									/>
									<span className="min-w-18 text-right text-xs text-zinc-200">${maxPrice}</span>
								</div>
							</label>
						</div>

						<div className="mt-4 flex flex-wrap gap-2">
							{categories.map((category) => (
								<button
									type="button"
									key={category}
									onClick={() => setSelectedCategory(category === 'all' ? 'all' : category as ProductCategory)}
									className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
										selectedCategory === category
											? 'border-sky-500 bg-sky-500/15 text-sky-200'
											: 'border-white/10 bg-zinc-950 text-zinc-300 hover:border-white/20'
									}`}
								>
									{category === 'all' ? 'All products' : categoryLabels[category as ProductCategory]}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center justify-between gap-3">
						<p className="text-sm text-zinc-400">
							{filteredProducts.length} products · {sortBy === 'featured' ? 'popular picks first' : selectedCategory === 'all' ? 'all categories' : categoryLabels[selectedCategory]}
						</p>
					</div>

					<ProductList products={filteredProducts} />
				</div>
			)}
		</main>
	);
}

export default Products;
