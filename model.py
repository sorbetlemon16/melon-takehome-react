from datetime import datetime
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