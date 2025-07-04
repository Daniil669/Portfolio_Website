from flask import Flask
import flask_cors
import dotenv
import os
from routes.info_routes import info_bp
from routes.github_routes import github_bp
from routes.contact_routes import contact_bp
from utils.log_helper import app_logger
from extensions import cache
from config import DevelopmentConfig, ProductionConfig

dotenv.load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)

if os.environ.get("FLASK_ENV", "development") == "development":
    app.config.from_object(DevelopmentConfig)
else:
    app.config.from_object(ProductionConfig)

cache.init_app(app)

cors = flask_cors.CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}}) #change localhost

app.register_blueprint(info_bp, url_prefix='/api/info')
app.register_blueprint(github_bp, url_prefix='/api/github')
app.register_blueprint(contact_bp, url_prefix='/api/contact')


if __name__ == "__main__":
    app_logger.info("The app is running.")
    app.run(debug=True)
    