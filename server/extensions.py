from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

cache = Cache()

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["500 per day", "20 per hour"]
)