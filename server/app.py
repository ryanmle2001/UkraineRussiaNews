from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
import os
import requests
from pip._vendor import cachecontrol
import models as db

app = Flask(__name__)

def create_app():
    app = Flask(__name__)
    cors.init_app(app)

    return app

@app.route("/")
def index():
    news = db.get_all_news()
    return jsonify(news)

@app.route('/<string:city>')
def load_city(city):
    city_news = db.get_city_news(city)
    if city_news == False:
        return redirect("/")
    return jsonify(city_news)


if __name__ == "__main__":
    app.run(debug=True)
