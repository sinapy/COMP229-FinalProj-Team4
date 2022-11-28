if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const server = express();

var corsOptions = {
  origin: "http://localhost:4200"
}

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({extended: true}))

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });

app.get("/", (req, res) => {
  res.json({ message : "Welcome home"})
});

require('./app/routes/auth.routes')(app);
require('./app/routers/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

var indexRouter = require('./app/models');
var usersRouter = require('./app/routes/users');

var productRouter = require('./app/routes/posts');
const checkAuthenticated = require('./app/middleware/checkAuthenticated.js');
const checkNotAuthenticated = require('./app/middleware/checkNotAuthenticated');
const initializePassport = require('./app/config/passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

server.set('views', path.join(__dirname, '../views'));
server.set('view engine', 'ejs');


server.use(express.urlencoded({ extended: false }))
server.use(
    cookieSession({
      name: 'WLDG-session',
      secret: "COOKIE_SECRET",
      httpOnly: true
    })
)
server.use(flash())
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.static(path.join(__dirname, '../node_modules')))

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))
server.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.req = req;
  console.log(req.isAuthenticated());
  next();
});

server.use('/',indexRouter);
server.use('/users', usersRouter);
server.use('/products', productRouter);
server.use('/home-kitchen' ,indexRouter);
server.use('/electronics' ,indexRouter);
server.use('/best-sellers' , indexRouter);

server.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

server.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

server.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

server.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

server.post('/register', checkNotAuthenticated, async (req, res) => {
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

server.get('/forgot_password', checkNotAuthenticated , function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});

server.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = server;
