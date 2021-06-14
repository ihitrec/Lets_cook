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


# Homepage
@app.route("/")
def homepage():

    # Get recipes with highest rating
    hasRating = {"$match": {"$or": [{
        "num_of_ratings": {"$gt": 0}}, {"num_of_ratings": -1}]}}
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


# Categories
@app.route("/categories")
def categories():
    categories = ["appetizer", "main", "dessert", "other"]
    recipes = mongo.db.recipes.find()
    return render_template(
        "categories.html", categories=categories, recipes=list(recipes))


# Add recipe
@app.route("/addrecipe", methods=["GET", "POST"])
def addRecipe():
    if "user" in session:
        if request.method == "POST":

            steps = []
            for step in request.form:
                if "step" in step:
                    steps.append(request.form[step])

            ingredients = []
            for ingredient in request.form:
                if "ingredient" in ingredient:
                    ingredients.append(request.form[ingredient])

            new_recipe = {
                "name": request.form.get("recipe-name"),
                "prep_time": request.form.get("prep-time"),
                "cook_time": request.form.get("cook-time"),
                "category": request.form.get("category"),
                "img": request.form.get("img-url"),
                "ingredients": ingredients,
                "steps": steps,
                "description": request.form.get("description"),
                "total_rating": 0,
                "num_of_ratings": 0,
                "rating": 0
            }

            mongo.db.recipes.insert_one(new_recipe)
            flash("Recipe posted")
            return redirect(url_for("recipe", name=new_recipe["name"]))

        return render_template("addrecipe.html")
    else:
        return redirect(url_for("logReg", page="register"))


# Recipe page
@app.route("/recipe/<name>", methods=["GET", "POST"])
def recipe(name):
    recipe = mongo.db.recipes.find_one({"name": name})
    rating = mongo.db.recipes.find_one({"name": name})
    if request.method == "POST":
        rated = request.form.get("rated")
        num_of_ratings = 1
        if (recipe["num_of_ratings"] < 0):
            num_of_ratings = 2
        mongo.db.recipes.update_one({"name": name}, {"$inc": {
            "num_of_ratings": num_of_ratings, "total_rating": int(rated)}})
        updatedRating = mongo.db.recipes.find_one({"name": name})
        newRating = updatedRating["total_rating"] / updatedRating[
            "num_of_ratings"]
        mongo.db.recipes.update_one({"name": name}, {
            "$set": {"rating": newRating}})
        rating = mongo.db.recipes.find_one({"name": name})
        flash("Rating successfully updated")
        return redirect(url_for("recipe", name=recipe["name"]))

    return render_template("recipe.html", recipe=recipe, rating=rating)


# Log in / Register
@app.route("/<page>", methods=['GET', 'POST'])
def logReg(page):

    if request.method == "POST":
        if page == "register":
            username_taken = mongo.db.users.find_one({
                "username": request.form.get("username").lower()})
            email_taken = mongo.db.users.find_one({
                "email": request.form.get("email").lower()})

            if username_taken and email_taken:
                flash("Username and email already exist. "
                      "Try logging in instead?")
                return redirect(url_for("logReg", page="register"))
            elif username_taken:
                flash("Username already exists")
                return redirect(url_for("logReg", page="register"))
            elif email_taken:
                flash("Email already exists")
                return redirect(url_for("logReg", page="register"))

            new_user = {
                "name": request.form.get("name"),
                "username": request.form.get("username"),
                "email": request.form.get("email"),
                "password": generate_password_hash(
                    request.form.get("password")),
                "rated_recipes": "",
                "created_recipes": ""
            }

            mongo.db.users.insert_one(new_user)
            session["user"] = request.form.get("username").lower()
            flash("Registration successful")
            return redirect(url_for("homepage"))

        if page == "login":
            selected_user = mongo.db.users.find_one({"email": request.form.get(
                "email")})
            if selected_user:
                if check_password_hash(
                     selected_user["password"], request.form.get("password")):
                    session["user"] = selected_user["username"]
                    flash("Login successful")
                    return redirect(url_for("homepage"))
                else:
                    flash("Incorrect login information")
                    return redirect(url_for("logReg", page="login"))
            else:
                flash("Incorrect login information")
    return render_template("logreg.html", page=page)


@app.route("/profile/<username>")
def profile(username):
    return render_template("profile.html")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")),
        debug=True
    )
