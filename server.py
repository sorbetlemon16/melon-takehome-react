from flask import Flask, render_template, request, flash, session, redirect, jsonify
from datetime import datetime, timedelta
from dateutil.parser import parse
from model import Reservation, db, connect_to_db

app = Flask(__name__)

@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')

@app.route('/existing_reservations')
def existing_reservations():
    """Show homepage"""

    return render_template('base.html')


@app.route("/get_available_reservations", methods=["GET"])
def get_available_reservations():
    start_time = parse(request.args.get("startTime"))
    end_time = parse(request.args.get("endTime"))

    # fix none to be username

    available_times = Reservation.available_reservations(start_time, end_time, None)
    return jsonify(available_times)

if __name__ == '__main__':
    
    connect_to_db(app)
    app.run(host='0.0.0.0', port='5000', debug='True')
