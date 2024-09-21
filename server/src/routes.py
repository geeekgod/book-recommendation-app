"""
Flask App & Routes
"""
import os
from datetime import timedelta
# Flask imports
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from flask_cors import CORS, cross_origin
# Others
from dotenv import load_dotenv
from pydantic import ValidationError
# Local imports
from src import models
from src import utils

# load .env file
load_dotenv()

jwt_secret = os.getenv("JWT_SECRET") or "super-secret"

# App setup
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = jwt_secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)
# Enable Cors
CORS(app)
jwt = JWTManager(app)


@app.route("/ping", methods=["GET"])
@cross_origin()
def ping():
    '''Health check API'''
    return jsonify({"message": "pong"})


@app.route('/books/recommend', methods=['GET'])
@jwt_required()
@cross_origin()
def recommend_book():
    '''Recommend a random book based on the genre using'''
    genre = request.args.get('genre')
    current_user = get_jwt_identity()
    if genre is None:
        return jsonify({"message": "Genre query parameter is required"}), 400
    books = utils.read_json_file('books.json')
    recommended_book = utils.recommend_book(genre, books, current_user['id'])
    if recommended_book is None:
        return jsonify({"message": "No books found for the given genre"}), 404
    return jsonify(recommended_book), 200


@app.route('/books', methods=['POST'])
@jwt_required()
@cross_origin()
def add_book():
    '''Add a new book'''
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        books = utils.read_json_file('books.json')
        new_id = utils.get_next_id(books)
        book_data = models.Book(
            id=str(new_id), user_id=current_user['id'], **data)
        books.append(book_data.dict())
        utils.write_json_file('books.json', books)
        return jsonify(book_data.dict()), 201
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400


@app.route('/books', methods=['GET'])
@jwt_required()
@cross_origin()
def get_books():
    '''Get all books'''
    current_user = get_jwt_identity()
    books = utils.read_json_file('books.json')
    user_books = [book for book in books if book['user_id']
                  == current_user['id']]
    return jsonify(user_books)


@app.route('/books/<string:id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_book(book_id):
    '''Delete a book by id'''
    current_user = get_jwt_identity()
    books = utils.read_json_file('books.json')
    book = next((book for book in books if book['id'] ==
                book_id and book['user_id'] == current_user['id']), None)
    if book is None:
        return jsonify({"message": "Book not found"}), 404
    books.remove(book)
    utils.write_json_file('books.json', books)
    return jsonify({"message": "Book deleted"}), 200


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    '''Register a new user'''
    try:
        data = request.get_json()
        users = utils.read_json_file('users.json')
        if any(user['username'] == data['username'] for user in users):
            return jsonify({"message": "Username already exists"}), 400
        new_id = utils.get_next_id(users)
        user_create_data = models.UserCreate(**data)
        hashed_password = utils.hash_password(user_create_data.password)
        user_data = models.User(
            id=str(new_id), username=user_create_data.username, password=hashed_password)
        users.append(user_data.dict())
        utils.write_json_file('users.json', users)
        return jsonify({"message": "User registered successfully"}), 201
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    '''Login API'''
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    users = utils.read_json_file('users.json')
    user = next((user for user in users if user['username'] == username), None)
    if user and utils.verify_password(user['password'], password):
        access_token = create_access_token(
            identity={'id': user['id'], 'username': user['username']})
        return jsonify(access_token=access_token)
    return jsonify({"msg": "Bad username or password"}), 401
