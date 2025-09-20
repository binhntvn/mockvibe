from custom_types import CustomBaseModel
from typing import List, Optional
import uuid

class ProductBase(CustomBaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    stock_quantity: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

class UserBase(CustomBaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str

class ReviewBase(CustomBaseModel):
    rating: int
    review_text: Optional[str] = None

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    product_id: int
    user_id: str

class OrderItemBase(CustomBaseModel):
    product_id: int
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    order_id: int

class OrderBase(CustomBaseModel):
    total_amount: float
    shipping_address: dict

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    user_id: str
    items: List[OrderItem] = []