import os
import uuid
from datetime import timedelta
# Flask imports
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from flask_cors import CORS, cross_origin
# Others
from dotenv import load_dotenv
from pydantic import ValidationError
# Local imports
import src.models as models
import src.utils as utils

# load .env file
load_dotenv()

jwt_secret = os.getenv("JWT_SECRET") or "super-secret"

# App setup
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = jwt_secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)
# Enable Cors for url
CORS(app)
jwt = JWTManager(app)

# TODO: Move this to a database later
# For now using an in-memory list to store books
books: list[models.Book] = []


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
    if genre is None:
        return jsonify({"message": "Genre query parameter is required"}), 400
    recommended_book = utils.recommend_book(genre, books)
    if recommended_book is None:
        return jsonify({"message": "No books found for the given genre"}), 404
    return jsonify(recommended_book), 200


@app.route('/books', methods=['POST'])
@jwt_required()
@cross_origin()
def add_book():
    '''Add a new book'''
    try:
        uid = str(uuid.uuid4())
        data = request.get_json()
        book_data = models.Book(**data, id=uid)
        book = models.Book(
            id=book_data.id,
            title=book_data.title,
            author=book_data.author,
            genre=book_data.genre)
        books.append(book)
        return jsonify(book.dict()), 201
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400


@app.route('/books', methods=['GET'])
@jwt_required()
@cross_origin()
def get_books():
    '''Get all books'''
    books_json = [book.dict() for book in books]
    return jsonify(books_json)


@app.route('/books/<string:id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_book(id):
    '''Delete a book by id'''
    book = next((book for book in books if book.id == id), None)
    if book is None:
        return jsonify({"message": "Book not found"}), 404
    books.remove(book)
    return jsonify({"message": "Book deleted"}), 200


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    '''Login API'''
    # TODO: Implement a proper authentication mechanism here
    # For now using a hardcoded username and password
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if username == 'user' and password == 'password':
        access_token = create_access_token(identity={'username': username})
        return jsonify(access_token=access_token)
    return jsonify({"msg": "Bad username or password"}), 401
