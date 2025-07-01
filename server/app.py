from flask import Flask
from flask_caching import Cache
import flask_cors
import dotenv
from routes.info_routes import info_bp
from routes.github_routes import github_bp
from routes.contact_routes import contact_bp
from utils.log_helper import app_logger

cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})

app = Flask(__name__)

cache.init_app(app)

cors = flask_cors.CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8000"]}}) #change localhost

app.register_blueprint(info_bp, url_prefix='/api/info')
app.register_blueprint(github_bp, url_prefix='/api/github')
app.register_blueprint(contact_bp, url_prefix='/api/contact')


if __name__ == "__main__":
    app_logger.info("The app is running.")
    app.run(debug=True)
    