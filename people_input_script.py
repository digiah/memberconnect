# Script to input data from the Google Spreadsheet into MongoDB

# Packages Installed
# pymongo, requests

from pymongo import MongoClient
import requests
import re

# Getting the data from the SpreadSheet
spreadsheet_link = 'https://spreadsheets.google.com/feeds/list/1ao2EPeu8ndHaQAEa7Qmab9BTru7iO0zOFqyqtpgPvK4/od6/public/values?alt=json'

req = requests.get(spreadsheet_link)

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
  newObj['interests'] = re.findall(r"[\w']+", obj['gsx$interests']['$t'])
  newObj['website'] = obj['gsx$website']['$t']
  newObj['video'] = obj['gsx$video']['$t']
  newObj['website_link'] = obj['gsx$websitelink']['$t']
  newObj['video_link'] = obj['gsx$videolink']['$t']
  valid.append(newObj)

collection.insert_many(valid)
