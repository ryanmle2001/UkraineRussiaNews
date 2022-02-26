from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
import os
import requests
from pip._vendor import cachecontrol
import models as db

cities = set()
app = Flask(__name__)
with open("ua_cities.json") as file:
    data = file.readlines()
    for i in data:
        cities.add(i.strip())

@app.route("/")
def index():
    news = db.get_all_news()
    return jsonify(news)

@app.route('/<string:city>')
def load_city(city):
    if city not in cities:
        return redirect("/")
    city_news = db.get_city_news(city)
    return jsonify(city_news)


if __name__ == "__main__":
    app.run(debug=True)
