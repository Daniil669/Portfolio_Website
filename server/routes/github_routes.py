from flask import Blueprint, jsonify, send_file, request
from utils.github_utils import fetch_repos
from utils.log_helper import routes_logger
from extensions import cache
from extensions import limiter
from werkzeug.utils import safe_join

github_bp = Blueprint('github', __name__)

@github_bp.route('/demo/<project_name>')
@limiter.limit("1 per hour")
def get_project_demo(project_name):  
    try:
        routes_logger.info("Endpoint demo/project_name was called")
        file_name = safe_join('static/projects_demos', f"{project_name}.gif")
        return send_file(file_name)
    except Exception as e:
        routes_logger.error(f"GitHub route error: {str(e)}")
        return jsonify({'error': str(e)}), 404


@github_bp.route('/projects_info/<gith_type>')
@limiter.limit("50 per minute; 300 per hour")
@cache.cached(timeout=1800, unless=lambda: request.args.get('refresh') == 'true')
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
        return jsonify({'error': str(e)}), 500