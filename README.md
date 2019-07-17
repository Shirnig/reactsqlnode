# ReactReduxNodeMySQL

Vacations project, upload, edit, delete and get statistics on vacation followers using React, Redux, Node.js, Express and Relational DB

#Backend - Node.JS, Express, Restfull API
#Database - SQL
#Frontend - React Redux,HTML5,Bootsrap

Frontend features:

Signup page - All fields are mandatory, username filed is checked for availability.
Login and Signup pages redirect to homepage automatically after authentication checked.

Homepage checks if the user is the admin- displaying admin menu or user menu according to the API data.
if authentication failed- redirection to login 

Admin Home page features - upload, edit, delete vacations including uploading an image file. admin can view chart with vacations followers.
Admin features are all managed with Bootstrap Modal. 
Upload/edit vacation have a mandatory fields and validations for example
Depart and Return date must be followed

User - can follow/unfollow vacations, the vacation catalog will be sorted by followed vacations or by last one edited.

Backend – 
The backend server is developed with express, express session, express router, mysql2, lodash and cors.
The router end-points using validations to validate requests before processing them.
