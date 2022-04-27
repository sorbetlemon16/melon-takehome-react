## Installation
To run Melon Reservation Schedule on your local machine, follow the instructions below (note: these instructions assume you have Postgres installed and running):

Clone this repo: https://github.com/sorbetlemon16/melon_takehome.git

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

Create the database: 
```createdb melon_reservations```. 

Create the tables by running model.py interactively:
```python3 -i model.py```. 
```>>> db.create_all()```. 

Run the app:
```python3 server.py```

You can now navigate to 'localhost:5000/' to access Melon Tasting Scheduler.