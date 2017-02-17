 Packages Installed
# pymongo, requests

from pymongo import MongoClient
import requests

# Getting the data from the SpreadSheet

req = requests.get('https://spreadsheets.google.com/feeds/list/1IB83w4qQliMr7L4bz7yvoDbIm7_QhUsOIN5g3KP49u4/od6/public/values?alt=json')

json = req.json()

# Pushing the Data into Mongo

client = MongoClient()

db = client['memberconnect']

collection = db['people']

valid = []

for obj in json['feed']['entry']:
  newObj = {}
  newObj['first_name'] = obj['gsx$first']['$t']
  newObj['last_name'] = obj['gsx$last']['$t']
  newObj['email'] = obj['gsx$email']['$t']
  newObj['affiliation'] = obj['gsx$affiliation']['$t']
  newObj['role'] = obj['gsx$role']['$t']
  newObj['interests'] = obj['gsx$interests']['$t']
  newObj['website'] = obj['gsx$website']['$t']
  newObj['video'] = obj['gsx$video']['$t']
  newObj['website_link'] = obj['gsx$websitelink']['$t']
  newObj['video_link'] = obj['gsx$videolink']['$t']
  valid.append(newObj)

collection.insert_many(valid)
