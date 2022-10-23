let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let bookController = require('../controllers/book');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// get route for the book list page  - READ operation

router.get('/', bookController.displayBooklist);

/* GET route for displaying the ADD page - CREATE operation*/
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST route for processing the ADD page - CREATE operation*/
router.post('/add', requireAuth, bookController.ProcessAddPage);


/* GET Route for displaying the EDIT page - UPDATE operation */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing theh EDIT page - UPDATE operation */
router.post('/edit/:id', requireAuth, bookController.ProcessEditPage);

/* GET tp perform DELETION - DELETE operation */
router.get('/delete/:id', requireAuth, bookController.PerformDelete);

module.exports = router;