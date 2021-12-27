# Add PUT and DELETE routes in previous assignments

## This is an extension on assignment 3, now use a database to store the users, and create routes to edit and delete a user

<br />

Instructions
* Create a dataase connection to mongodb on your localhost with the database name as assignment_4
* Create a user schema with name, email (unique), and a boolean field called isPromoted, default value null
* The two addtional routes are added below
    ```
        PUT     /user/:id   - Edit User Route, toggle the isPromoted field value to true / false
        DELETE  /user/:id   - Delete the user with the id
    ```

* The user list / card in the base route should show two buttons (Promote / Demote, and Delete) in every user list / card
* Add the buttons in the format below
```
    <form method="POST" action="/users/<%= user._id %>?_method=PUT">
        <button id="edit-<%= user.name %>" type="submit">Select</button>
    </form>
    <form method="POST" action="/users/<%= user._id %>?_method=DELETE">
        <button id="delete-<%= user.name %>">Delete</button>
    </form>                    
```
Use npm method-override package to override POST to PUT/DELETE method on backend
* The Promote / Demote button should call the PUT request with the user id for that user and should change the user isPrmoted field to true (if it was null or false) else false
* Show the users with isPromoted value as null in Yellow, isPrmoted true value in Green, isPromoted false value in Red
* Add one more button called Delete on every user list / card and on clicking the Delete button, it should call the DELETE routee with the user id and the user should get deleted on the backend
* Give the edit button and delete button their unique ids in format (edit-<name>) and (delete-<name>) for their corresponding users
* Redirect to the base route after PUT and DELETE route

<br/>

Run the test cases using ```npm run test:file assignment_4``` to see if you code is fine

Note: If your tests fail continuously, try deleting all the users from the db and try again
