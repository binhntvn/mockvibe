from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Numeric(10, 2))
    image_url = Column(String)
    stock_quantity = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(String) # This would typically be a UUID, but keeping it simple for now
    rating = Column(Integer)
    review_text = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    product = relationship("Product")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String) # This would typically be a UUID
    total_amount = Column(Numeric(10, 2))
    status = Column(String, default="pending")
    shipping_address = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
    price = Column(Numeric(10, 2))

    order = relationship("Order", back_populates="items")
    product = relationship("Product")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    avatar_url = Column(String)
    website = Column(String)
    hashed_password = Column(String)