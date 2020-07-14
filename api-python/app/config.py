class Config(object):
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://admin:admin@postgres:5432/develop'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
