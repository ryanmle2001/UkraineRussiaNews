from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
from flask_cors import CORS #comment this on deployment
import requests
from pip._vendor import cachecontrol
import models as db


app = Flask(__name__)
app.secret_key="123"
CORS(app)

cities = set()
with open("ua_cities.json") as file:
    data = file.readlines()
    for i in data:
        cities.add(i.strip())

@app.route("/")
def index():
    news = db.get_all_news()
    data = {
        "data": {
            "cities": list(cities),
            "news": news
        }
    }

    return jsonify(data)

@app.route('/<string:city>')
def load_city(city):
    if city not in cities:
        return redirect("/")
    news = db.get_city_news(city)
    city = db.get_city(city)
    data = {
        "data": {
            "city": city,
            "news": news
        }
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
