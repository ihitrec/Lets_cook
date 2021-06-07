import os
from flask import (
    Flask, render_template, flash, redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def homepage():

    # Get recipes with highest rating
    hasRating = {"$match": {"num_of_ratings": {"$gt": 0}}}
    rating = {"$addFields": {"rating": {
        "$divide": ["$total_rating", "$num_of_ratings"]}}}
    sort = {"$sort": {"rating": -1}}
    top10 = {"$limit": 10}
    recipes = mongo.db.recipes.aggregate([hasRating, rating, sort, top10])

    # Show new recipes every 7 days based on highest rated recipes
    howManyDays = timedelta(days=7)
    now = datetime.now()
    lastTime = mongo.db.top_weekly.find_one({}, {"time": 1})
    lastTime = lastTime["time"]
    lastTimeAdd7 = lastTime + howManyDays

    if now >= lastTimeAdd7:
        mongo.db.top_weekly.delete_many({})
        mongo.db.top_weekly.insert_many(recipes)
        mongo.db.top_weekly.update_many({}, {"$set": {"time": now}})

    recipesOfTheWeek = mongo.db.top_weekly.find()

    return render_template("homepage.html", recipes=recipesOfTheWeek)


@app.route("/categories")
def categories():
    categories = mongo.db.recipes.distinct("category")
    recipes = mongo.db.recipes.find()
    return render_template(
        "categories.html", categories=categories, recipes=list(recipes))


@app.route("/recipe/<name>")
def recipe(name):
    recipe = mongo.db.recipes.find_one({"name": name})
    rating = mongo.db.top_weekly.find_one({"name": name})
    return render_template("recipe.html", recipe=recipe, rating=rating)


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")),
        debug=True
    )
