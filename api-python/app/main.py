from flask import Flask
from flask_cors import CORS
from routes import bp
from models import db
import config

def create_app(environment):
    app = Flask(__name__)
    app.config.from_object("config.DevelopmentConfig")
    CORS(app)
    app.register_blueprint(bp, url_prefix='/api')
    with app.app_context():
        db.init_app(app)
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app(environment)
    app.run(host='0.0.0.0', debug=True, port=80)
