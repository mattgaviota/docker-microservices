from sqlalchemy import Column, ForeignKey, Integer, Float, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, index=True)
    seller_id = Column(Integer, index=True)
    date = Column(DateTime)
    total = Column(Float)
    created_at = Column(Datetime)
    updated_at = Column(Datetime)

    details = relationship("Detail", back_populates="order")


class Detail(Base):
    __tablename__ = "details"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, index=True)
    amount = Column(Integer)
    price = Column(Float)
    total = Column(Float)
    created_at = Column(Datetime)
    updated_at = Column(Datetime)

    order = relationship("Order", back_populates="details")
