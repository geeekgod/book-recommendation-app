from pydantic import BaseModel


class Book(BaseModel):
    id: str
    title: str
    author: str
    genre: str
    user_id: str


class User(BaseModel):
    id: str
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str
