from utils.json_loader import prepare_file
from utils.log_helper import routes_logger
from flask import jsonify, send_from_directory

def handle_json_response(f_name, endpoint):
    routes_logger.info(f"Endpoint {endpoint} was called.")
    response_data = prepare_file(f_name)
    if response_data['status']:
        return jsonify(response_data['data']), response_data['code']
    else:
        routes_logger.error(f"Error in {endpoint}: {response_data['error']}")
        return jsonify(response_data['error']), response_data['code']