from flask import Blueprint, request, jsonify
from utils.save_to_db import save_to_db
from utils.send_email import send_to_email
from utils.log_helper import routes_logger
from utils.captcha import verify_captcha
from extensions import limiter
from email_validator import validate_email, EmailNotValidError

contact_bp = Blueprint('contact', __name__)

def check_email_validity(email):
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False


def sanitize(text):
    return text.replace('\r', '').replace('\n', '').strip()

@contact_bp.route('/contact_message', methods=['POST'])
@limiter.limit("3 per minute")
def receive_contact_message():
    routes_logger.info("Contact_message endpoint was called.")
    data = request.get_json(silent=True)

    if not data:
        routes_logger.warning("Warning in contact_route: Invalid or mission JSON")
        return jsonify({'error': 'Invalid or missing JSON.'}), 400
    
    if not verify_captcha(data.get('captchaToken', ''), request.remote_addr):
        routes_logger.warning('Warning: Captcha failed.')
        return jsonify({'error': 'Captcha failed.'}), 403
    
    name = sanitize(data.get('name', ''))
    email = sanitize(data.get('email', ''))
    message = data.get('message', '').strip()

    #check length of name email and message
    if (len(name) < 2 or len(name) > 50) or (len(email) < 2 or len(email) > 100) or (len(message) < 100 or len(message) > 700):
        routes_logger.error("Error in contact_route: Ivalid input.")
        return jsonify({'error': 'Invalid input.'}), 400

    if not name or not email or not message or not check_email_validity(email):
        routes_logger.error("Error in contact_route: Ivalid input.")
        return jsonify({'error': 'Invalid input.'}), 400
    
    #save to db
    is_saved = save_to_db(name, email, message)

    if not is_saved:
        return jsonify({'error': 'Failed to save message.'}), 500

    #send email
    try:
        send_to_email(name, email, message)
        return jsonify({'status': 'Message sent!'}), 200
    except Exception as e:
        routes_logger.error(f"Error in contat_route: Email sending failed: {e}")
        return jsonify({'status': 'Saved to database, but failed to email.'}), 202

    