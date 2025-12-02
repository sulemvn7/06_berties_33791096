// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");  // password hashing
const saltRounds = 10;
const { check, validationResult } = require('express-validator');

// ------------------ SESSION / AUTHORIZATION ------------------
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('./login'); 
    } else {
        next(); 
    }
};

// ------------------ AUDIT LOG ------------------
router.get('/audit', redirectLogin, (req, res, next) => {
    const sqlquery = "SELECT * FROM audit_log ORDER BY timestamp DESC";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('audit.ejs', { logs: result });
    });
});

// ------------------ REGISTRATION ------------------
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Handle registration form submission
router.post(
    '/registered',
    [
        check('username').notEmpty().withMessage('Username cannot be empty'),
        check('first').notEmpty().withMessage('First name cannot be empty'),
        check('last').notEmpty().withMessage('Last name cannot be empty'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/\d/).withMessage('Password must contain a number')
    ],
    function (req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', { errors: errors.array() });
        }

        // ---------- SANITIZE ----------
        const username = req.sanitize(req.body.username);
        const firstName = req.sanitize(req.body.first);
        const lastName = req.sanitize(req.body.last);
        const email = req.sanitize(req.body.email);
        const plainPassword = req.body.password; // do NOT sanitize password

        // ---------- HASH PASSWORD ----------
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            if (err) return next(err);

            const sqlquery = `
                INSERT INTO users (username, first_name, last_name, email, hashedPassword)
                VALUES (?, ?, ?, ?, ?)
            `;

            const newUser = [username, firstName, lastName, email, hashedPassword];

            db.query(sqlquery, newUser, (err, result) => {
                if (err) return next(err);

                res.send(`
                    Hello ${firstName} ${lastName}, you are now registered!<br>
                    We will send an email to ${email}.<br>
                    Your password: ${plainPassword}<br>
                    Your hashed password: ${hashedPassword}
                `);
            });
        });
    }
);

// ------------------ LIST USERS (protected) ------------------
router.get('/list', redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT id, username, first_name, last_name, email FROM users";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('listusers.ejs', { users: result });
    });
});

// ------------------ LOGIN ------------------
router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

router.post('/loggedin', function(req, res, next) {
    const username = req.sanitize(req.body.username);
    const plainPassword = req.body.password;

    const sqlquery = "SELECT * FROM users WHERE username = ?";
    db.query(sqlquery, [username], (err, result) => {
        if (err) return next(err);

        if (result.length === 0) {
            const auditQuery = "INSERT INTO audit_log (username, success) VALUES (?, ?)";
            db.query(auditQuery, [username, 0], () => {});
            return res.send('❌ Login failed: User not found');
        }

        const hashedPassword = result[0].hashedPassword;

        bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
            if (err) return next(err);

            let success = result ? 1 : 0;
            const auditQuery = "INSERT INTO audit_log (username, success) VALUES (?, ?)";
            db.query(auditQuery, [username, success], (err2) => { if (err2) console.error(err2); });

            if (result === true) {
                req.session.userId = username;
                res.send(`✅ Login successful for ${username}`);
            } else {
                res.send(`❌ Login failed for ${username} (incorrect password)`);
            }
        });
    });
});

// ------------------ LOGOUT ------------------
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('./');
        res.send('You are now logged out. <a href="/">Home</a>');
    });
});

module.exports = router;


