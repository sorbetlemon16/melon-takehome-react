# Melon Reservation Scheduler

## Description
This project allows you to make and manage melon tasting reservations. 🍉

## Justification
I chose to use Flask because it is a lightweight web framework that is flexible and simple to implement. I used postgreSQL because it's a commonly used relational database and makes a good choice since every reservation has a consistent format. SQLAlchemy allowed me to incorporate these two technologies using Python. On the front end, I built this page in React as a single page app because client side rendering provides a more seamless experience for the user. When designing the React components, I decided to use existingReservations and username as state in the parent component because they are shared by the child components: LogIn, ExistingReservations, and AvailableReservations and could be passed down as props.

## Reflection
In addition to fulfilling the requirements, I also added delete functionality and ensured that my web app is responsive to different screen sizes.

Given more time, I would incorporate a User table that would have a relationship with the Reservation table. With a User table, I could have a password field which would allow me to enable authentication. I would use the Python hashlib library with salt to encrypt the password. 

I would also like to add unit tests that test that a particular time does not show up in the list of available times when it's already booked. 

## Installation
To run Melon Reservation Schedule on your local machine, follow the instructions below (note: these instructions assume you have Postgres installed and running):

Clone this repo: https://github.com/sorbetlemon16/melon_takehome-react.git

Create and activate a virtual environment inside your project directory:

```
virtualenv env (Mac OS)
virtualenv env --always-copy (Windows OS)
source env/bin/activate
```

Install the dependencies:
```pip3 install -r requirements.txt```

Create a secrets.sh file to assign a value to APP_SECRET_KEY and run it:
```source secrets.sh```

Create the database and tables by running the following commands: 
```
createdb melon_reservations 
python3 -i model.py
>>> db.create_all()
``` 

Run the app:
```python3 server.py```

You can now navigate to 'localhost:5000/' to access Melon Tasting Scheduler.