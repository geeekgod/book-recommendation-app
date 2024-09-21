from src.routes import app
import logging
from src.utils import read_json_file, write_json_file


def init_db():
    if not read_json_file('books.json'):
        write_json_file('books.json', [])
    if not read_json_file('users.json'):
        write_json_file('users.json', [])


if __name__ == "__main__":
    logging.basicConfig(filename='logs/app.log', level=logging.DEBUG,
                        format='%(asctime)s %(levelname)s %(name)s %(message)s')
    init_db()
    app.run(debug=True, host="0.0.0.0", port=8080)
