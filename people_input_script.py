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
  newObj = {
    'first_name': obj['gsx$first']['$t'],
    'last_name': obj['gsx$last']['$t'],
    'email': obj['gsx$email']['$t'],
    'affiliation': obj['gsx$affiliation']['$t'],
    'role': obj['gsx$role']['$t'],
    'interests': re.findall(r"[\w']+", obj['gsx$interests']['$t']),
    'website': obj['gsx$website']['$t'],
    'video': obj['gsx$video']['$t'],
    'website_link': obj['gsx$websitelink']['$t'],
    'video_link': obj['gsx$videolink']['$t']
  }
  check = collection.find(newObj)
  if (check.count() == 0):
    valid.append(newObj)

collection.insert_many(valid)
