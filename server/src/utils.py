import random

"""_summary
    """


def recommend_book(genre, all_books):
    '''Recommend a random book based on the genre'''
    genre_books = [book.dict() for book in all_books if book.genre == genre]
    if genre_books:
        return random.choice(genre_books)
    return None
