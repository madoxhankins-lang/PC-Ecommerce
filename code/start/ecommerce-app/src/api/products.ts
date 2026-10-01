import { Product } from '../types'; // Assuming you have a Product type defined

export const fetchProducts = async (): Promise<Product[]> => {
  return [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 149.99,
      image: 'https://m.media-amazon.com/images/I/71PtY7s-ODL._AC_SX679_.jpg',
      description: 'Headset',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://m.media-amazon.com/images/I/61sTOZCxuUL._AC_SY879_.jpg',
      description: 'Fitness tracking & heart rate monitor',
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 89.99,
      image: 'https://m.media-amazon.com/images/I/71HdLDJEEUL._AC_SX522_.jpg',
      description: 'Portable JBL Waterproof Speaker',
    },
  ];
};
