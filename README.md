# Let's cook

Let’s cook is a website featuring recipes added by the community. It could be a source of inspiration for your next meal or a place to share your creation. The main goal of the project is to enable the user to interact with a database, preforming basic data manipulation operations.

This is the third project in Code Institute Full Stack Developer program based on HTML, CSS, JavaScript, Python, Flask, MongoDB and other optional frameworks and libraries.


## UX

### User Stories
- I want to be able to create an account
- I would like to save my favourite recipes
- I am looking for something to cook for my next meal
- I wish to know how good a recipe is before preparing it
- I created a recipe of which I am proud of and would like to share it
- I want to know basic information about the recipe such as steps, ingredients and cooking time

### Planes of UX

#### Strategy




## Deployment

Deployment instructions assume that you have already set up your repository and basic flask application. The website is deployed on the Heroku cloud platform using the following steps:
1. Create the necessary files for deployment
    - Create requirements file using `pip3 freeze > requirements.txt` which will contain the required dependencies.
    - Create Procfile using `echo web: python app.py > Procfile`.
    - Push both files to GitHub
2.	Log in to Heroku and create a new app
3.	Connect the app to your project
    - Go to deployment method section and choose the method. If using GitHub, select that option, otherwise use the Heroku CLI method.
4.	Following the GitHub method, search for the desired repository and connect to it
5.	Enter configuration variables
    - Go to the settings tab and select Reveal Config Vars. Enter the variables defined in the env.py file (IP, PORT and SECRET_KEY).
6.	Deploy and preview
    - Go back to the deployment tab and enable automatic deployment.
    - Finally, press deploy branch and preview your website.
