-- Products Table
CREATE TABLE products (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    image_url text,
    stock_quantity integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Reviews Table
CREATE TABLE reviews (
    id bigserial PRIMARY KEY,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text text,
    created_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
    id bigserial PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    total_amount numeric(10, 2) NOT NULL,
    status text NOT NULL DEFAULT 'pending', -- e.g., pending, processing, shipped, delivered, cancelled
    shipping_address jsonb,
    created_at timestamptz DEFAULT now()
);

-- Order Items Table
CREATE TABLE order_items (
    id bigserial PRIMARY KEY,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id) ON DELETE RESTRICT,
    quantity integer NOT NULL,
    price numeric(10, 2) NOT NULL
);