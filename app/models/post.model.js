let mongoose = require('mongoose');

// let productModel = mongoose.Schema(
//     {
//         _id: String,
//         title: String,
//         status: {
//             type: String,
//             enum: ['ENABLE', 'DISABLE'],
//             default: 'ENABLE'
//         },
//         price: Number,
//         expires_on: Date,
// 		created_by: String,
// 		category: {
//             type: String,
//             enum: ['Properties', 'Mobiles', 'Jobs', 'Bikes', 'Electronics & Appliances', 'Cars', 'Furniture', 'Pets']
//         }
//     },
//     {
//         collection: "Products"
//     }
// )

let productModel = mongoose.Schema(
    {
        _id: String,
        title: String,
        // status: {
        //     type: String,
        //     enum: ['ENABLE', 'DISABLE'],
        //     default: 'ENABLE'
        // },
        price: Number,
        expires_on: Date,
		questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "Products"
    }
    
)

module.exports = mongoose.model("Products", productModel);
