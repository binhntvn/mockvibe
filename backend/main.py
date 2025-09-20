from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
import models, database, auth, schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from typing import List
import uuid
from sqlalchemy import text

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    profile = db.query(models.Profile).filter(models.Profile.id == str(user.id)).first()
    if not profile or not auth.verify_password(form_data.password, profile.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_password = auth.get_password_hash(user.password)
    
    db_auth_user = models.User(id=user_id, email=user.email, encrypted_password=hashed_password, role='authenticated')
    db.add(db_auth_user)
    db.commit()

    # The trigger will create the profile, but we need to add the hashed_password to it
    db.execute(text(f"UPDATE public.profiles SET hashed_password = '{hashed_password}' WHERE id = '{user_id}'"))
    db.commit()
    
    # Fetch the created user to return
    created_user = db.query(models.Profile).filter(models.Profile.id == user_id).first()
    return schemas.User(id=str(created_user.id), email=user.email)

@app.get("/products/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/products/{product_id}/reviews", response_model=List[schemas.Review])
def read_reviews(product_id: int, db: Session = Depends(get_db)):
    reviews = db.query(models.Review).filter(models.Review.product_id == product_id).all()
    return reviews

@app.post("/products/{product_id}/reviews", response_model=schemas.Review)
def create_review(product_id: int, review: schemas.ReviewCreate, user_id: str = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_review = models.Review(**review.dict(), product_id=product_id, user_id=user_id)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, user_id: str = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_order = models.Order(user_id=str(user_id), total_amount=order.total_amount, shipping_address=order.shipping_address)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    for item in order.items:
        db_item = models.OrderItem(**item.dict(), order_id=db_order.id)
        db.add(db_item)
    db.commit()
    db.refresh(db_order)
    db_order.user_id = str(db_order.user_id)
    return db_order

@app.get("/orders/", response_model=List[schemas.Order])
def read_orders(user_id: str = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    orders = db.query(models.Order).options(joinedload(models.Order.items)).filter(models.Order.user_id == user_id).all()
    for order in orders:
        order.user_id = str(order.user_id)
    return orders

@app.get("/admin/orders/", response_model=List[schemas.Order])
def read_all_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = db.query(models.Order).options(joinedload(models.Order.items)).offset(skip).limit(limit).all()
    for order in orders:
        order.user_id = str(order.user_id)
    return orders