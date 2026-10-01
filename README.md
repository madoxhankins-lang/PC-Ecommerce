# Final Project: E-Commerce Application

## Introduction

In the final phase of this project, our objective is to develop a comprehensive frontend solution for an **E-Commerce platform**. The application must be fully functional, responsive, and rigorously tested. It leverages modern tools and libraries such as **Zustand** for state management, **React Query** for data fetching, **TailwindCSS** for styling, and **Vitest** for testing. The completed solution supports seamless shopping experiences for users, including browsing products, managing shopping carts, viewing order histories, and updating profile information.

## Starter Files

The initial code is available inside the `code/start` folder associated with this project.

## Scenario

With the initial frontend structure established, your task is to implement a robust and scalable frontend for the E-Commerce platform. The completed solution should provide seamless shopping experiences for users, including the following functionalities:

- Browsing products.
- Managing shopping carts.
- Viewing order histories.
- Updating profile information.

This project emphasizes modularity, separation of concerns, and test-driven development principles.

---

## E-Commerce Features Views

#### Home Page

A styled and responsive landing page has been implemented, featuring the following:

- A hero section welcoming users to the platform.
- Featured products displayed in a grid layout.
- Links to browse all products.

#### Product Listing Page

This page must display all available products with:

- Product title.
- Price.
- Image.
- A link to view product details.
- Clear navigation back to the home page.

#### Cart Page

The cart page displays complete cart information:

- Title of each product.
- Price.
- Quantity.
- Total price calculation.
- A "Remove" button for each item.

#### Profile Page

The profile page allows users to manage their account details:

- Name and email fields editable via a form.
- Address management with the ability to add new addresses.
- Order history displayed in chronological order.

## Application Setup and Layout

An MVC-like structure is provided featuring implemented views and empty components. For this task, ensure the following:

#### Views Layout

- `_ViewStart.tsx` and `_ViewImports.tsx` are provided with appropriate common settings.
- A responsive shared layout (`Layout.tsx`) is provided, including:
  - Consistent styling using **TailwindCSS** or custom CSS.

## Author Features

Ensure a link to "My Orders" is added to the navigation bar for users. This should lead to the **Order History** page.

#### Order History

The order history page must display:

- Order ID.
- Date of purchase.
- Total amount.
- Status of the order.

---

## Technical Requirements

We'll be working with **React**, **Zustand**, and **TypeScript** to develop our E-Commerce app. Below are the technical requirements and tasks to accomplish:

### 1. Set Up the Development Environment

- Initialize a React project using **Vite** with TypeScript support.
- Install necessary dependencies:
  - **Zustand** for state management.
  - **React Query** for data fetching.
  - **TailwindCSS** for styling.
  - **Vitest** and **Testing Library** for unit testing.
- Configure **MSW (Mock Service Worker)** for mocking API responses during testing.

### 2. Build the Core Features

Implement the following functionalities:

#### Global State Management

- Create Zustand stores (`useCartStore`, `useUserStore`) to manage:
  - Cart data (add/remove items, calculate total).
  - User data (profile updates, address management, order history).

#### Reusable Components

- Implement reusable components:
  - `Header`: Navigation bar with cart status .
  - `ProductList`: Displays products fetched via React Query.
  - Page components (`Cart`, `Home`, `Products`, `Profile`): Handle specific sections of the app.

#### Component Architecture

- Use **TypeScript** to enforce type checks for props and state across components.
- Ensure components are modular, reusable, and follow separation of concerns.

#### Styling with TailwindCSS

- Style the application using **TailwindCSS** for a clean, responsive, and mobile-friendly design.

#### Data Fetching

- Use **React Query** to fetch product data and cache it efficiently.

#### Routing

- Define routes for different pages (Home, Products, Cart, Profile) using **React Router**.

#### Testing

- Write unit tests for Zustand stores to validate state updates.
- Write integration tests for components to ensure proper rendering and user interactions.
- Mock API responses using **MSW** for testing data-fetching functionality.
- Mock Zustand hooks in component tests to isolate and test individual components.

---

### Test the Application

Verify the following:

- The Zustand store correctly manages the state of cart items and user data (add, remove, update).
- The `Header` component displays navigation links and cart status accurately.
- The `ProductList` component displays products fetched via React Query.
- The `Cart` component allows users to view and remove products from their cart.
- The `Profile` component enables users to update their profile information, add addresses, and view order history.
- All tests pass successfully using **Vitest**.

---

## Deliverables

The deliverable of this exercise is a working React application that meets all the requirements above. Submit the following:

1. **Public GitHub Repository** containing the source code.
2. **Screenshots** showing:
   - The app running locally.
   - Test results from **Vitest**.
3. A **README file** explaining how to set up and run the app locally.
4. Simple documentation for the app's functionality and testing process.

---

## Conclusion

Building an **E-Commerce app** with Zustand, TypeScript, React Query, and Testing Library is an excellent way to practice creating reusable React components, implementing global state management, and leveraging modern testing practices. By completing this activity, you've learned how to create a functional React app with robust state management, type safety, and comprehensive testing. These skills form the foundation for developing more complex and scalable React applications in the future.