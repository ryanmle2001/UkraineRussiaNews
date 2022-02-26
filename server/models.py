from pymongo import MongoClient
from pprint import pprint
from bson.json_util import dumps
import json
import requests
import web_scraper as ws

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("localhost:27017")
db = client.ua_ru_news

'''
City fields
- name: String
- latitude: String 
- longitude: String
- news: newsId[]
'''

def init_cities():
    with open("ua.json", "r") as file:
        cities = json.load(file)
    large_cities = []
    city_file= []
    for city in cities:
        if city["population"] != '' and int(city["population"]) >= 250000:
            city_json = {
                "name": city["city"],
                "latitude": city["lat"],
                "longitude": city["lng"],
                "news": []
            }
            large_cities.append(city_json)
            city_file.append(city["city"])
    with open("ua_cities.json", "w") as file:
        json.dump(city_file, file)
    # db.city.insert_many(large_cities)

def update_city_news(city, newsId):
    db.city.update_one({"city": city}, {"$push": {"news": newsId}})

def get_city_news(city):
    with open("ua_cities.json") as file:
        data = file.readline()
        if city not in data:
            return False
    newsId_all = db.city.find({"city": city}, {"events":1})
    news = []
    for newsId in newsId_all:
        news.append(db.news.find({"newsId":newsId}))
    return json.dumps(news)

def get_all_news():
    news = db.news.find({})
    return json.dumps(news)

"""
News fields
newsId: (div id=post_and_bottom, article class = [take id from here]}
city: String 
date: Datetime (current time - <span class= timeAlert>) 
header: String 
body: String 
url: String
"""

if __name__ == "__main__":
