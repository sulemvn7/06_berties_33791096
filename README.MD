#06_berties_33791096 Berties Books App

Description

Bertie's Books is a dynamic web application built using Node.js and Express. It demonstrates routing with Express Router, rendering pages with EJS templates, handling GET and POST requests, and basic form validation. The app simulates a small book shop where users can browse available books, search for books, add new books, view bargain books, and register as customers.

The application includes all the existing routes from the previous Lab 6 work and now includes these newly added routes:

/users/list : Lists all registered users (passwords excluded)

/users/login : Login form for users

/users/loggedin : Handles login verification

/users/audit : Shows audit history of all login attempts

⚙️ Technologies Used

Node.js

Express.js

EJS

MySQL

HTML / CSS

bcrypt (for password hashing)

dotenv (for environment variable management)

Dotenv  Section

The project uses the dotenv Node.js module to secure database credentials. Database connection details are stored in a .env file and loaded using:

require('dotenv').config();

The connection pool reads credentials from environment variables instead of hardcoding sensitive information in the source code:

const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

});


💻 Installation 
1.Clone your github repository: git clone <your repositiory link>. 
2.Install dependencies using npm install. 
3.Run node index.js to access the Berties Books App.








