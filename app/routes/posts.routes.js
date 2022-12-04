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

//     app.get('/view-posts', controller.processGetAll);
//
//     /* POST Route for processing the Add page - CREATE Operation */
//     app.post('/create-post', controller.processAdd);
//
// // Route for Details
//     app.get('/details/:id', [authJwt.verifyToken], controller.processGetById);
//
// // Routers for edit
//     app.put('/edit/:id', [authJwt.verifyToken], controller.processEdit);
//
// // Delete
//     app.get('/delete/:id', [authJwt.verifyToken], controller.processDelete);

    // get all post
    app.get('/api/posts/', controller.getAllposts);

//get a post by id
    app.get('/api/posts/:id', controller.getPostDetailsById);

// createnew post
    app.post('/api/posts/', [authJwt.verifyToken], controller.createPost);

// update a post
    app.put('/api/posts/:id', [authJwt.verifyToken], controller.updatePost);

// delete a post
    app.delete('/api/posts/:id', [authJwt.verifyToken], controller.deletePost);

}
