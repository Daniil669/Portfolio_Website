from flask import Blueprint, jsonify, send_from_directory, request
from utils.github_utils import fetch_repos
from utils.log_helper import routes_logger
from extensions import cache

github_bp = Blueprint('github', __name__)

@github_bp.route('/demo/<project_name>')
def get_project_demo(project_name):  
    try:
        routes_logger.info("Endpoint demo/project_name was called")
        file_name = project_name + '.gif'
        return send_from_directory('static/projects_demos', file_name)
    except Exception as e:
        routes_logger.error(f"GitHub route error: {str(e)}")
        return jsonify({'error': str(e)})


@github_bp.route('/projects_info/<gith_type>?refresh=true')
@cache.cached(timeout=1800, unless=lambda: request.arg.get('refresh') == 'true')
def get_projects_info(gith_type):
    try:
        routes_logger.info("Endpoint projects_info was called")
        response_data = fetch_repos(gith_type)
        if not response_data['status']:
            routes_logger.warning(f"Warning: {response_data['error']}")
            return jsonify({'error': f'{response_data['error']}'}), response_data['code']
        return jsonify({'data': response_data['data']}), response_data['code']
    except Exception as e:
        routes_logger.error(f"GitHub route error: {str(e)}")
        return jsonify({'error': str(e)})