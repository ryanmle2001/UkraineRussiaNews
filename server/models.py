from pymongo import MongoClient, DESCENDING
import json
import utils

f = open('config.json')
config = json.load(f)
f.close()
client = MongoClient(f"mongodb+srv://admin:{config['mongo_password']}@cluster0.fhqco.mongodb.net/ua_ru_news?retryWrites=true&w=majority")
db = client.ua_ru_news


cities = set()
with open("ua_cities.json") as file:
    data = file.readlines()
    for i in data:
        cities.add(i.strip())

'''
City fields
- name: String
- news: newsId[]
'''

"""
News fields
newsId: String same as url 
city: String 
date: Date 
header: String 
body: String 
url: String
image: String 
"""

# Called only once
def init_cities():
    all_cities = []
    with open("ua.json") as file:
        all_cities = json.load(file)
    city_list = []
    for loc in all_cities:
        if loc["city"].lower() in cities:
            city_json = {
                "name": loc["city"],
                "lat": loc["lat"],
                "lng": loc["lng"],
                "news": []
            }
            city_list.append(city_json)
    db.city.insert_many(city_list)

def get_city(city):
    city = db.city.find_one({"name": city.lower().capitalize()}, {"_id": 0})
    return city

def update_city_news(city, newsId):
    db.city.update_one({"name": city.lower().capitalize()}, {"$push": {"news": newsId}})

def get_city_news(city):
    news_ids = db.city.find_one({"name": city.lower().capitalize()}, {"news":1, "_id": 0})["news"]
    news = db.news.find({"newsId": {"$in": news_ids}},{"_id": 0}).sort('date',DESCENDING)
    return list(news)

def get_city_news_id(city):
    news_ids = db.city.find_one({"name": city.lower().capitalize()}, {"news":1, "_id": 0})
    if news_ids is None:
        return []
    return news_ids["news"]

def get_national_news():
    news_ids = get_city_news_id("Ukraine")
    if news_ids is None:
        return []
    news = db.news.find({"newsId": {"$in": news_ids}}, {"_id": 0}).sort('date',DESCENDING)
    return list(news)

def insert_latest_news():
    for city in cities:
        print(city)
        articles = utils.scrape_article(city)
        city_news_ids = set(get_city_news_id(city))
        for article in articles:
            if article["newsId"] not in city_news_ids:
                update_city_news(city, article["newsId"])
                db.news.insert_one(article)


if __name__ == "__main__":
    # init_cities()
    # insert_latest_news()
    print(get_national_news())
