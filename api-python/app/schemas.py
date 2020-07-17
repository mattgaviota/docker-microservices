from flask_marshmallow import Marshmallow
from models import Order, Detail, User

ma = Marshmallow()


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class DetailSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Detail
        include_fk = True


class OrderSchema(ma.SQLAlchemyAutoSchema):
    details = ma.Nested(DetailSchema, many=True)
    seller = ma.Nested(UserSchema, only=('id', 'name', 'email', 'usertype'))

    class Meta:
        model = Order
        include_fk = True
