let mongoose = require('mongoose');

let category = mongoose.Schema(
    {
        _id: String,
        title: String,
        status: {
            type: String,
            enum: ['ENABLE', 'DISABLE'],
            default: 'ENABLE'
        },
        price: Number,
        expires_on: Date
    },
    {
        collection: "category"
    });

module.exports = mongoose.model("products", category);