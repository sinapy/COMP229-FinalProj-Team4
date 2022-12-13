const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const Post = require('../models/post.model');

exports.createQuestion = function(req, res, next) {
	// CREATE Question
	// INSTANTIATE INSTANCE OF MODEL
	const question = new Question(req.body);
	console.log(req.userId)

	if (req.userId) {
		question.author = req.userId;
	}

	console.log(question);

	console.log(req.params.postId);

	// SAVE INSTANCE OF Comment MODEL TO DB
	question.save()
		.then(question => {
			return Promise.all([Post.findById(req.params.postId)])
		})
		.then(([post, User]) => {
			post.questions.unshift(question);
			res.send(Promise.all([post.save()]));
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Question."
			});
		});
};


exports.createAnswer = function(req, res, next) {
	// CREATE Question
	// INSTANTIATE INSTANCE OF MODEL
	console.log(req.body)

	Question.findById(req.params.questionId).then(data => {
		if (data) {
			Post.findById(req.params.postId).then(data1 => {
				if (data1.owner != req.userId) {
					res.status(400).send({ message: "You are not authorized to answer this question." });
				} else {
					const answer = new Answer(req.body);
					answer.author = data1.owner;
					answer.save()
						.then(answer => {
							
							console.log(answer  + "/=========/" + data);
							
							data.answer = answer;
							res.send(Promise.all([data.save()]));
						})
						.catch(err => {
							console.log("problem is here")
							console.log(err.message)
							res.status(500).send({
								message:
									err.message || "Some error occurred while creating the Question."
							});
						});
				}

			});
		} else {
			res.status(404).send({ message: "Not found Question with id " + req.params.questionId });
		}
	})
		.catch(err => {
			res
				.status(500)
				.send({
					message:
						err.message || "Some error occurred while creating the Answer."
				});
		});



};
