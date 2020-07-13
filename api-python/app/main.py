from flask import Flask
from config import config
from endpoints import orders
from models import db
from middleware import Middleware

def create_app(environment):
    app = Flask(__name__)
    app.wsgi_app = Middleware(app.wsgi_app)
    app.register_blueprint(orders.bp)
    app.config.from_object(environment)

    with app.app_context():
        db.init_app(app)
        db.create_all()

    return app


if __name__ == "__main__":
    environment = config['development']
    app = create_app(environment)
    app.run(host='0.0.0.0', debug=True, port=80)
