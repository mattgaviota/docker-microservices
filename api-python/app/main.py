from fastapi import Depends, FastAPI, HTTPException, Request
from middleware import Authenticate
from sqlalchemy.orm import Session
from typing import List

from database import crud, models, schemas
from database.database import SessionLocal

app = FastAPI(openapi_url="/python/openapi.json",
              docs_url="/api/docs", redoc_url="/api/redoc")

app.add_middleware(Authenticate)

# Dependency


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/api")
def read_root(request: Request):
    user = request.state
    return {"message": user}


@app.get("/api/orders", response_model=List[schemas.Order])
def get_orders(request: Request, db: Session = Depends(get_db)):
    user = request.state
    if user.usertype == 'seller':
        orders = crud.get_order_by_seller(db, user.user_id)
    else:
        orders = crud.get_order_by_buyer(db, user.user_id)
    return orders
