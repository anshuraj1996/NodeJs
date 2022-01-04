# Create a REST API backend service using NodeJs and Express

## Create a backend service for a post sharing application like instagram, the user should be able to add posts, edit and delete them as required

<br />

Instructions
* Create an express server that listens for request on Port 3000
* Create user and post schema with { name, email, password } for user and { title, body, image, user } for post
* Create login and registration API for users to log into the app and register a new user, store the data in the mongodb
    ```
        Register New User
        POST    -   /register   - Accepts name, email and password in the body, the email Id should be unique i.e no two users can have the same email id
        POST    -   /login      - Accepts email and password in request body, verify the email and password and respond with correct http status code in case of success or failure
        Return token in the response after successful login (Exmaple Response - { token: <JWT Token> } )
    ```
* Add CRUD routes for Posts create, read, update, and delete operations
    ```
        GET     -   /posts          - Get all the posts in the db, the response should be in format (Example - { posts: [] } )
        POST    -   /posts          - Create a new post (accept title, body, image) and store the info in the db with the user reference, return the post created in the response (Example - { _id, name, title, body, user } )
        PUT     -   /posts/:postId  - Edit/Update a Post with the id provided
        DELETE  -   /posts/:postId  - Delete a Post with the id provided
    ```
* Add a middleware to perform authentication and authorization for users (only logged in users can access the posts apis - use JWT for authentication)
* Only authorized users can perform Edit/Delete Operation for the posts, userA should not be able to edit/delete userB's posts
* Use appropriate status code for different operations
```
Example - Use 200 http status for successful request, use 4xx status code for unauthorized, forbidden response
```

<br/>

Run the test cases using ```npm run test:file assignment_5``` to see if you code is fine

Note: If your tests fail continuously, try deleting all the users, and posts from the db and try again
