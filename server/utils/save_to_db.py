import sqlite3
import os

def get_db_path():
    db_relative_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'contact_data.db')
    db_absolute_path = os.path.abspath(db_relative_path)
    return db_absolute_path
    

def save_to_db(name, email, message):
    try:
        db_path = get_db_path()

        db_connection = sqlite3.connect(db_path)
        cursor = db_connection.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contact_message (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP 
                )
            ''')

        cursor.execute('''
            INSERT INTO contact_message (name, email, message)
            VALUES (?, ?, ?)
    ''', (name, email, message))
        
        db_connection.commit()
        db_connection.close()

        return True
    except Exception:
        return False