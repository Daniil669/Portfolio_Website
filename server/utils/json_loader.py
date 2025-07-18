import os, json
from utils.log_helper import utils_logger

def prepare_file(file_name):
    try:
        file_relative_path = os.path.join(os.path.dirname(__file__), "..", "data", file_name)
        file_absolute_path = os.path.abspath(file_relative_path)
        with open(file_absolute_path, 'r', encoding='utf-8') as file:
            data = json.load(file) #parse json into python dictionaries 
        return {'status': True, 'data': data, 'code': 200}
    except FileNotFoundError:
        utils_logger.error("Error in prepare_file: FileNotFound")
        return {'status': False, 'error': 'File not found.', 'code': 404}
    except json.JSONDecodeError:
        utils_logger.error("Error in prepare_file: JSONDecodeError")
        return {'status': False, 'error': 'Invalid JSON file.', 'code': 400}
    except Exception as e:
        utils_logger.error(f"Error in prepare_file: {str(e)}")
        return {'status': False, 'error': str(e), 'code': 500}