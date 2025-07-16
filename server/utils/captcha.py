import dotenv
import os
import requests
from utils.log_helper import utils_logger

dotenv.load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

def verify_captcha(captcha_token, remote_ip):
    try:
        data = {
            "secret": os.environ.get("RECAPTCHA_SECRET_DEV"),
            "response": captcha_token,
            "remoteip": remote_ip
        }
        response = requests.post(os.environ.get("API_ENDPOINT"), data=data)
        data = response.json()
        return data['success']
    except Exception as e:
        utils_logger.error(f"Error in verify_captcha: {str(e)}")
        return False