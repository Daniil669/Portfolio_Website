import os

class Config:
    DEBUG = False
    TESTING = False
    CACHE_TYPE = 'SimpleCache'
    CACHE_DEFAULT_TIMEOUT = 1800 # 30 min
    CORS_ORIGINS = ["http://localhost:5173"]

class DevelopmentConfig(Config):
    DEBUG = True
    CACHE_TYPE = 'SimpleCache'

class ProductionConfig(Config):
    CACHE_TYPE = ''
    CACHE_URL = ''
    CORS_ORIGINS = [os.getenv("FRONTEND_ORIGIN")]