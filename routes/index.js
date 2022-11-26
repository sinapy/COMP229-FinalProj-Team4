var express = require('express');
var router = express.Router();

let productsController = require('../controllers/posts');
let indexController = require('../controllers/index');
const checkAuthenticated = require('../config/middleware/checkAuthenticated.js');

/* GET home page. */
router.get('/', indexController.featuredPostsList);

router.get('/how-work',function(req, res, next) {
      res.render('how-work');
});

router.get('/home-kitchen',checkAuthenticated, function(req, res, next) {
  res.render('pages/index', { title: 'Home & Kitchen' });
});

router.get('/electronics', checkAuthenticated, function(req, res, next) {
  res.render('pages/index', { title: 'Electronics' });
});

router.get('/best-sellers',checkAuthenticated, function(req, res, next) {
  res.render('pages/index', { title: 'Best Sellers' });
});

module.exports = router;
