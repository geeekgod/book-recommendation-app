"""
All the utility methods used in API
"""

import os
import json
import random
import bcrypt
DB_DIR = os.path.join(os.path.dirname(__file__), '..', 'db')


def recommend_book(genre, all_books, user_id):
    """
    Recommend a random book based on the genre, excluding books created by the user.
    """

    genre_books = [book for book in all_books if book['genre']
                   == genre and book['user_id'] != user_id]
    if genre_books.count == 1:
        return genre_books[0]
    if genre_books:
        return random.choice(genre_books)
    return None


def read_json_file(filename):
    """
    Reads a JSON file from the specified filename and returns its contents.
    """

    filepath = os.path.join(DB_DIR, filename)
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8') as file:
        return json.load(file)


def write_json_file(filename, data):
    """
    Writes the provided data to a JSON file.
    """

    filepath = os.path.join(DB_DIR, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2)


def get_next_id(data):
    """
    Generate the next unique ID for a new item in the dataset.
    """

    if not data:
        return 1
    return max(int(item['id']) for item in data) + 1


def hash_password(password: str) -> str:
    """
    Hashes a plaintext password using bcrypt.
    """

    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(stored_password: str, provided_password: str) -> bool:
    """
    Verify if the provided password matches the stored password.
    """

    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))
