const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Post = db.post;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];


    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAllowed = (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            console.log("hello")
            res.status(500).send({ message: err });
            return;
        }


        Post.findById(req.body.id || req.params.id || req.params.postId, function (err, post) {

                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }


                if (post?.owner._id.toString() === req.userId){
                    console.log('this is happening')
                    next();
                    return;
                }

            Role.find(
                {
                    _id: { $in: user.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === "admin") {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: "Require Admin Role!" });
                    return;
                }
            );
            }
        )

        console.log('this is happening 2')


    });
};



const authJwt = {
    verifyToken,
    isAllowed,
};
module.exports = authJwt;
