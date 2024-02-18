from flask import Flask
from threading import Thread

app1 = Flask('app1')
app2 = Flask('app2')

@app1.route('/')
def index1():
    return 'Server 1'

@app2.route('/')
def index2():
    return 'Server 2'

def run_app1():
    app1.run(port=5000)

def run_app2():
    app2.run(port=5001)

if __name__ == '__main__':
    t1 = Thread(target=run_app1)
    t2 = Thread(target=run_app2)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
