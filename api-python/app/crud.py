from . import models, schemas
from sqlalchemy.orm import Session
from typing import List
import datetime


def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()


def get_order_by_buyer(db: Session, buyer_id: int):
    return db.query(models.Order).filter(models.Order.buyer_id == buyer_id).all()


def get_order_by_seller(db: Session, seller_id: int):
    return db.query(models.Order).filter(models.Order.seller_id == seller_id).all()


def create_order(db: Session, order: schemas.OrderCreate, total: float):
    db_order = models.Order(date=datetime.datetime, total=total)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def create_order_detail(db: Session, detail: schemas.DetailCreate, order_id: int, products_id: List[int]):
    details = []
    for product_id in products_id:
        db_detail = models.Detail(
            **detail.dict(), order_id=order_id, product_id=product_id)
        db.add(db_detail)
        db.commit()
        db.refresh(db_detail)
        details.append(db_detail)
    return details
