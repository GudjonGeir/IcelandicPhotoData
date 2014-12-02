import requests


baseurl = 'https://api.500px.com/v1/photos/search?rpp=100&geo=64.783947%2C-18.235342%2C350km&consumer_key=7mQLRPNEyZHHresRqQVWjfhDViuNniNGJ5iiCV9V'
response = requests.get(baseurl).json()
totalPages = response['total_pages']
photos = response['photos']
# print type(photos[0])
for p in photos:
	print p['id']

# for x in range(1, totalPages + 1):
# 	print "Page %d of %d" % (x, totalPages)