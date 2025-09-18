# AI Agent Coding Plan: SoleMate E-Commerce Web App

This document outlines the step-by-step plan for an AI agent to develop the SoleMate e-commerce application.

## Phase 1: Foundational Setup & User Authentication

1.  **Environment Setup**:
    *   Verify Supabase credentials are in `.env`.
    *   Install all required npm dependencies (`react-router-dom`, etc.).

2.  **Supabase Schema Design & Creation**:
    *   Design SQL schemas for `users`, `products`, `reviews`, `orders`, and `order_items`.
    *   Create a new Supabase migration file with the SQL schema.
    *   Apply the migration to the Supabase project.

3.  **Core UI & Routing**:
    *   Implement basic page routing using `react-router-dom` for Home, Product Detail, Login, Register, and a protected Admin area.
    *   Create placeholder components for each page.

4.  **User Authentication**:
    *   Implement user registration and login functionality using Supabase Auth.
    *   Create authentication forms and UI logic.
    *   Implement protected routes that require authentication (e.g., profile, order history).
    *   Develop user profile management page (view/edit info).

## Phase 2: Product Catalog & Display

1.  **Product Catalog Page**:
    *   Create a component to fetch and display a grid of shoe products from the Supabase `products` table.
    *   Design a `ProductCard` component to display the product image, name, and price.

2.  **Product Detail Page**:
    *   Develop a dynamic page that takes a product ID from the URL.
    *   Fetch and display detailed product information, including larger images and descriptions.
    *   Add an "Add to Cart" button.

## Phase 3: Shopping Cart & Checkout

1.  **Client-Side Shopping Cart**:
    *   Implement a client-side cart using React Context or a state management library.
    *   Create functions to add/remove products and adjust quantities.
    *   Display the cart contents in a dedicated component or a sidebar.

2.  **Checkout Process**:
    *   Design a multi-step checkout form (shipping, payment).
    *   Integrate Stripe for secure payment processing.
    *   On successful payment, create a new order in the `orders` and `order_items` tables.

## Phase 4: Order Management & Reviews

1.  **Order History**:
    *   Create a page for authenticated users to view their order history.
    *   Display order status and details for each past order.

2.  **Product Reviews and Ratings**:
    *   Implement a form on the product detail page for authenticated users to submit reviews and star ratings.
    *   Store reviews in the `reviews` table, linked to the user and product.
    *   Display average star ratings and individual reviews on the product page.

## Phase 5: Administration

1.  **Admin Dashboard**:
    *   Create a secure admin panel accessible only to users with an 'admin' role.
    *   Implement product management features (add, edit, delete products).
    *   Develop an interface for inventory management to update stock levels.
    *   Create a view to manage and track customer orders.

2.  **Promotions and Discounts**:
    *   Add functionality for admins to create and manage discount codes.
    *   Allow users to apply valid promotion codes in the shopping cart.

## Phase 6: Deployment

1.  **Finalize and Deploy**:
    *   Ensure the application is responsive and bug-free.
    *   Deploy the front-end to a static site hosting provider like Netlify or Vercel, connected to the live Supabase backend.
    *   Configure production environment variables.