from flask import Blueprint, jsonify, send_from_directory, request
from utils.github_utils import fetch_repos
from server.app import cache

github_bp = Blueprint('github', __name__)

@github_bp.route('/demo/<project_name>')
def get_project_demo(project_name):
    try:
        file_name = project_name + '.gif'
        return send_from_directory('static/projects_demos', file_name)
    except Exception as e:
        return jsonify({'error': str(e)})


@github_bp.route('/projects_info/<gith_type>?refresh=true')
@cache.cached(timeout=1800, unless=lambda: request.arg.get('refresh') == 'true')
def get_projects_info(gith_type):
    try:
        response_data = fetch_repos(gith_type)
        if not response_data['status']:
            return jsonify({'error': f'{response_data['error']}'}), response_data['code']
        return jsonify({'data': response_data['data']}), response_data['code']
    except Exception as e:
        return jsonify({'error': str(e)})