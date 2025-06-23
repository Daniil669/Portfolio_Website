from flask import Flask
from routes.info_routes import info_bp
from routes.github_routes import github_bp

app = Flask(__name__)
app.register_blueprint(info_bp, url_prefix='/api/info')
app.register_blueprint(github_bp, url_prefix='/api/github')


if __name__ == "__main__":
    app.run(debug=True)