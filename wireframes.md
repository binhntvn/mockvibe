# SoleMate E-Commerce - Wireframes

This document provides textual wireframes for the key pages of the SoleMate application.

## 1. Home Page (`/`)

**Objective**: Display featured products and provide easy navigation.

- **Header**:
    - Left: "SoleMate" Logo (links to Home)
    - Right: "Login", "Register" links (or "Profile" link if logged in)
- **Welcome Section**:
    - Large heading: "Welcome to SoleMate"
    - Subheading: "Your one-stop shop for the best shoes online."
    - Row of partner brand logos (Nike, Adidas, etc.)
- **Product Grid Section**:
    - Heading: "Our Products"
    - A grid of `Product Cards`.
- **Features Section**:
    - Heading: "Why Choose Us?"
    - A row of feature highlights (e.g., "Fast Shipping", "Easy Returns").
- **Trust Section**:
    - Heading: "Trusted by Millions"
    - A row of trust badges (Norton, McAfee, etc.).
- **Footer**:
    - Company info, quick links, and contact details.
- **Floating Menu**:
    - Top-Left: Menu icon.
    - Bottom-Right: Cart icon.

---

## 2. Product Detail Page (`/product/:id/details`)

**Objective**: Provide detailed information about a single product and allow users to add it to their cart.

- **Header**: (Same as Home Page)
- **Main Content**:
    - A large product image.
    - Product Name (Heading)
    - Product Description (Text)
    - Price
    - Quantity selector (+/- buttons and input).
- **Reviews Section**:
    - Average star rating.
    - A list of individual user reviews.
- **Write a Review Section** (Visible to logged-in users):
    - Star rating selector.
    - Text area for the review.
    - "Submit Review" button.
- **Footer**: (Same as Home Page)
- **Floating Menu**: (Same as Home Page)

---

## 3. Login Page (`/login`)

**Objective**: Allow users to log in to their accounts.

- **Main Content**:
    - A card with the title "Login".
    - Email input field.
    - Password input field.
    - "Login" button.
    - A link to the Register page.

---

## 4. Register Page (`/register`)

**Objective**: Allow new users to create an account.

- **Main Content**:
    - A card with the title "Register".
    - Email input field.
    - Password input field.
    - "Register" button.
    - A link to the Login page.

---

## 5. Profile Page (`/profile`)

**Objective**: Allow logged-in users to view their order history.

- **Header**: (Same as Home Page)
- **Main Content**:
    - User's email address.
    - "Logout" button.
    - A section titled "My Orders" with a list of past orders.
- **Footer**: (Same as Home Page)
- **Floating Menu**: (Same as Home Page)