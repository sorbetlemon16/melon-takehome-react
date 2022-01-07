from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')


if __name__ == '__main__':
    
    # connect_to_db(app)
    app.run(host='0.0.0.0', port='5000')
