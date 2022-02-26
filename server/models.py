from pymongo import MongoClient
from bson.json_util import dumps
import json
import requests


f = open('config.json')
config = json.load(f)
f.close()
client = MongoClient(f"mongodb+srv://admin:{config['mongo_password']}@cluster0.fhqco.mongodb.net/ua_ru_news?retryWrites=true&w=majority")
db = client.ua_ru_news

'''
City fields
- name: String
- latitude: String 
- longitude: String
- news: newsId[]
'''

"""
News fields
newsId: (div id=post_and_bottom, article class = [take id from here]}
city: String 
date: Datetime (current time - <span class= timeAlert>) 
header: String 
body: String 
url: String
"""

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
            city_file.append(city["city"].lower())
    with open("ua_cities.json", "w") as file:
        for city in city_file:
            file.write(city)
            file.write("\n")
    db.city.insert_many(large_cities)


def get_city(city):
    city = db.city.find_one({"name": city.lower()})
    return dumps(list(city))


def update_city_news(city, newsId):
    db.city.update_one({"city": city}, {"$push": {"news": newsId}})


def get_city_news(city):
    news_ids = list(db.city.find({"city": city}, {"events":1, "_id": 0}))
    news = []
    news = db.news.find({"newsId": {"$in": news_ids}})
    return dumps(list(news))


def get_all_news():
    news = db.news.find({})
    return dumps(list(news))


def insert_news(news):
    db.news.insert_one(news)

if __name__ == "__main__":
    init_cities()
