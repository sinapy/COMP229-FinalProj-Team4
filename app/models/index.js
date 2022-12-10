const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.post = require("./post.model");
db.role = require("./question.model");
db.post = require("./answer.model");

db.ROLES = ["user", "admin"];

module.exports = db;
