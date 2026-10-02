# PC Parts E-Commerce Store

A responsive storefront for gaming and workstation hardware featuring a curated catalog of GPUs, CPUs, memory, storage, power supplies, cases, and cooling products.

## Features

- Landing page with a hero section and featured products
- Product browsing with search, category filters, price limitation, and sorting
- Product detail flow with stock-aware quantity controls
- Shopping cart with quantity updates and totals
- Profile page with editable account information, saved addresses, and recent orders
- My Orders page with chronological order history
- Zustand state management and React Query-powered product fetching

## Tech Stack

- React + TypeScript + Vite
- React Router
- Zustand
- TanStack React Query
- Tailwind CSS
- Vitest + Testing Library
- MSW for mock API responses

## Getting Started

1. Open the app folder:
   cd PC-Ecommerce/code/start/ecommerce-app
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev -- --host 127.0.0.1
4. Open the local URL shown in the terminal, usually http://127.0.0.1:5173/

## Scripts

- npm run dev — start the app locally
- npm run build — create a production build
- npm run lint — run ESLint checks
- npm test -- --run — run the test suite

## Project Structure

- src/pages — Home, Products, ProductDetail, Cart, Profile, Orders
- src/components — shared UI pieces like Header, Layout, ProductCard, ProductList
- src/stores — Zustand stores for cart and profile state
- src/api — fetch helpers for mocked product data
- src/mocks — MSW handlers for product API responses
- src/data — the PC components dataset used by the mock API

## Testing

The project includes tests covering:

- cart store behavior
- user profile and order state updates
- product API fetching
- header navigation
- product listing UI
- shopping flow from product selection to cart

Run:

npm test -- --run

## Notes

This storefront uses a mock product catalog rather than a live third-party API so it remains reliable, offline-friendly, and easy to extend with more products or categories in the future.