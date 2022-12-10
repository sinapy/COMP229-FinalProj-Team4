let productModel = require('../models/post');
let moment = require('moment');

module.exports.featuredPostsList = function(req, res, next){

    productModel.find((err, postsList) => {
        if (err){
            return console.error(err);
        }
        else{
            let len = postsList.length
            let random1 = Math.floor(Math.random() * len)
            let random2 = Math.floor(Math.random() * len)
            let random3 = Math.floor(Math.random() * len)

            let myList = []
            console.log(postsList)
            myList.push(postsList[random1])
            myList.push(postsList[random2])
            myList.push(postsList[random3])

            postsList = myList
            console.log(postsList)
            res.render('index', {featuredPostLists: postsList})
        }
    })
}
