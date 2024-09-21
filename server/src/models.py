"""
The list of models created with pydantic
"""

from pydantic import BaseModel


class Book(BaseModel):
    """
    Represents a book in the book recommendation app.
    Attributes:
        id (str): The unique identifier for the book.
        title (str): The title of the book.
        author (str): The author of the book.
        genre (str): The genre of the book.
        user_id (str): The unique identifier of the user who added the book.
    """
    id: str
    title: str
    author: str
    genre: str
    user_id: str


class User(BaseModel):
    """
    Represents a user in the book recommendation app.
    Attributes:
    id (str): The unique identifier for the user.
    username (str): The username of the user.
    password (str): The password of the user.
    """
    id: str
    username: str
    password: str


class UserCreate(BaseModel):
    """
    Model used while creating a new user for validation.
    Attributes:
        username (str): The username of the user.
        password (str): The password of the user.
    """
    username: str
    password: str
