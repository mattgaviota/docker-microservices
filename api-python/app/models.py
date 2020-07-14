from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, primary_key=True, index=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    usertype = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, index=True)
    buyer_id = db.Column(db.Integer, index=True)
    seller_id = db.Column(db.Integer, index=True)
    date = db.Column(db.DateTime)
    total = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    details = db.relationship('Detail', backref='order', lazy=True)


class Detail(db.Model):
    __tablename__ = 'details'

    id = db.Column(db.Integer, primary_key=True, index=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    product_id = db.Column(db.Integer, index=True)
    amount = db.Column(db.Integer)
    price = db.Column(db.Float)
    total = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
