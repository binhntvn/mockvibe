# Low-Level Design (LLD) for SoleMate E-Commerce

## 1. Introduction
This document provides a detailed, low-level design of the key components and modules of the SoleMate e-commerce application.

## 2. Backend Design (FastAPI)

### 2.1 `main.py`: API Endpoints
- **`/token` (POST)**: Authenticates a user and returns a JWT.
- **`/users/` (POST)**: Registers a new user.
- **`/products/` (GET)**: Retrieves a list of all products.
- **`/products/{product_id}` (GET)**: Retrieves details for a single product.
- **`/products/{product_id}/reviews` (GET, POST)**: Retrieves or creates reviews for a product.
- **`/orders/` (GET, POST)**: Retrieves the current user's orders or creates a new order.
- **`/admin/orders/` (GET)**: Retrieves all orders (for admin use).

### 2.2 `models.py`: SQLAlchemy Models
- **`User`**: Maps to the `auth.users` table.
- **`Profile`**: Maps to the `public.profiles` table.
- **`Product`**: Maps to the `public.products` table.
- **`Review`**: Maps to the `public.reviews` table.
- **`Order`**: Maps to the `public.orders` table.
- **`OrderItem`**: Maps to the `public.order_items` table.

### 2.3 `schemas.py`: Pydantic Schemas
- Defines the data shapes for API requests and responses (e.g., `ProductCreate`, `User`, `Order`).
- Inherits from a `CustomBaseModel` to handle `UUID` to `string` conversion.

### 2.4 `auth.py`: Authentication Logic
- **`pwd_context`**: A `Passlib` context for password hashing and verification.
- **`create_access_token()`**: Generates a JWT for an authenticated user.
- **`get_current_user()`**: A FastAPI dependency to protect endpoints and retrieve the current user from a JWT.

## 3. Frontend Design (React)

### 3.1 `src/pages/`: Page Components
- **`Index.tsx`**: The main landing page, displaying the product grid and other sections.
- **`ProductDetailPage.tsx`**: Displays the details of a single product, including reviews.
- **`Login.tsx` / `Register.tsx`**: User authentication pages.
- **`CheckoutPage.tsx`**: The checkout form.
- **`Profile.tsx`**: The user's profile page, displaying order history.
- **`Admin.tsx`**: The admin panel for managing products and orders.

### 3.2 `src/components/`: Reusable Components
- **`ProductGrid.tsx`**: Displays a grid of products.
- **`Cart.tsx`**: Displays the contents of the shopping cart.
- **`FloatingMenu.tsx`**: The site-wide floating menu for navigation and cart access.
- **`GoHomeButton.tsx`**: A button to navigate back to the home page.

### 3.3 `src/contexts/`: State Management
- **`AuthContext.tsx`**: Manages the user's authentication state (user object, JWT).
- **`CartContext.tsx`**: Manages the shopping cart state, persisting it to `localStorage`.

## 4. Database Design
- The database schema is defined by the SQL migration files in `backend/supabase/migrations/`.
- An ERD is available in `erd.md`.
- Key tables include `auth.users`, `public.profiles`, `public.products`, `public.orders`, `public.order_items`, and `public.reviews`.
- A trigger (`on_auth_user_created`) automatically creates a `profile` when a new user is added to `auth.users`.