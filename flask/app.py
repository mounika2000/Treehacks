from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import sqlite3
import appscript

app = Flask(__name__)
CORS(app)


@app.route('/scheduleAppointment/', methods=['GET'])
def scheduleAppointment():
    try:
        print('Here0')
        conn = sqlite3.connect('example.db')
        c = conn.cursor()
        #c.execute('''DROP TABLE records''')
        c.execute('''CREATE TABLE IF NOT EXISTS records
                 (id INTEGER PRIMARY KEY, pet_type TEXT, date DATETIME, duration INTEGER, agentId TEXT)''')
        c.execute("INSERT INTO records (pet_type, date, duration, agentId) VALUES ('dog', '2024-02-17', 1, 'agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5')")
        conn.commit()
        conn.close()
        print('Here')
        #subprocess.call(['open', '-W', '-a', 'Terminal.app', 'python3', '--args', 'pet_owner.py'])
        appscript.app('Terminal').do_script('python3 /Users/tanaygodse/Desktop/Treehacks/flask/pet_owner.py')
        print('Here 2')
        return jsonify({'message': 'Appointment scheduled successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)