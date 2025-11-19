#06_berties_33791096 Berties Books App

Description

Bertie's Books is a dynamic web application built using Node.js and Express. It demonstrates routing with Express Router, rendering pages with EJS templates, handling GET and POST requests, and basic form validation. The app simulates a small book shop where users can browse available books, search for books, add new books, view bargain books, and register/login as customers and see all registered users..

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

📝Dotenv  Section

The project uses the dotenv Node.js module to secure database credentials. Database connection details are stored in a .env file and loaded using:

require('dotenv').config();

The connection pool reads credentials from environment variables instead of hardcoding sensitive information in the source code:

const db = mysql.createPool({

    host: 'localhost',

    user: process.env.BB_USER,

    password: process.env.BB_PASSWORD,

    database: process.env.BB_NAME,

});

📝Audit Section

The app implements audit logging for login attempts. I created the audit_log table in mysql database to load audit history. Every login, whether successful or failed, is recorded in the audit_log table with:

username attempted

success status (✅ = success, ❌ = failed)

Timestamp of the attempt

Storing Login Attempts:
In the /users/loggedin route, after fetching the hashed password from the database, I use bcrypt.compare() to check the submitted password. Regardless of whether the login succeeds or fails, I insert a record into the audit_log table:

let success = result ? 1 : 0;

const auditQuery = "INSERT INTO audit_log (username, success) VALUES (?, ?)";

db.query(auditQuery, [username, success], (err2) => {

    if (err2) console.error("Failed to insert into audit_log:", err2);

});



success = 1 if the password matches, otherwise 0.

This ensures every login attempt is logged, including incorrect passwords or unknown usernames

Users can view the full audit history by visiting /users/audit. This feature helps track access to the system and monitor failed login attempts.


💻 Installation 
1.Clone your github repository: git clone <your repositiory link>. 
2.Install dependencies using npm install. 
3.Run node index.js to access the Berties Books App.



















