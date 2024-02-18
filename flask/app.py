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
        date_time = date + ' '+time
        print(date_time)        
        # conn = sqlite3.connect('example.db')
        # c = conn.cursor()
        # # c.execute(f"INSERT INTO records (id, pet_type, date, duration, agentId) VALUES (1231, 'cat', '{date_time}', 1, 'agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5')")
        # conn.commit()
        # conn.close()
        appscript.app('Terminal').do_script('python3 /Users/tanaygodse/Desktop/Treehacks/flask/pet_owner.py')
        return jsonify({'message': 'Appointment scheduled successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)