from flask import render_template
from app import app
import sqlite3
from flask import g
from flask import jsonify
import json

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


@app.route('/testmap')
def testmap():
	return render_template("testmap.html",
							title='Map')


@app.route('/getcoords/icelandic')
def getcoords():
	cursor.execute('''SELECT latitude, longitude
FROM Photo p
WHERE latitude IS NOT NULL
AND longitude IS NOT NULL
AND p.photographer IN(SELECT photographer
                   FROM Photographer pg
                   WHERE pg.country LIKE '%Iceland%')''')
	coordinates = cursor.fetchall()
	coordList = []
	counter = 0
	for row in coordinates:
		# counter += 1
		# if counter == 1000:
		# 	break
		coord = {
			'lat': row[0],
			'long': row[1]
		}
		coordList.append(coord);
	jsonefiedString = json.dumps(coordList).decode('utf-8')
	return jsonefiedString