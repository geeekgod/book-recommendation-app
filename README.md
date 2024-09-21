# Book Recommendation Web Application

## Overview

A web application which allows users to register, log in, and manage their book collections with an additional feature to recommend books based on genre. The backend is powered by **Flask** with **JWT-based authentication**, and the frontend is developed using **React** with **Vite** and **TailwindCSS**.

## Features

- **User Authentication**: JWT secured login and registration with password hashing for security.
- **Book Management**: Add, view, and delete books from a personal collection.
- **Book Recommendation**: Get random book recommendations based on selected genres, excluding books from the logged in users collection.
- **Interactive UI**: Responsive, intuitive user interface built with React and TailwindCSS.
- **Secure API**: All book related operations are protected with JWT authentication.

## Tech Stack

### Frontend

- **React**: A modern JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **TailwindCSS**: A utility first CSS framework for rapid UI development.
- **Axios**: For handling HTTP requests to the backend.

### Backend

- **Flask**: A lightweight WSGI web application framework in Python.
- **Flask-JWT-Extended**: For JWT-based authentication and authorization.
- **Pydantic**: For data validation in Python.
- **Python-dotenv**: For managing environment variables.
- **bcrypt**: For secure password hashing.

### Database

- **JSON**: Used as a lightweight, file-based storage system for this app. (Easily upgradable to a relational database like PostgreSQL or a NoSQL database like MongoDB.)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Python** (v3.8+)
- **Node.js** (v18+)
- **bun**
- **virtualenv** (for virtual environment management)

### Backend Setup (Flask)

1. **Clone the repository**:

```bash
git clone https://github.com/geeekgod/book-recommendation-app.git
cd book-recommendation-app
```

2. **Create and activate a virtual environment**:

```bash
virtualenv venv
source venv/bin/activate
```

3. **Install dependencies**:

```bash
pip install -r requirements.txt
```

4. **Set environment variables**:

Create a `.env` file in the server directory and add:
```
cp server/.env.example server/.env
```

```bash
JWT_SECRET=your_jwt_secret_key
```

5. **Initialize the database**:

The application uses JSON files to store user and book data. Ensure you initialize them before running the app:

```bash
python3 app.py
```

This will create `books.json` and `users.json` in the `db/` directory if they don't exist.

6. **Run the Flask server**:

```bash
python3 app.py
```

The server will be running at `http://127.0.0.1:8080`.

### Frontend Setup (React)

1. **Navigate to the frontend directory**:

```bash
cd client
```

2. **Install frontend dependencies**:

```bash
bun install
```

3. **Create .env.local file using .env.example in client**:

```bash
cp client/.env.example client/.env.local
```

4. **Enter the Flask API URL**

```bash
VITE_API_BASE_URL=http://127.0.0.1:8080
```

5. **Run the Vite development server**:

```bash
bun run dev
```

The frontend will be accessible at `http://localhost:5173`.

### Running the Application

- Open the frontend at `http://localhost:5173`.
- Register a new user and log in.
- Add books to your collection and explore the recommendation.

## API Documentation

### Authentication

- **POST /register**: Register a new user

  - Body: `{ "username": "user", "password": "pass" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /login**: Authenticate and receive a JWT token
  - Body: `{ "username": "user", "password": "pass" }`
  - Response: `{ "access_token": "jwt_token_here" }`

### Books

- **GET /books**: Get all books for the authenticated user

  - Header: `Authorization: Bearer <JWT_TOKEN>`
  - Response: List of user’s books.

- **POST /books**: Add a new book

  - Header: `Authorization: Bearer <JWT_TOKEN>`
  - Body: `{ "title": "Book Title", "author": "Author Name", "genre": "Genre" }`
  - Response: Created book object.

- **DELETE /books/<id>**: Delete a book by ID

  - Header: `Authorization: Bearer <JWT_TOKEN>`
  - Response: `{ "message": "Book deleted" }`

- **GET /books/recommend?genre=<genre>**: Get a random book recommendation based on genre
  - Header: `Authorization: Bearer <JWT_TOKEN>`
  - Response: Random recommended book.

## Frontend Walkthrough

1. **Login/Registration Page**:

- Allows users to log in or sign up for an account.
- Uses JWT for secure authentication.

2. **Application**:

- Displays the user's book collection.
- Includes options to add new books and delete existing ones.
- Get a random book recommendation based on any random genre from the books user has added.

## Project Structure

```
book-recommendation-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.local          # Environment variables for React
│
├── server/                 # Flask backend
│   ├── db/                 # JSON storage for books and users
│   ├── src/                # Application source code
│   │   ├── routes.py       # API routes
│   │   ├── models.py       # Data models using Pydantic
│   │   └── utils.py        # Utility functions
│   │── app.py              # Entry point for the Flask app
│   │── requirements.txt    # Backend dependencies
│   └── .env                # Environment variables for Flask API
│
└── README.md               # Project documentation
```
