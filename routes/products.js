var express = require('express');
var router = express.Router();

let postsController = require('../controllers/products');


router.get('/view-posts', postsController.postsList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/create-post', postsController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/create-post', postsController.processAddPage);

// Route for Details
router.get('/details/:id', postsController.details);


// Routers for edit
router.get('/edit/:id', postsController.displayEditPage);
router.post('/edit/:id', postsController.processEditPage);

// Delete
router.get('/delete/:id', postsController.performDelete);

module.exports = router;
