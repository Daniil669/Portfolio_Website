# Handles data for About, Projects, Service
from utils.json_loader import prepare_file
from flask import Blueprint, jsonify, send_from_directory

info_bp = Blueprint('info', __name__)


@info_bp.route('/about', methods=['GET'])
def get_about_info():
    response_data = prepare_file("about.json")
    if response_data['status']:
        return jsonify(response_data['data']), response_data['code']
    else:
        return jsonify(response_data['error']), response_data['code']

    
@info_bp.route('/projects', methods=['GET'])
def get_projects_info():
    response_data = prepare_file("projects.json")
    if response_data['status']:
        return jsonify(response_data['data']), response_data['code']
    else:
        return jsonify(response_data['error']), response_data['code']

    
@info_bp.route('/service', methods=['GET'])
def get_service_info():
    response_data = prepare_file("services.json")
    if response_data['status']:
        return jsonify(response_data['data']), response_data['code']
    else:
        return jsonify(response_data['error']), response_data['code']
    
@info_bp.route('/cv', methods=['GET'])
def get_cv():
    try:
        return send_from_directory('static', 'Test.pdf', as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@info_bp.route('/profile_photo', methods=['GET'])
def get_profile_photo():
    try:
        return send_from_directory('static', 'profile_photo.jpg')
    except Exception as e:
        return jsonify({'error': str(e)})