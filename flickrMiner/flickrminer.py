def isNoneOrEmptyOrBlankString (myString):
        if myString:
            if not myString.strip():
                return True
        else:
            return True

        return False


import requests
import sqlite3
db = sqlite3.connect('flickr.sqlite')
cursor = db.cursor()

# Laga per page!!!!!!!!!!!!!!!!!!!!! 500
baseurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4378734163e497f1ef37280c088c0b71&place_id=jPn7LAVTUb5tyPnsog&media=&per_page=500&format=json&nojsoncallback=1'
response = requests.get(baseurl).json()
totalPages = response['photos']['pages']

photosInPage = response['photos']['photo']
for p in photosInPage:
	photoid = p['id']
	photoGetInfo = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=4378734163e497f1ef37280c088c0b71&photo_id=' + str(photoid) + '&format=json&nojsoncallback=1'
	photoinfo = requests.get(photoGetInfo).json()
	if photoinfo['stat'] == "ok":
		photographer = photoinfo['photo']['owner']['nsid']
		ownerLocation = photoinfo['photo']['owner']['location']
		latitude = photoinfo['photo']['location']['latitude']
		longitude = photoinfo['photo']['location']['longitude']
		dateTaken = photoinfo['photo']['dates']['taken']
	else:
		print "Error code #" + str(photoinfo['code']) + " in photos.getInfo - photoid = " + str(photoid)
		continue

	photoGetExif = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=4378734163e497f1ef37280c088c0b71&photo_id=' + str(photoid) + '&format=json&nojsoncallback=1'
	photoExif = requests.get(photoGetExif).json()
	if photoExif['stat'] == "ok":
		camera = photoExif['photo']['camera']
	else:
		print "Error code #" + str(photoExif['code']) + " in photos.getExif - photoid = " + str(photoid)
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
		if cursor.fetchone() is None:
			cursor.execute('INSERT INTO Camera(name) VALUES(?)', (camera,))



	# # Insert photos
	cursor.execute('''SELECT id FROM Photo WHERE id=?''', (photoid,))
	if cursor.fetchone() is None:
		cursor.execute('''INSERT INTO Photo(id, photographer, latitude, longitude, camera, date)
                  VALUES(?,?,?,?,?,?)''', (photoid, photographer, latitude, longitude, camera, dateTaken))

	# Insert photohrapher info if not present in table
	cursor.execute('''SELECT photographer FROM Photographer WHERE photographer=?''', (photographer,))
	if cursor.fetchone() is None:
		cursor.execute('INSERT INTO Photographer(photographer, country) VALUES(?, ?)', (photographer, ownerLocation))


# print photographer
# print ownerLocation
# print dateTaken
# print latitude
# print longitude
# print camera
	
# for page in range(1, totalPages + 1):
# 	# For each page get list of photo id's
# 	photoIds = requests.get(baseurl + "&page=" + str(page)).json()['photos']['photo']
# 	for p in photoIds:
# 		# TODO: Get info on photographer, geolocation and camera

# 	print "Page %d of %d" % (page, totalPages) 
db.commit()
db.close()
print "Finished"

