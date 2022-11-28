var express = require('express');
var router = express.Router();

let postsController = require('../controllers/posts');
const checkAuthenticated = require('../middlewares/checkAuthenticated.js');

router.get('/view-posts' ,postsController.postsList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/create-post',checkAuthenticated, postsController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/create-post',checkAuthenticated, postsController.processAddPage);

// Route for Details
router.get('/details/:id',checkAuthenticated, postsController.details);


// Routers for edit
router.get('/edit/:id',checkAuthenticated, postsController.displayEditPage);
router.post('/edit/:id',checkAuthenticated, postsController.processEditPage);

// Delete
router.get('/delete/:id',checkAuthenticated, postsController.performDelete);

module.exports = router;
