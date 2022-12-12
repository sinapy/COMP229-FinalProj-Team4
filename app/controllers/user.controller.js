const { name } = require("ejs");
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

exports.editName = (req, res) =>{
    
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        let updatedUser = User({
            email: user.email,
            password: user.password,
            username: req.body.newName
        })

        User.findByIdAndUpdate(req.userId, updatedUser, { useFindAndModify: false })
           
        .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update name with =${name}. Please enter new name again!`
                    });
                } else res.send({ message: "User name was entered correctly." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating name"
                });
            });
        }}