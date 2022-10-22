let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our book model

let Book = require('../models/book');

let bookController = require('../controllers/book');

// get route for the book list page  - READ operation

router.get('/', bookController.displayBooklist);

/* GET route for displaying the ADD page - CREATE operation*/
router.get('/add', bookController.displayAddPage);

/* POST route for processing the ADD page - CREATE operation*/
router.post('/add', bookController.ProcessAddPage);


/* GET Route for displaying the EDIT page - UPDATE operation */
router.get('/edit/:id', bookController.displayEditPage);

/* POST Route for processing theh EDIT page - UPDATE operation */
router.post('/edit/:id', bookController.ProcessEditPage);

/* GET tp perform DELETION - DELETE operation */
router.get('/delete/:id', bookController.PerformDelete);

module.exports = router;