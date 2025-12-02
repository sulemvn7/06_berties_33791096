// Create a new router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

// ------------------ ACCESS CONTROL ------------------
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/users/login');
    } else {
        next();
    }
};

// Search Route - show form
router.get('/search', function(req, res, next) {
    res.render('search.ejs', { booklist: [], keyword: '' });
});

router.post('/search', function(req, res, next) {
    let keyword = req.body.keyword;
    let sqlquery = "SELECT * FROM books WHERE name LIKE ?";
    db.query(sqlquery, ['%' + keyword + '%'], (err, result) => {
        if (err) return next(err);
        res.render('search.ejs', { booklist: result, keyword: keyword });
    });
});

// Book Display Route
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("list.ejs", { availableBooks: result });
    });
});

// Display Add Book form (protected)
router.get('/addbook', redirectLogin, function(req, res, next) {
    res.render('addbook.ejs');
});

// POST route to save new book (protected, validated, sanitized)
router.post(
    '/bookadded',
    redirectLogin,
    [
        check('name').notEmpty().withMessage('Book name cannot be empty'),
        check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
    ],
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('addbook', { errors: errors.array() });
        }

        // ------------------ SANITIZE ------------------
        const bookName = req.sanitize(req.body.name);
        const price = req.body.price;

        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        db.query(sqlquery, [bookName, price], (err, result) => {
            if (err) return next(err);
            res.send('✅ This book has been added to the database.<br>Name: ' 
             + bookName + '<br>Price: £' + Number(price).toFixed(2));
        });
    }
);

// Bargain Books Route
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("bargainbooks.ejs", { bargainBooks: result });
    });
});

module.exports = router;













