from pymongo import MongoClient
from pprint import pprint
from bson.json_util import dumps
import json
import requests


# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("localhost:27017")
if "ua_ru_news" not in client.list_database_names():
    db = client["ua_ru_news"]
    create_database(db)
db = client.ua_ru_news
# connect to database

with open("ua.json", "r") as file:
    cities = json.load(file)
large_cities = []

for city in cities:
    if int(city["population"]) >= 250000:
    large_cities.append(city)
def create_database():

'''
City fields
- name: String
- area code: String
- news: newsId[]
- display_name: String
'''

def insert_city(city):
    db.city.insert_one(city)

def get_city_news(city):
    events = db.city.find({"city": city}, {"events":1})
"""
News fields
newsId: (div id=post_and_bottom, article class = [take id from here]}
date: Datetime (current time - <span class= timeAlert>) 
header: String 
body: String 
url: String
"""

if __name__ == "__main__":
    print("True")