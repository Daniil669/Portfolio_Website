from flask import Blueprint, request, jsonify
import re
from utils.save_to_db import save_to_db
from utils.send_email import send_to_email
from utils.log_helper import routes_logger

contact_bp = Blueprint('contact', __name__)

def check_email_validity(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def sanitize(text):
    return text.replace('\r', '').replace('\n', '').strip()

@contact_bp.route('/contact_message', methods=['POST'])
def receive_contact_message():
    routes_logger.info("Contact_message endpoint was called.")
    data = request.get_json(silent=True)

    if not data:
        routes_logger.warning("Warning in contact_route: Invalid or mission JSON")
        return jsonify({'error': 'Invalid or missing JSON.'}), 400
    
    name = sanitize(data.get('name', ''))
    email = sanitize(data.get('email', ''))
    message = data.get('message', '').strip()

    if not name or not email or not message or not check_email_validity(email):
        routes_logger.error("Error in contact_route: Ivalid input.")
        return jsonify({'error': 'Invalid input.'}), 400
    
    #add to db
    is_saved = save_to_db(name, email, message)

    if not is_saved:
        return jsonify({'error': 'Failed to save message.'}), 500

    #send email
    try:
        send_to_email(name, email, message)
    except Exception as e:
        routes_logger.error(f"Error in contat_route: Email sending failed: {e}")

    return jsonify({'status': 'Message sent!'}), 200