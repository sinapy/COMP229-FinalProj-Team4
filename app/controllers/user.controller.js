const User = require("../models/user.model");
exports.allAccess = (req, res) => {
    res.status (200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.getName = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(501).send({message: err});
            return;
        }
        let username = user.username()
        if (username == null) {
            username = ""
        }
        res.status(200).send(user.username())
    });
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
