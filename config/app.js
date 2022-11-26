if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
var path = require('path');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var indexRouter = require('../routes');
var usersRouter = require('../routes/users');

var productRouter = require('../routes/posts');
const checkAuthenticated = require('../config/middleware/checkAuthenticated.js');
const checkNotAuthenticated = require('../config/middleware/checkNotAuthenticated');
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  console.log(req.isAuthenticated());
  next();
});

app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/home-kitchen' ,indexRouter);
app.use('/electronics' ,indexRouter);
app.use('/best-sellers' , indexRouter);

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.get('/forgot_password', checkNotAuthenticated , function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = app;
