import smtplib
from email.mime.text import MIMEText
import dotenv
import os

dotenv.load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

def send_to_email(name, email, message):
    sender = os.environ.get("EMAIL_SENDER", "")
    sender_pss = os.environ.get("EMAIL_APP_PASSWORD", "")
    receiver = os.environ.get("EMAIL_RECEIVER", "")
    email_server = os.environ.get("EMAIL_SERVER", "")
    port_number = int(os.environ.get("EMAIL_PORT", ""))

    body = f"From: {name} <{email}>\n\n{message}"
    final_message = MIMEText(body, _charset='utf-8')
    final_message['Subject'] = "From portfolio website contact form."
    final_message['From'] = sender
    final_message['To'] = receiver


    with smtplib.SMTP_SSL(email_server, port_number) as server:
        server.login(sender, sender_pss)
        server.send_message(final_message)

