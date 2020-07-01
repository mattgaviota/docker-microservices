class Config:
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://admin:admin@postgres/develop'

config = {
    'development': DevelopmentConfig,
}
