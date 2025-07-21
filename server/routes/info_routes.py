# Handles data for About, Projects, Service
from flask import Blueprint, jsonify, send_from_directory
from utils.log_helper import routes_logger
from extensions import limiter
from utils.handle_json_response import handle_json_response

info_bp = Blueprint('info', __name__)


@info_bp.route('/about', methods=['GET'])
@limiter.limit("10 per minute")
def get_about_info():
    return handle_json_response("about.json", "about")


    
@info_bp.route('/projects', methods=['GET'])
@limiter.limit("10 per minute")
def get_projects_info():
    return handle_json_response("projects.json", "projects")


@info_bp.route('/freelance_project', methods=['GET'])
@limiter.limit("10 per minute")
def get_freelance_project_info():
    return handle_json_response("freelance_project.json", "freelance_project")


    
@info_bp.route('/service', methods=['GET'])
@limiter.limit("10 per minute")
def get_service_info():
    return handle_json_response("services.json", "service")

    
@info_bp.route('/cv', methods=['GET'])
@limiter.limit("3 per minute")
def get_cv():
    try:
        routes_logger.info("Endpoint cv was called")
        return send_from_directory('static', 'CV_Teaser.pdf', as_attachment=True)
    except Exception as e:
        routes_logger.error(f"Error in /cv endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500
    

@info_bp.route('/profile_photo', methods=['GET'])
@limiter.limit("10 per minute")
def get_profile_photo():
    try:
        routes_logger.info("Endpoint profile_photo was called")
        return send_from_directory('static', 'profile_photo.jpg')
    except Exception as e:
        routes_logger.error(f"Error in /profile_photo endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500