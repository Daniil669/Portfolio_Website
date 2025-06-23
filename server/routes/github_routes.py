from flask import Blueprint, jsonify, send_from_directory

github_bp = Blueprint('github', __name__)

@github_bp.route('/demo/<project_name>')
def get_project_demo(project_name):
    try:
        file_name = project_name + '.gif'
        return send_from_directory('static/projects_demos', file_name)
    except Exception as e:
        return jsonify({'error': str(e)})