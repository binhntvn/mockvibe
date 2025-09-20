erDiagram
    auth.users {
        UUID id PK
        String email
        String encrypted_password
        String role
    }

    public.profiles {
        UUID id PK, FK
        String username
        String full_name
        String avatar_url
        String website
        String hashed_password
    }

    public.products {
        Int id PK
        String name
        String description
        Numeric price
        String image_url
        Int stock_quantity
    }

    public.reviews {
        Int id PK
        Int product_id FK
        UUID user_id FK
        Int rating
        String review_text
    }

    public.orders {
        Int id PK
        UUID user_id FK
        Numeric total_amount
        String status
        JSON shipping_address
    }

    public.order_items {
        Int id PK
        Int order_id FK
        Int product_id FK
        Int quantity
        Numeric price
    }

    auth.users ||--o{ public.profiles : "has one"
    auth.users ||--o{ public.reviews : "has many"
    auth.users ||--o{ public.orders : "has many"
    public.products ||--o{ public.reviews : "has many"
    public.products ||--o{ public.order_items : "has many"
    public.orders ||--o{ public.order_items : "has many"