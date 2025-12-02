const express = require('express');
const router = express.Router();

// API route to get all books or filtered/sorted books
router.get('/books', (req, res, next) => {
    let sqlquery = "SELECT * FROM books WHERE 1=1"; // start with a base query

    const params = [];
    const { search, minprice, maxprice, sort } = req.query;

    // 1. Search filter
    if (search) {
        sqlquery += " AND name LIKE ?";
        params.push(`%${search}%`);
    }

    // 2. Price range filter
    if (minprice) {
        sqlquery += " AND price >= ?";
        params.push(minprice);
    }
    if (maxprice) {
        sqlquery += " AND price <= ?";
        params.push(maxprice);
    }

    // 3. Sorting
    if (sort === 'name') {
        sqlquery += " ORDER BY name";
    } else if (sort === 'price') {
        sqlquery += " ORDER BY price";
    }

    // Execute the query
    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json({ error: err.message });
            return next(err);
        }
        res.json(result); // return JSON result
    });
});

module.exports = router;
