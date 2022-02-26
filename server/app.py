from flask import Flask, url_for, render_template, request, redirect, abort, jsonify, session, flash, make_response
import os
import requests
from pip._vendor import cachecontrol
import db.database as db

app = Flask(__name__)
app.secret_key="Hello"

@app.route("/")
def index():
    db.get_all_news()
    return render_template("index.html")

@app.route('/<string:city>')
def load_city(city):
    db.get_city_news(city)
    return render_template("match.html", match=match)


if __name__ == "__main__":
    app.run(debug=True)
