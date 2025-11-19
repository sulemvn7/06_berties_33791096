// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");  // Add bcrypt for password hashing
const saltRounds = 10;

//Audit log route
router.get('/audit', (req, res, next) => {
    const sqlquery = "SELECT * FROM audit_log ORDER BY timestamp DESC";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('audit.ejs', { logs: result });
    });
});


// Registration form route
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Handle registration form submission
router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;

    // Hash the password
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) return next(err);

        // Store the data in the database
        const sqlquery = `
            INSERT INTO users (username, first_name, last_name, email, hashedPassword)
            VALUES (?, ?, ?, ?, ?)
        `;
        const newUser = [
            req.body.username,
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPassword
        ];

        db.query(sqlquery, newUser, (err, result) => {
            if (err) return next(err);

            // For debugging only: show password and hashed password
            let responseMsg = `Hello ${req.body.first} ${req.body.last}, you are now registered!<br>`;
            responseMsg += `We will send an email to you at ${req.body.email}.<br>`;
            responseMsg += `Your password is: ${plainPassword}<br>`;
            responseMsg += `Your hashed password is: ${hashedPassword}`;

            res.send(responseMsg);
        });
    });
});

// List all users (without passwords)
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT id, username, first_name, last_name, email FROM users"; // exclude hashedPassword
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('listusers.ejs', { users: result });
    });
});

// ------------------ LOGIN FUNCTIONALITY ------------------

// Show login form
router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

// Handle login form submission
router.post('/loggedin', function(req, res, next) {
    const username = req.body.username;
    const plainPassword = req.body.password;

    // Retrieve hashed password for user from DB
    const sqlquery = "SELECT * FROM users WHERE username = ?";
    db.query(sqlquery, [username], (err, result) => {
        if (err) return next(err);

        if (result.length === 0) {
            // No user found
            res.send('❌ Login failed: User not found');
        } else {
            const hashedPassword = result[0].hashedPassword;

            // Compare entered password with hashed password
            // After fetching user and hashedPassword
bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
    if (err) return next(err);

    let success = result ? 1 : 0; // 1 = success, 0 = failed
    const auditQuery = "INSERT INTO audit_log (username, success) VALUES (?, ?)";
    db.query(auditQuery, [req.body.username, success], (err2) => {
        if (err2) console.error("Failed to insert into audit_log:", err2);
    });

    if (result === true) {
        res.send(`✅ Login successful for ${req.body.username}`);
    } else {
        res.send(`❌ Login failed for ${req.body.username}`);
    }
});

        }
    });
});

// Export the router object so index.js can access it
module.exports = router;
