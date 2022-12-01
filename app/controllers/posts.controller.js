// create a reference to the model
let productModel = require('../models/post');
let moment = require('moment');
let fb = require('firebase-admin');

// // Processes the data submitted from the Edit form to update a todo
module.exports.processEdit = async (req, res, next) => {

    let id = req.params.id
    let db = fb.firestore();

    
    console.log(req.body);

    let updatedPost = productModel({
        _id: req.body.id,
        title: req.body.title,
        price: req.body.price,
 		status: req.body.status,
        expires_on: req.body.expires_on,
        category: req.body.category

    });

    // Update the document in firestore
    let response = await db.collection('posts').doc(id).set(updatedPost);


    // .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while updating the task."
    //     });
    //   });


}

// // Deletes a todo based on its id.
module.exports.processDelete = async (req, res, next) => {

    // ADD YOUR CODE HERE

    let id = req.params.id
    let db = fb.firestore();
    let response = await db.collection('posts').doc(id).delete();
    
    console.log(req.body);


      // .catch(err => {
      //   res.status(500).send({
      //     message: "Could not delete task with id=" + id
      //   });
      // });

}

// // Processes the data submitted from the Add form to create a new todo
module.exports.processAdd = async (req, res, next) => {

    console.log(req.body);

    let db = fb.firestore()
    // Generate locally a new document
    let newDoc = db.collection('posts').doc();

    let newPost = productModel({
        _id: newDoc.id,
        title: req.body.title,
        price: req.body.price,
        status: req.body.status,
        expires_on: req.body.expires_on,
        created_by: req.user.id,
        category: req.body.category
    });

    // set new document in database
    let response = await newDoc.set(newPost);
    res.status(200).json(newPost);




    // }).catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the task."
    //     });
    //   });

    
    

}
