from flask import Blueprint, request

bp = Blueprint('orders', __name__)

@bp.route("/api/orders", methods=['GET'])
def get_orders():
    return "Get orders"


@bp.route("/api/orders", methods=['POST'])
def create_order():
    return "Post orders"
