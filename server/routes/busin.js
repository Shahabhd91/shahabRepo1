let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let businController = require('../controllers/busin');
//helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
//connect to our busin model
let busin = require('../models/busin');
//let businController = require('../controllers/busin');
//GET ROUTE for the busin list page - READ OPERATION
router.get('/', businController.displaybusinList);
/*GET Route for displaying the Add page - CREATE operation*/
router.get('/add', requireAuth, businController.displayAddPage);

/*POST Route for processing the Add page - CREATE operation*/
router.post('/add', requireAuth, businController.processAddPage);



/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id', requireAuth, businController.displayEditPage);
/*POST Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id', requireAuth, businController.processEditPage);
/*GET to perform Deletion - DELETE operation*/
router.get('/delete/:id', requireAuth, businController.performDelete);
module.exports = router;