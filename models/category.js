let mongoose = require('mongoose');

let category = mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String
    },
    {
        collection: "category"
    });

module.exports = mongoose.model("products", category);