from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
import os
import requests
from pip._vendor import cachecontrol
import db.database as db


app = Flask(__name__)
def init_database():
    city = db.init_cities()

@app.route("/")
def index():
    news = db.get_all_news()
    return news

@app.route('/<string:city>')
def load_city(city):
    city_news = db.get_city_news(city)
    return city_news


if __name__ == "__main__":
    app.run(debug=True)
