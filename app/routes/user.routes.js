const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const {auth} = require("firebase-admin");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get("api/user/", [authJwt.verifyToken], controller.getName);

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAllowed],
        controller.adminBoard
    );
};
