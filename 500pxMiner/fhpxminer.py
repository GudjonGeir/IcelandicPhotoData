import requests
import sqlite3
db = sqlite3.connect('fhpx.sqlite')
cursor = db.cursor()


baseurl = 'https://api.500px.com/v1/photos/search?rpp=100&geo=64.783947%2C-18.235342%2C350km&consumer_key=7mQLRPNEyZHHresRqQVWjfhDViuNniNGJ5iiCV9V'
response = requests.get(baseurl).json()
totalPages = response['total_pages']



for x in range(1, totalPages + 1):
	response = requests.get(baseurl + "&page=" + str(x)).json()
	photos = response['photos']
	for p in photos:
		# Insert camera info if it's not present in table and it's not null
		if p['camera'] is not None:
			cursor.execute('''SELECT name FROM Camera WHERE name=?''', (p['camera'],))
			if cursor.fetchone() is None:
				cursor.execute('INSERT INTO Camera(name) VALUES(?)', (p['camera'],))
		

		# Insert photohrapher info if not present in table
		cursor.execute('''SELECT id FROM Photographer WHERE id=?''', (p['user']['id'],))
		if cursor.fetchone() is None:
			cursor.execute('INSERT INTO Photographer(id, username, country) VALUES(?, ?, ?)', (p['user']['id'],p['user']['username'],p['user']['country']))
		
		# Insert photos
		cursor.execute('''INSERT INTO Photo(id, Photographer, latitude, longitude, camera, date)
	                  VALUES(?,?,?,?,?,?)''', (p['id'],p['user']['username'], p['latitude'], p['longitude'],p['camera'],p['taken_at']))

	print "Page %d of %d" % (x, totalPages)
	


db.commit()
db.close
print "Finished"
