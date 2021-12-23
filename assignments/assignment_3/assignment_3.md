# Create a simple nodejs app using express

## Create a nodejs server using express, ejs as view engine, and any other dependencies required

<br />

Instructions
* Create an express server with the routes mentioned below
    ```
        GET     /           - Base Route, return the homepage or the landing page
        GET     /form       - should render a form       
        POST    /user/add   -   Should add a user and redirect to base route '/'
    ```

* The main file for you app should be called app.js
* Store the ejs files inside views folder, create a form.ejs file to render the form for adding user
* Initially create users array (array of user object) with some dummy users present, user object has name, email keys and their corresponding values
* The base route '/' should display a list/card with the users (their name and email), this is the homepage or the landing page of your app
* There should be add add button on the homepage which would redirect to '/form' i.e the form page to add new user
* The form route should redirect to a page where a form with inputs for name and email are shown with a submit button that should make a post request to /user/add with the data inserted in the input fields
* On receiving the request to add user i.e on /user/add route, you should add the user to the users array and redirect to base route '/'
* Now you should be able to see the new user added on you screen

<br/>

Run the test cases using ```npm run test:file assignment_3``` to see if you code is fine