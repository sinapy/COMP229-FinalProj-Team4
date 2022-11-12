let mongoose = require('mongoose');

let productModel = mongoose.Schema(
    {
        _id: String,
        title: String,
        keywords: [],
        status: String,
        price: Number,
    },
    {
        collection: "Products"
    }
)

module.exports = mongoose.model("Products", productModel);