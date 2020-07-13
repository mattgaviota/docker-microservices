from flask import Blueprint, g, request, make_response
from functools import wraps
import requests

bp = Blueprint('orders', __name__)

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
        validate = requests.get('http://api-php:8080/api/validate', headers=headers)
        validate_response = validate.json()
        if validate_response['errors']:
            return make_response({'status': 'fail', 'message': 'Authorization failed'}), 401

        g.user = validate_response['data']
        return f(*args, **kwargs)

    return wrap

@bp.route("/orders", methods=['GET'])
@validation
def get_orders():
    #user = request.environ['user']
    return "Get orders"


@bp.route("/orders", methods=['POST'])
@validation
def create_order():
    user = g.user
    data = request.get_json()
    print(user)
    print(data)
    return make_response({'status': 'success', 'message': 'Order created 1'}), 201
