from flask import render_template
from app import app
import sqlite3
from flask import g
from flask import request
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

@app.route('/fttestmap')
def fttestmap():
	return render_template("FTtestmap.html",
							title='Map')

@app.route('/testcharts')
def testcharts():
	return render_template("testcharts.html",
							title='Charts')


@app.route('/getcoords')
def getcoords():
	nationality = request.args.get('nat')
	year = request.args.get('year')
	month = request.args.get('month')
	if year == "00":
		year = None
	if month == "00":
		month = None

	if month is None and year is None and nationality is not None:
		if nationality == "1":
			cursor.execute('''SELECT latitude, longitude
							FROM Photo p
							WHERE latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country LIKE '%Iceland%')''')
		elif nationality == "2":
			cursor.execute('''SELECT latitude, longitude
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''')
		elif nationality == "3":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''')
	
	elif month is not None and year is None and nationality is not None:
		if nationality == "1":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
														FROM Photographer pg
														WHERE pg.country LIKE '%Iceland%')''', (month,))
		elif nationality == "2":
			cursor.execute('''SELECT latitude, longitude
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%m', date) = ?
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''', (month,))
		elif nationality == "3":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''', (month,))
	elif month is None and year is not None and nationality is not None:
		if nationality == "1":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND p.photographer IN(SELECT photographer
														FROM Photographer pg
														WHERE pg.country LIKE '%Iceland%')''', (year,))
		elif nationality == "2":
			cursor.execute('''SELECT latitude, longitude
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%Y', date) = ?
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''', (year,))
		elif nationality == "3":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''', (year,))
	elif month is not None and year is not None and nationality is not None:
		if nationality == "1":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
														FROM Photographer pg
														WHERE pg.country LIKE '%Iceland%')''', (year,month))
		elif nationality == "2":
			cursor.execute('''SELECT latitude, longitude
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%Y', date) = ?
							AND strftime('%m', date) = ?
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''', (year,month))
		elif nationality == "3":
			cursor.execute('''SELECT latitude, longitude
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''', (year,month))
	else:
		 return None

	coordinates = cursor.fetchall()
	coordList = []
	counter = 0
	for row in coordinates:
		# counter += 1
		# if counter == 100:
		# 	break
		coord = {
			'lat': row[0],
			'long': row[1]
		}
		coordList.append(coord);
	jsonefiedString = json.dumps(coordList).decode('utf-8')
	return jsonefiedString
	

@app.route('/getcountbymonth')
def getCountByMonth():
	# nationality = request.args.get('nat')
	iceCount = []
	foreignCount = []
	unknownCount = []

	year = request.args.get('year')
	if year == "00":
		year = None
	result = []
	for x in xrange(1,13):
		if x<10:
			month = "0" + str(x)
		else:
			month = str(x)
		if year is None:
			# if nationality == "1":
			cursor.execute('''SELECT COUNT(*)
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
														FROM Photographer pg
														WHERE pg.country LIKE '%Iceland%')''', (month,))
			iceCount.append(cursor.fetchone()[0])
			# elif nationality == "2":
			cursor.execute('''SELECT COUNT(*)
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%m', date) = ?
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''', (month,))
			foreignCount.append(cursor.fetchone()[0])
			# elif nationality == "3":
			cursor.execute('''SELECT COUNT(*)
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''', (month,))
			unknownCount.append(cursor.fetchone()[0])
		elif year is not None:
			# if nationality == "1":
			cursor.execute('''SELECT COUNT(*)
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
														FROM Photographer pg
														WHERE pg.country LIKE '%Iceland%')''', (year,month))
			iceCount.append(cursor.fetchone()[0])
			# elif nationality == "2":
			cursor.execute('''SELECT COUNT(*)
							FROM Photo p, Photographer pg
							WHERE p.photographer = pg.photographer
							AND latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%Y', date) = ?
							AND strftime('%m', date) = ?
							AND pg.country IS NOT NULL
							AND pg.country <> ""
							AND pg.country NOT LIKE "%Iceland%"''', (year,month))
			foreignCount.append(cursor.fetchone()[0])
			# elif nationality == "3":
			cursor.execute('''SELECT COUNT(*)
								FROM Photo p
								WHERE latitude IS NOT NULL
								AND longitude IS NOT NULL
								AND strftime('%Y', date) = ?
								AND strftime('%m', date) = ?
								AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country IS NULL
													OR pg.country = "")''', (year,month))
			unknownCount.append(cursor.fetchone()[0])
		else:
			return None	
		result = {
		'iceland': iceCount,
		'foreign': foreignCount,
		'unknown': unknownCount
	}

	jsonefiedString = json.dumps(result).decode('utf-8')
	return jsonefiedString

@app.route('/getcountbyyear')
def getCountByYear():
	# if nationality == "1":
	iceCount = []
	foreignCount = []
	unknownCount = []

	for year in xrange(2009, 2015):
		cursor.execute('''SELECT COUNT(*)
							FROM Photo p
							WHERE latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%Y', date) = ?
							AND p.photographer IN(SELECT photographer
													FROM Photographer pg
													WHERE pg.country LIKE '%Iceland%')''', (str(year),))
		iceCount.append(cursor.fetchone()[0])
	# elif nationality == "2":
		cursor.execute('''SELECT COUNT(*)
						FROM Photo p, Photographer pg
						WHERE p.photographer = pg.photographer
						AND latitude IS NOT NULL
						AND longitude IS NOT NULL
						AND strftime('%Y', date) = ?
						AND pg.country IS NOT NULL
						AND pg.country <> ""
						AND pg.country NOT LIKE "%Iceland%"''', (str(year),))
		foreignCount.append(cursor.fetchone()[0])
	# elif nationality == "3":
		cursor.execute('''SELECT COUNT(*)
							FROM Photo p
							WHERE latitude IS NOT NULL
							AND longitude IS NOT NULL
							AND strftime('%Y', date) = ?
							AND p.photographer IN(SELECT photographer
												FROM Photographer pg
												WHERE pg.country IS NULL
												OR pg.country = "")''', (str(year),))
		unknownCount.append(cursor.fetchone()[0])
	result = {
		'iceland': iceCount,
		'foreign': foreignCount,
		'unknown': unknownCount
	}
	return json.dumps(result).decode('utf-8')





	# if year is None and nationality is not None:
	# 	if nationality == "1":
	# 		cursor.execute('''SELECT COUNT(*)
	# 						FROM Photo p
	# 						WHERE p.photographer IN(SELECT photographer
	# 												FROM Photographer pg
	# 												WHERE pg.country LIKE '%Iceland%')''')
	# 	elif nationality == "2":
	# 		cursor.execute('''SELECT COUNT(*)
	# 						FROM Photo p, Photographer pg
	# 						WHERE p.photographer = pg.photographer
	# 						AND pg.country IS NOT NULL
	# 						AND pg.country <> ""
	# 						AND pg.country NOT LIKE "%Iceland%"''')
	# 	elif nationality == "3":
	# 		cursor.execute('''SELECT COUNT(*)
	# 							FROM Photo p
	# 							WHERE latitude IS NOT NULL
	# 							AND longitude IS NOT NULL
	# 							AND p.photographer IN(SELECT photographer
	# 												FROM Photographer pg
	# 												WHERE pg.country IS NULL
	# 												OR pg.country = "")''')


