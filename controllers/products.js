// create a reference to the model
let productModel = require('../models/product');

// Gets all posts from the Database and renders the page to list them all.
module.exports.postsList = function(req, res, next) {  
    
    productModel.find((err, postsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('products/view-posts', {
                postsList: postsList
            })            
        }
    });
}


// // Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    productModel.findById(id, (err, postToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('products/details', {
                post: postToShow
            })
        }
    });
}

// // Gets a todo by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE

    let id = req.params.id;

    productModel.findById(id, (err, postToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('products/create-post', {
                post: postToShow
            })
        }
    });  

}

// // Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    
    console.log(req.body);

    let updatedPost = productModel({
        _id: req.body.id,
        title: req.body.title,
        price: req.body.price,
    });

    // ADD YOUR CODE HERE

    productModel.findByIdAndUpdate(id, updatedPost, { useFindAndModify: false }).then(e => {
        res.statusCode = 302;
            res.setHeader("Location", "../view-posts");
            res.end();
        
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the task."
        });
      });


}

// // Deletes a todo based on its id.
module.exports.performDelete = (req, res, next) => {

    // ADD YOUR CODE HERE

    let id = req.params.id
    
    console.log(req.body);

    // ADD YOUR CODE HERE

    productModel.findByIdAndRemove(id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete task with id=${id}.`
          });
        } else {  
            res.statusCode = 302;
            res.setHeader("Location", "../view-posts");
            res.end();
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });

}

// // Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {

    res.render('products/create-post', {
        post: {}
    })     

}

// // Processes the data submitted from the Add form to create a new todo
module.exports.processAddPage = (req, res, next) => {

    console.log(req.body);

    let newTodo = productModel({
        _id: Math.random().toString(36).slice(2),
        title: req.body.title,
        price: req.body.price,
        
    });

    // ADD YOUR CODE HERE

    productModel.create(newTodo).then(e => {
        res.statusCode = 302;
            res.setHeader("Location", "../products/view-posts");
            res.end();
        
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });

    
    

}