# PC Parts E-Commerce Store

A responsive storefront for gaming and workstation hardware featuring a curated catalog of GPUs, CPUs, memory, storage, power supplies, cases, and cooling products.

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Notes](#notes)
- [Author](#author)

## Features

- Landing page with a hero section and featured products
- Product browsing with search, category filters, price limits, and sorting
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

## Installation

Install Node.js and npm, then clone the repository and start the app:

```sh
git clone https://github.com/madoxhankins-lang/PC-Ecommerce.git
cd PC-Ecommerce/code/start/ecommerce-app
npm install
npm run dev -- --host 127.0.0.1
```

Open the local URL shown in the terminal, usually `http://127.0.0.1:5173/`.

## Usage

1. Open **Products** to search the catalog, filter by category or price, and change the sort order.
2. Open a product to view its details and choose a quantity within the available stock.
3. Visit **Cart** to adjust quantities, remove items, and review the subtotal.
4. Visit **Profile** to edit the demo account and addresses, or **My Orders** to view sample order history.

This is a storefront demo with mock data. It does not process payments or place real orders. Profile changes are held in memory and reset when the page reloads.

## Scripts

- `npm run dev` — start the app locally
- `npm run build` — create a production build
- `npm run lint` — run ESLint checks
- `npm test -- --run` — run the test suite

## Project Structure

- `src/pages` — Home, Products, ProductDetail, Cart, Profile, Orders
- `src/components` — shared UI pieces like Header, Layout, ProductCard, ProductList
- `src/stores` — Zustand stores for cart and profile state
- `src/api` — fetch helpers for mocked product data
- `src/mocks` — MSW handlers for product API responses
- `src/data` — the PC components dataset used by the mock API

## Testing

The project includes tests covering:

- cart store behavior
- user profile and order state updates
- product API fetching
- header navigation
- product listing UI
- shopping flow from product selection to cart

From the app folder, run:

```sh
npm test -- --run
```

## Notes

This storefront uses a mock product catalog rather than a live third-party API so it remains reliable, offline-friendly, and easy to extend with more products or categories in the future.

## Author

[Madox Hankins](https://github.com/madoxhankins-lang)
