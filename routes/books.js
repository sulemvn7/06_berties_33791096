// Create a new router
const express = require("express");
const router = express.Router();

// Search Route - show form
router.get('/search', function(req, res, next) {
    res.render('search.ejs', { booklist: [], keyword: '' });
});

// Handle search request (basic + advanced)
router.post('/search', function(req, res, next) {
    let keyword = req.body.keyword;

    // Basic (exact match):
    // let sqlquery = "SELECT * FROM books WHERE name = ?";

    // Advanced (partial match):
    let sqlquery = "SELECT * FROM books WHERE name LIKE ?";

    db.query(sqlquery, ['%' + keyword + '%'], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render('search.ejs', { booklist: result, keyword: keyword });
        }
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

// Display the Add Book form
router.get('/addbook', function(req, res, next) {
    res.render('addbook.ejs');
});

// POST route to save the new book
router.post('/bookadded', function (req, res, next) {
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) return next(err);
       res.send('✅ This book has been added to the database.<br>Name: ' 
         + req.body.name + '<br>Price: £' + Number(req.body.price).toFixed(2));
    });
});


// Bargain Books Route
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20"; // select cheap books
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("bargainbooks.ejs", { bargainBooks: result });
        }
    });
});

// Export the router
module.exports = router;







