from flask import render_template
from app import app
import sqlite3
from flask import g

db = sqlite3.connect('combined.sqlite', check_same_thread=False)
cursor = db.cursor()


@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'Miguel'}  # fake user
    posts = [  # fake array of posts
        { 
            'author': {'nickname': 'John'}, 
            'body': 'Beautiful day in Portland!' 
        },
        { 
            'author': {'nickname': 'Susan'}, 
            'body': 'The Avengers movie was so cool!' 
        }
    ]
    return render_template("index.html",
                           title='Home',
                           user=user,
                           posts=posts)
@app.route('/test')
def test():
	cursor.execute('''SELECT type FROM CameraType''')
	q_flickrIceland = cursor.fetchall()
	return render_template("test.html",
							title='home',
							CameraType=q_flickrIceland)



