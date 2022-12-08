// create a reference to the model
let productModel = require('../models/post');
let moment = require('moment');
let fb = require('firebase-admin');

// exports.processGetAll = async (req, res) => {
//     let db = fb.firestore();
//     console.log('******************passes******************');
//     const posts = await db.collection('posts').get();
//     console.log('******************got info******************')
//     let response = posts.docs.map(doc => doc.data());
//     console.log('*******************iterated******************')
//     res.status(200).send(response)
// }
//
// exports.processGetById = async (req, res) => {
//     let db = fb.firestore();
//     let id = req.params.id;
//     let response = await db.collection('posts').get(id)
//     res.status(200)
//         .send(JSON.parse(response));
// }
//
// // // Processes the data submitted from the Edit form to update a todo
// exports.processEdit = async (req, res) => {
//
//     let id = req.params.id
//     let db = fb.firestore();
//
//
//     console.log(req.body);
//
//     let updatedPost = ({
//         _id: req.body._id,
//         title: req.body.title,
//         price: req.body.price,
//  		status: req.body.status,
//         expires_on: req.body.expires_on,
//         category: req.body.category
//
//     });
//
//     // Update the document in firestore
//     let response = await db.collection('posts').doc(id).set(updatedPost);
//
//
//     // .catch(err => {
//     //     res.status(500).send({
//     //       message:
//     //         err.message || "Some error occurred while updating the task."
//     //     });
//     //   });
//
//
// }
//
// // // Deletes a todo based on its id.
// exports.processDelete = async (req, res) => {
//
//     // ADD YOUR CODE HERE
//
//     let id = req.params.id
//     let db = fb.firestore();
//     let response = await db.collection('posts').doc(id).delete();
//
//     console.log(req.body);
//
//
//       // .catch(err => {
//       //   res.status(500).send({
//       //     message: "Could not delete task with id=" + id
//       //   });
//       // });
//
// }
//
// // // Processes the data submitted from the Add form to create a new todo
// exports.processAdd = async (req, res) => {
//
//     console.log(req.body);
//
//     let db = fb.firestore()
//     // Generate locally a new document
//     let newDoc = db.collection('posts').doc();
//
//     let newPost = ({
//         _id: newDoc.id,
//         title: req.body.title,
//         price: req.body.price,
//         status: req.body.status,
//         expires_on: req.body.expires_on,
//         created_by: req.body.created_by,
//         category: req.body.category
//     });
//
//     // set new document in database
//     let response = await newDoc.set(newPost);
//     res.status(200).json(newPost);
//
//
//
//
//     // }).catch(err => {
//     //     res.status(500).send({
//     //       message:
//     //         err.message || "Some error occurred while creating the task."
//     //     });
//     //   });


exports.getAllposts = function(req, res, next) {
    productModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}



exports.getPostDetailsById = (req, res, next) => {

    let id = req.params.id;

    productModel.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Post with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Post with id=" + id });
        });
}

exports.createPost = (req, res, next) => {

    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let newPost = productModel({
        _id: Math.random().toString(36).slice(2),
        title: req.body.title,
        price: req.body.price,
        //status: req.body.status,
        expires_on: req.body.expires_on,

    });

    productModel.create(newPost).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });

}


exports.updatePost = (req, res, next) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    let id = req.params.id

    console.log(req.body);

    let updatedPost = productModel({
        title: req.body.title,
        price: req.body.price,
        //status: req.body.status,
        expires_on: req.body.expires_on,
    });

    productModel.findByIdAndUpdate(id, updatedPost, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                });
            } else res.send({ message: "Post was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });


}


exports.deletePost = (req, res, next) => {

    let id = req.params.id

    console.log(req.body);

    productModel.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
    

}
