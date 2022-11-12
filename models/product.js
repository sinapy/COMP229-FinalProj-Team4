let mongoose = require('mongoose');

let productModel = mongoose.Schema(
    {
        title: String,
        keywords: [],
        status: String,
        price: Number,
    },
    {
        collection: "Products"
    }
)
