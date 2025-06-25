from flask import Blueprint, request, jsonify
import re
from utils.save_to_db import save_to_db
from utils.send_email import send_to_email

contact_bp = Blueprint('contact', __name__)

def check_email_validity(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def sanitize(text):
    return text.replace('\r', '').replace('\n', '').strip()

@contact_bp.route('/contact_message', methods=['POST'])
def receive_contact_message():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({'error': 'Invalid or missing JSON.'}), 400
    
    name = sanitize(data.get('name', ''))
    email = sanitize(data.get('email', ''))
    message = data.get('message', '').strip()

    if not name or not email or not message or not check_email_validity(email):
        return jsonify({'error': 'Invalid input.'}), 400
    
    #add to db
    is_saved = save_to_db(name, email, message)

    if not is_saved:
        return jsonify({'error': 'Failed to save message.'}), 500

    #send email
    try:
        send_to_email(name, email, message)
    except Exception as e:
        print(f"Email sending failed: {e}")

    return jsonify({'status': 'Message sent!'}), 200