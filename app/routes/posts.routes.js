const { authJwt } = require("../middlewares");
const controller = require("../controllers/posts.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/view-posts', controller.processGetAll);

    /* POST Route for processing the Add page - CREATE Operation */
    app.post('/create-post', controller.processAdd);

// Route for Details
    app.get('/details/:id', [authJwt.verifyToken], controller.processGetById);

// Routers for edit
    app.post('/edit/:id', [authJwt.verifyToken], controller.processEdit);

// Delete
    app.get('/delete/:id', [authJwt.verifyToken], controller.processDelete);

}
