# API Specification for SoleMate E-Commerce

## 1. Introduction
This document provides a detailed specification for the RESTful API of the SoleMate e-commerce platform.

**Base URL**: `/`

## 2. Authentication
- **Authentication Type**: JWT (JSON Web Token)
- **Token Endpoint**: `/token` (POST)
- **Authorization Header**: `Authorization: Bearer <token>`

## 3. API Endpoints

### 3.1 Authentication
- **`POST /token`**: Authenticate a user and receive a JWT.
- **`POST /users/`**: Register a new user.

### 3.2 Products
- **`GET /products/`**: Retrieve a list of all products.
- **`GET /products/{product_id}`**: Retrieve details for a single product.
- **`POST /products/`**: (Future) Create a new product (Admin only).
- **`PUT /products/{product_id}`**: (Future) Update a product (Admin only).
- **`DELETE /products/{product_id}`**: (Future) Delete a product (Admin only).

### 3.3 Reviews
- **`GET /products/{product_id}/reviews`**: Retrieve all reviews for a product.
- **`POST /products/{product_id}/reviews`**: Create a new review for a product (Authenticated users only).

### 3.4 Orders
- **`GET /orders/`**: Retrieve the current user's order history (Authenticated users only).
- **`POST /orders/`**: Create a new order (Authenticated users only).
- **`GET /orders/{order_id}`**: (Future) Retrieve details for a specific order (Authenticated users only).

### 3.5 Admin
- **`GET /admin/orders/`**: Retrieve a list of all orders (Admin only).
- **`GET /admin/users/`**: (Future) Retrieve a list of all users (Admin only).

### 3.6 Promotions (Future)
- **`GET /promotions/`**: Retrieve a list of all promotions.
- **`POST /promotions/`**: Create a new promotion (Admin only).
- **`PUT /promotions/{promotion_id}`**: Update a promotion (Admin only).
- **`DELETE /promotions/{promotion_id}`**: Delete a promotion (Admin only).