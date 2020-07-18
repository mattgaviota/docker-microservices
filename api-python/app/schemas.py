from flask_marshmallow import Marshmallow
from models import Order, Detail, User, Product

ma = Marshmallow()


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product


class DetailSchema(ma.SQLAlchemyAutoSchema):
    product = ma.Nested(ProductSchema)
    class Meta:
        model = Detail
        include_fk = True


class OrderSchema(ma.SQLAlchemyAutoSchema):
    details = ma.Nested(DetailSchema, many=True)
    seller = ma.Nested(UserSchema, only=('id', 'name', 'email', 'usertype'))

    class Meta:
        model = Order
        include_fk = True
