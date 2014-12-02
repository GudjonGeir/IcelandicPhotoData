import requests


baseurl = 'https://api.500px.com/v1/photos/search?rpp=100&geo=64.783947%2C-18.235342%2C350km&consumer_key=7mQLRPNEyZHHresRqQVWjfhDViuNniNGJ5iiCV9V'
response = requests.get(baseurl).json()
print response['total_items']