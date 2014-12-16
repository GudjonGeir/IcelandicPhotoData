import requests
import sqlite3
import datetime
import time
import sys
def isNoneOrEmptyOrBlankString (myString):
        if myString:
            if not myString.strip():
                return True
        else:
            return True

        return False


def getPhotoData (page):
	db = sqlite3.connect('flickr.sqlite')
	dbcursor = db.cursor()

	counter = 0
	for p in page:
		errorLog = open("log.txt", "a")
		counter += 1
		if counter % 25 == 0:
			print "Photo " + str(counter)

		photoid = p['id']
		dbcursor.execute('''SELECT id FROM Photo WHERE id=?''', (photoid,))
		if dbcursor.fetchone() is not None:
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
			dbcursor.execute('''SELECT name FROM Camera WHERE name=?''', (camera,))
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
		db.commit()
	db.close()


maxdate = datetime.date(2014, 12, 10)
while maxdate > datetime.date(2009, 01, 01):
	mindate = maxdate - datetime.timedelta(days=30)
	if mindate < datetime.date(2009, 1, 1):
		mindate = datetime.date(2009, 1, 1)
	baseurl1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e2cc3f278fde020b3a1d4a720893caa9&min_upload_date='
	baseurl2 = str(mindate) + '&max_upload_date=' + str(maxdate)
	baseurl3 = '&place_id=jPn7LAVTUb5tyPnsog&per_page=500&format=json&nojsoncallback=1'
	baseurl4 = '&page='

	response = requests.get(baseurl1 + baseurl2 + baseurl3).json()
	totalPages = response['photos']['pages']

	for page in range(1, totalPages + 1):
		response = requests.get(baseurl1 + baseurl2 + baseurl4 + str(page) + baseurl3).json()

		timeoutcounter = 0
		while response['stat'] != "ok":
			timeoutcounter += 1
			if timeoutcounter > 20:
				print "Timed out"
				sys.exit()

			print response
			time.sleep(5)
			response = requests.get(baseurl1 + baseurl2 + baseurl4 + str(page) + baseurl3).json()
		photosInPage = response['photos']['photo']

		getPhotoData(photosInPage)		
			
		print "Page " + str(page) + " of " + str(totalPages) +  ", " + str(mindate) + "  to  " + str(maxdate)
		dateLog = open("datelog.txt", "a")
		dateLog.write("maxdate = " + str(maxdate) + ", mindate = " + str(mindate) + "\n")
		dateLog.close()
		
	
	maxdate = mindate - datetime.timedelta(days=1)



print "Finished"

