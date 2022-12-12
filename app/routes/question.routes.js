const { authJwt } = require("../middlewares");
const controller = require("../controllers/question.controller");

module.exports = function(app) {
	
	app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
	
app.post("/api/posts/:postId/questions", controller.createQuestion);

app.post("/api/posts/:postId/questions/:questionId/answer",[authJwt.verifyToken], controller.createAnswer);

};