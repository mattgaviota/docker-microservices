from typing import List
from datetime import datetime
from pydantic import BaseModel


class DetailBase(BaseModel):
    amount: int
    price: float
    total: float


class DetailCreate(DetailBase):
    order_id: int
    product_id: int
    created_at: datetime
    updated_at: datetime


class Detail(DetailBase):
    id: int
    order_id: int
    product_id: int

    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    date: datetime
    total: float


class OrderCreate(OrderBase):
    buyer_id: int
    seller_id: int
    created_at: datetime
    updated_at: datetime


class Order(OrderBase):
    id: int
    buyer_id: int
    seller_id: int
    details: List[Detail] = []

    class Config:
        orm_mode = True
