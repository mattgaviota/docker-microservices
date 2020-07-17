from flask_marshmallow import Marshmallow
from models import Order, Detail

ma = Marshmallow()


class DetailSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Detail
        include_fk = True


class OrderSchema(ma.SQLAlchemyAutoSchema):
    details = ma.Nested(DetailSchema, many=True)

    class Meta:
        model = Order
