from flask import Flask, render_template, request, flash, session, redirect, jsonify
from datetime import datetime, timedelta
from dateutil.parser import parse
from model import Reservation, db, connect_to_db
import json

app = Flask(__name__)

@app.route('/')
def index():
    """Rerender component any time. """

    return render_template('base.html')

# @app.route('/existing_reservations')
# def existing_reservations():
#     """Show homepage"""

#     return render_template('base.html')

@app.route("/api/get_available_reservations/<username>", methods=["GET"])
def get_available_reservations(username):
    start_time = parse(request.args.get("startTime"))
    end_time = parse(request.args.get("endTime"))

    available_times = Reservation.available_reservations(start_time, end_time, username)
    times_formatted = [time.strftime("%a, %-d %b %Y %H:%M") for time in available_times]
    return jsonify(times_formatted)

@app.route("/api/retrieve_reservations/<username>")
def get_user_reservations(username):
    """ Retrieve reservations the user has made."""

    existing_reservations = Reservation.retrieve_reservations(username)
    times_formatted = [res.start_time.strftime("%a, %-d %b %Y %H:%M") for res in existing_reservations]
    return jsonify(times_formatted)

@app.route("/api/make_reservation/<username>", methods=["POST"])
def make_reservation(username):
    """ Create a reservation with the specified user and time."""
    reservation_start = parse(request.json.get("start_time"))

    new_reservation = Reservation.create_reservation(username, reservation_start)
    db.session.add(new_reservation)
    db.session.commit()
    return "Success"

@app.route("/api/delete_reservation/<username>", methods=["POST"])
def delete_reservation(username):
    """ Delete reservations the user has made."""
    reservation_start = parse(request.json.get("startTime"))

    reservation_to_delete = Reservation.find_reservation_by_start_and_user(
        reservation_start, username
    )
    db.session.delete(reservation_to_delete)
    db.session.commit()
    return "Success"

if __name__ == '__main__':
    
    connect_to_db(app)
    app.run(host='0.0.0.0', port='5000', debug='True')
