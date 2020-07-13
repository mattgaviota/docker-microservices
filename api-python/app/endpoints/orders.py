from flask import Blueprint, request, make_response

bp = Blueprint('orders', __name__)

@bp.route("/orders", methods=['GET'])
def get_orders():
    user = request.environ['user']
    return "Get orders"


@bp.route("/orders", methods=['POST'])
def create_order():
    user = request.environ['user']
    data = request.get_json()
    print(user)
    print(data)
    return make_response({'status': 'success', 'message': 'Order created'}), 201
