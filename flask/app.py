from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import sqlite3
import appscript

app = Flask(__name__)
CORS(app)


@app.route('/scheduleAppointment/', methods=['GET'])
def scheduleAppointment():
    try:
        date = request.args.get('date')  # Extract date from query parameters
        time = request.args.get('time')  # Extract time from query parameters
        date_time = date + ' ' + time
        print(date_time)        
        conn = sqlite3.connect('example.db')
        c = conn.cursor()
        # Using a parameterized query to avoid SQL injection
        c.execute("INSERT INTO records (pet_type, date, duration, agentId) VALUES (?, ?, ?, ?)", 
                  ('cat', date_time, 1, 'agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5'))
        conn.commit()
        conn.close()
        # Assuming you have the necessary imports and setup for Flask and SQLite
        appscript.app('Terminal').do_script('cd /Users/tanaygodse/Desktop/Treehacks/flask/ && python3 /Users/tanaygodse/Desktop/Treehacks/flask/pet_owner.py')
        return jsonify({'message': 'Appointment scheduled successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)