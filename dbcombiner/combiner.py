import sqlite3

combineddb = sqlite3.connect('combined.sqlite')
fhpxdb = sqlite3.connect('fhpx.sqlite')
flickrdb = sqlite3.connect('flickr.sqlite')
combinedCursor = combineddb.cursor()
flickrCursor = flickrdb.cursor()
fhpxCursor = fhpxdb.cursor()

# Flickr
flickrCursor.execute('''SELECT name FROM Camera''')
for row in flickrCursor:
	combinedCursor.execute('''SELECT name FROM Camera WHERE name=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Camera(name) VALUES(?)', (row[0],))

flickrCursor.execute('''SELECT id, photographer, latitude, longitude, camera, date FROM Photo''')
for row in flickrCursor:
	combinedCursor.execute('''SELECT id FROM Photo WHERE id=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Photo(id, photographer, latitude, longitude, camera, date, siteID) VALUES(?, ?, ?, ?, ?, ?, ?)', (row[0],row[1],row[2],row[3],row[4],row[5],1))

flickrCursor.execute('''SELECT photographer, country FROM Photographer''')
for row in flickrCursor:
	combinedCursor.execute('''SELECT photographer FROM Photographer WHERE photographer=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Photographer(photographer, country) VALUES(?,?)', (row[0],row[1]))


# 500px
fhpxCursor.execute('''SELECT name FROM Camera''')
for row in fhpxCursor:
	combinedCursor.execute('''SELECT name FROM Camera WHERE name=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Camera(name) VALUES(?)', (row[0],))

fhpxCursor.execute('''SELECT id, photographer, latitude, longitude, camera, date FROM Photo''')
for row in fhpxCursor:
	combinedCursor.execute('''SELECT id FROM Photo WHERE id=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Photo(id, photographer, latitude, longitude, camera, date, siteID) VALUES(?, ?, ?, ?, ?, ?, ?)', (row[0],row[1],row[2],row[3],row[4],row[5],2))

fhpxCursor.execute('''SELECT username, country FROM Photographer''')
for row in fhpxCursor:
	combinedCursor.execute('''SELECT photographer FROM Photographer WHERE photographer=?''', (row[0],))
	if combinedCursor.fetchone() is None:
		combinedCursor.execute('INSERT INTO Photographer(photographer, country) VALUES(?,?)', (row[0],row[1]))

combineddb.commit()
combineddb.close()
fhpxdb.close()
flickrdb.close()