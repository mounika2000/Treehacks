# create_and_insert.py
import sqlite3


def create_db_and_insert_row():
    conn = sqlite3. connect('example.db')
    c = conn.cursor()
    c.execute('''DROP TABLE records''')
    c.execute('''CREATE TABLE IF NOT EXISTS records
                 (id INTEGER PRIMARY KEY, pet_type TEXT, date DATETIME, duration INTEGER, agentId TEXT)''')

    c.execute("INSERT INTO records (pet_type, date, duration, agentId) VALUES ('dog', '2024-02-17', 1, 'agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5')")

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_db_and_insert_row()
