import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
	products: Product[];
}

function ProductList({ products }: ProductListProps) {
	if (products.length === 0) {
		return <p className="py-12 text-center text-slate-600">No products found.</p>;
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

export default ProductList;
