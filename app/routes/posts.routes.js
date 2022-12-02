var express = require('express');
var router = express.Router();

let postsController = require('../controllers/posts.controller');
const checkAuthenticated = require('../middlewares/checkAuthenticated.js');
const {authJwt} = require("../middlewares");

router.get('/view-posts' ,postsController.postsList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/create-post',[authJwt.verifyToken], postsController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/create-post',[authJwt.verifyToken], postsController.processAdd);

// Route for Details
router.get('/details/:id',[authJwt.verifyToken], postsController.details);


// Routers for edit
router.get('/edit/:id',[authJwt.verifyToken], postsController.displayEditPage);
router.post('/edit/:id',[authJwt.verifyToken], postsController.processEdit);

// Delete
router.get('/delete/:id',[authJwt.verifyToken], postsController.processDelete);

module.exports = router;
