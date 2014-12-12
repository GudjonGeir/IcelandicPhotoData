import requests
import sqlite3
import datetime
def isNoneOrEmptyOrBlankString (myString):
        if myString:
            if not myString.strip():
                return True
        else:
            return True

        return False


def getPhotoData (page, dbcursor):
	counter = 0
	errorLog = open("log.txt", "a")
	for p in page:
		counter += 1
		if counter % 25 == 0:
			print "Photo " + str(counter)

		photoid = p['id']
		dbcursor.execute('''SELECT id FROM Photo WHERE id=?''', (photoid,))
		if cursor.fetchone() is not None:
			#print "Photo exists, skipping. PhotoID: " + str(photoid)
			continue

		photoGetInfo = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e2cc3f278fde020b3a1d4a720893caa9&photo_id=' + str(photoid) + '&format=json&nojsoncallback=1'
		photoinfo = requests.get(photoGetInfo).json()
		if photoinfo['stat'] == "ok":
			photographer = photoinfo['photo']['owner']['nsid']
			ownerLocation = photoinfo['photo']['owner']['location']
			latitude = photoinfo['photo']['location']['latitude']
			longitude = photoinfo['photo']['location']['longitude']
			dateTaken = photoinfo['photo']['dates']['taken']
		else:
			errorLog.write("Error code #" + str(photoinfo['code']) + " in photos.getInfo - photoid = " + str(photoid) + "\n")
			continue

		photoGetExif = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=e2cc3f278fde020b3a1d4a720893caa9&photo_id=' + str(photoid) + '&format=json&nojsoncallback=1'
		photoExif = requests.get(photoGetExif).json()
		camera = None
		if photoExif['stat'] == "ok":
			camera = photoExif['photo']['camera']
		else:
			errorLog.write("Error code #" + str(photoExif['code']) + " in photos.getExif - photoid = " + str(photoid) + "\n")
			# continue

		# Check if photo originated from instagram
		if isNoneOrEmptyOrBlankString(camera):
			tags =  photoinfo['photo']['tags']['tag']
			instagram = False
			for t in tags:
				if "Instagram" in t['raw'] or "instagram" in t['raw']:
					camera = "Instagram"
					instagram = True
					break
			if not instagram:
				"Camera field is empty, photdoid = " + str(photoid)
		# Insert camera info if it's not present in table and it's not null
		if camera is not None: 
			cursor.execute('''SELECT name FROM Camera WHERE name=?''', (camera,))
			if dbcursor.fetchone() is None:
				dbcursor.execute('INSERT INTO Camera(name) VALUES(?)', (camera,))



		# # Insert photos
		dbcursor.execute('''SELECT id FROM Photo WHERE id=?''', (photoid,))
		if dbcursor.fetchone() is None:
			dbcursor.execute('''INSERT INTO Photo(id, photographer, latitude, longitude, camera, date)
	                  VALUES(?,?,?,?,?,?)''', (photoid, photographer, latitude, longitude, camera, dateTaken))

		# Insert photohrapher info if not present in table
		dbcursor.execute('''SELECT photographer FROM Photographer WHERE photographer=?''', (photographer,))
		if dbcursor.fetchone() is None:
			dbcursor.execute('INSERT INTO Photographer(photographer, country) VALUES(?, ?)', (photographer, ownerLocation))
		errorLog.close()





db = sqlite3.connect('flickr.sqlite')
cursor = db.cursor()


maxdate = datetime.date(2014, 12, 10)
while maxdate > datetime.date(2001, 01, 01):
	dateLog = open("datelog.txt", "a")

	mindate = maxdate - datetime.timedelta(days=30)
	baseurl1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e2cc3f278fde020b3a1d4a720893caa9&min_upload_date='
	baseurl2 = str(mindate) + '&max_upload_date=' + str(maxdate)
	baseurl3 = '&place_id=jPn7LAVTUb5tyPnsog&per_page=500&format=json&nojsoncallback=1'
	baseurl4 = '&page='

	response = requests.get(baseurl1 + baseurl2 + baseurl3).json()
	totalPages = response['photos']['pages']

	for page in range(1, totalPages + 1):
		response = requests.get(baseurl1 + baseurl2 + baseurl4 + str(page) + baseurl3).json()
		if response['stat'] != "ok":
			print response
		photosInPage = response['photos']['photo']

		getPhotoData(photosInPage, cursor)

		
			
		print "Page " + str(page) + " of " + str(totalPages) +  ", " + str(mindate) + "  to  " + str(maxdate)
		dateLog.write("maxdate = " + str(maxdate) + ", mindate = " + str(mindate))
		datelog.close()
		db.commit()
	
	maxdate = mindate - datetime.timedelta(days=1)


db.close()
print "Finished"

