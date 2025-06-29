from flask import Flask
import flask_cors
from routes.info_routes import info_bp
from routes.github_routes import github_bp
from routes.contact_routes import contact_bp

app = Flask(__name__)

cors = flask_cors.CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8000"]}}) #change localhost

app.register_blueprint(info_bp, url_prefix='/api/info')
app.register_blueprint(github_bp, url_prefix='/api/github')
app.register_blueprint(contact_bp, url_prefix='/api/contact')


if __name__ == "__main__":
    app.run(debug=True)