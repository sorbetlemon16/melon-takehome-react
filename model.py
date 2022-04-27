from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Reservation(db.Model):
    
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String)
    start_time = db.Column(db.DateTime)

    def __repr__(self):
        return f"<Reservation username={self.username} start_time={self.start_time}>"

    def to_dict(self):
        return {
            "reservation_id": self.reservation_id,
            "username": self.username,
            "start_time": self.start_time.isoformat(' '),
        }

    @classmethod
    def find_reservation_by_start_and_user(cls, reservation_start, username):
        reservation = cls.query\
            .filter(cls.start_time==reservation_start)\
            .filter(cls.username==username)\
            .first()
        return reservation

    @classmethod
    def retrieve_reservations(cls, username):
        return cls.query.filter_by(username=username).all()

    @classmethod
    def create_reservation(cls, username, reservation_start): 
        new_reservation = cls(username=username, start_time=reservation_start)
        return new_reservation

    @classmethod
    def available_reservations(cls, start_time, end_time, username):
        # Retrieve reservations within the specified time range 
        all_reservations_in_range = (
            db.session.query(cls.start_time)\
            .filter(cls.start_time.between(start_time, end_time))\
        )
        # Get reservation times without time zone
        existing_reservation_times = \
            {res[0].replace(tzinfo=None) for res in all_reservations_in_range.all()}

        # Get ALL current user reservations. The reason I am doing this is because during
        # testing I noticed that the all_reservations_in_range did not include reservations
        #  the user made that day at a later time outside the end time. To prevent users from 
        # booking multiple reservations on the same day, I get all current user reservations 
        # and check that any other available reservations are not on that day. 
        user_reservations = db.session.query(cls.start_time)\
            .filter(cls.username==username)\
            .all()

        # get the list of dates the user has a reservation on
        user_reservation_dates = {res.start_time.date() for res in user_reservations}

        # Initialize list for possible times 
        times = []
    
        # Possible reservations can only happen on the half hour
        first_reservation_time = start_time + (datetime.min - start_time) \
            % timedelta(minutes=30)
        current = first_reservation_time

        # Add possible times, filtering where a reservation already exists OR where
        # user already has a reservation on that date
        while current < end_time:
            if current not in existing_reservation_times and current.date() not in user_reservation_dates:
                times.append(current)
            current = current + timedelta(minutes=30)
        return times

def connect_to_db(app, db_uri="postgresql:///melon_reservations"):
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    db.create_all()
    print("Connected to db")