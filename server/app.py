from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
from flask_cors import CORS #comment this on deployment
import requests
from pip._vendor import cachecontrol
import models as db


app = Flask(__name__, )
CORS(app)

cities = set()
with open("ua_cities.json") as file:
    data = file.readlines()
    for i in data:
        cities.add(i.strip())

@app.route("/")
def index():
    news = db.get_national_news()
    city_info = []
    for city in cities:
        city_info.append(db.get_city(city))
    data = {
        "data": {
            "cities": list(cities),
            "city_info": city_info,
            "news": news
        }
    }
    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

    # return jsonify(data)

@app.route('/<string:city>')
def load_city(city):
    if city.lower() not in cities:
        return redirect("/")
    news = db.get_city_news(city)
    city_info = db.get_city(city)
    data = {
        "data": {
            "city": city_info,
            "news": news
        }
    }
    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

    # return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
