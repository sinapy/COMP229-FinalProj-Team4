
module.exports = function() {
    const username = "newUser"
    const password = "yNITJJxMCQxKMQrJ"
    const cluster = "Cluster0"
    const dbname = "WDLG"

    let atlasDB = `mongodb+srv://${username}:${password}@${cluster}.qysqx.mongodb.net/${dbname}?retryWrites=true&w=majority`;

    var express = require('express');
    var logger = require('morgan');
    let cors = require('cors');


    const cookieSession = require("cookie-session");
    var configFirebase = require('./app/config/firebaseAdmin');

// Imports the Google Cloud client library
    const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
    const errors = new ErrorReporting({reportMode: 'always'});

// Reports a simple error
    errors.report('1 passes!');

    let fb = configFirebase();

    errors.report('2 passes!');


    const app = express();

// var corsOptions = {
//     origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));

    app.use(cors());
    app.options('*', cors());

    app.use(logger('dev'));

// parse requests of content-type - application/json
    app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({extended: false}));

    app.use(
        cookieSession({
            name: "WLDG-session",
            secret: "COOKIE_SECRET", // should use as secret environment variable
            httpOnly: true
        })
    );

    errors.report('3 passes!');

    const db = require("./app/models");
    const Role = db.role;

    db.mongoose
        .connect(atlasDB, {
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


    errors.report('4 passes!');
// simple route
    app.get("/", (req, res) => {
        res.json({message: "Welcome to WLDG application."});
    });

// routes
    require("./app/routes/auth.routes")(app);
    require("./app/routes/user.routes")(app);
    require("./app/routes/posts.routes")(app);

// set port, listen for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

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
}
