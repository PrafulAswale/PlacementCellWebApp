# Placement Cell Web App

This placement cell web application is created for users/employees to manage interviews of students, and allocate students to companies` interviews.
It is built using **MongoDB, ExpressJs, EJS, NodeJS and JavaScript.**

Hosted Link: [Placement Cell App](www.host.com)

# Functionality

* Employee Signup/Signin
* Add student
* Delete Student
* Allocate added student to the interview
* Deallocate the student from an interview
* Update user profile
* Download the CSV report

## Getting Started
* Fork the project
* Clone the forked repository in your local system
* Create .env file in the root directory and add the following:-
    - PORT="Your port number"
    - MONGODB_URL="Your MongoDB URL"
    - SESSION_SECRET_KEY="Your secret session key"
* Install all required packages
```bash
npm install 
```
* Run project 
```bash
npm start
```
The project is running on the port number provided by you.

## Tools Used 
- NodeJS
- MongoDB
- ExpressJS
- EJS
- Bootstrap

### Libraries: 
* bcryptjs
* connect-flash
* connect-mongo
* cookie-parser
* dotenv
* ejs
* express
* express-ejs-layout
* express-session
* mongoose
* passport
* passport-jwt
* passport-local