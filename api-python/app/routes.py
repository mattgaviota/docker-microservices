from flask import Blueprint, g, request, make_response, jsonify
from functools import wraps, reduce
from models import User, Order, Detail, db
from schemas import OrderSchema
from datetime import date
import requests

bp = Blueprint('orders', __name__)

orders_schema = OrderSchema(many=True)

def validation(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        bearer = request.headers.get('authorization')
        if bearer:
            token = bearer.split(" ")[1]
        else:
            token = ''

        if not token:
            return make_response({'status': 'fail', 'message': 'Authorization failed'}), 401
        headers = {'Authorization': bearer}
        validate = requests.get('http://api-php:8000/api/validate', headers=headers)
        validate_response = validate.json()
        if validate_response['errors']:
            return make_response({'status': 'fail', 'message': 'Authorization failed'}), 401

        g.user = validate_response['data']
        return f(*args, **kwargs)

    return wrap


@bp.route("/orders", methods=['GET'])
@validation
def get_orders():
    user = g.user
    if user['usertype'] != 'buyer':
        return make_response({'status': 'fail', 'message': 'Access Forbiden'}), 403

    orders = Order.query.all()
    data = {
        'data': orders_schema.dump(orders)
    }
    return make_response(jsonify(data)), 200


@bp.route("/orders", methods=['POST'])
@validation
def create_order():
    user = g.user
    data = request.get_json()

    seller = User.query.filter_by(name=data['seller']).first()
    if not seller:
        return make_response({'status': 'fail', 'message': 'Bad Request'}), 400

    total = reduce(lambda a,b : a + b['quantity'] * b['price'], data['items'], 0)

    order_data = {
        'seller_id': seller.id,
        'buyer_id': user['id'],
        'date': date.today(),
        'total': total
    }
    order = Order(**order_data)
    db.session.add(order)
    db.session.commit()

    for item in data['items']:
        detail_data = {
            'order_id': order.id,
            'product_id': item['id'],
            'amount': item['quantity'],
            'price': item['price'],
            'total': item['quantity'] * item['price']
        }
        detail = Detail(**detail_data)
        db.session.add(detail)
        db.session.commit()

    return make_response({'status': 'success', 'message': 'Order created'}), 201
