var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.featuredPostsList);

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/forgot_password', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});

router.get('/how-work', function(req, res, next) {
      res.render('how-work');
});

module.exports = router;
