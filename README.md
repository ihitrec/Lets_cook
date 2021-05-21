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

### Potential Features

- Navigation
The navigation will include a home link, category dropdown, top 10 recipes section on the homepage and a random recipe link. There will also be variable links like login/profile, add a recipe and others that will appear if the user is logged in. 

- Profile
The website will be entirely based on user submited recipes requiring an option to login/register. Each person's profile will include brief information which the user has the option to provide. The users can select a profile icon from a small icon library and possible feature of uploading an image. The profile should also include recipes that the user has saved and posted and potentialy their score based on the average rating of their posted recipes. The users should be able to update personal data or uploaded recipes as well as delete their account. 

- Homepage
The main page will include a hero image with a recipe search bar and an animation which shows different meals. 

- Top 10 Recipes
Top recipe section will include a carousel that repeats infinitely putting the first recipe at the end when going foward and vice versa. The featured recipes will include the top rated/most popular recipes of each week.

- Categories
Categories page will show recipes for each category or just the selected category depending on which path the user chooses. There should also be a filtering system allowing to filter recipes by rating and prep time.

- Chosen recipe page
The recipe page will include all relevant information like the ingredients, preparation time and cooking steps. As additional features to better judge the quality of the recipe, there will be a comment section and rating system on the page.

- Footer
The footer will be simple with a small about section revealing a brief description on hover.  It will also include social links and the website logo.

### Wireframes

[Sketched wireframe](static/img/readme_images/sketch.png)
> For this project I drew simple wireframes so it is not as detailed as it would have been in Adobe XD wich I usually use. They still give the general idea of how the webpage should look and which sections it should have.

### Font and colors

[Color palette](static/img/readme_images/palette.png)
>The color palette is a general idea for the colors selected from the hero image. The shades and combinations can change as the image I created is just a guide of which colors could work well together.

## Technologies used

##### Languages, frameworks and more
![HTML5 icon](static/img/readme_images/html-icon.png) HTML5 - webpage markup language for basic structure

![CSS3 icon](static/img/readme_images/css-icon.png) CSS3 - html document styling language 

![JavaScript icon](static/img/readme_images/javascript-icon.png) JavaScript - behavior of elements on the website 

![jQuery icon](static/img/readme_images/jquery-icon.png) jQuery - JavaScript library

![Python icon](static/img/readme_images/python.png) Python - backend programming language working together with Flask, MongoDB and Heroku

![Flask icon](static/img/readme_images/flask.png) Flask - lightweight Python framework for web applications

![MongoDB icon](static/img/readme_images/mongodb.png) MongoDB - database program

![Heroku icon](static/img/readme_images/heroku.png) Heroku - cloud deployment platform

##### Repository, coding environment and version control
- [Github](https://www.gitpod.io/) - hosting platform for managing repositories and more
- [Gitpod](https://www.gitpod.io/) - coding environment
- [Git](https://git-scm.com/) - used for version control

#####  Resources
- [Google Fonts](https://fonts.google.com/) - source for all fonts on the website
- [Envato Elements](https://elements.envato.com/) - hero image source
- [Font Awesome](https://fontawesome.com/) - used for icons
- [BBC Good Food](https://www.bbcgoodfood.com/) - recipe content


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
