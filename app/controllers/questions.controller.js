const questions = require("../models/questions.model.js");

// Create and Save a new question
exports.createQuestion = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Save question in the database
	questions.createQuestion(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the question.",
			});
		else res.send(data);
	});
};

// Retrieve all questions from the database.
exports.getAll = (req, res) => {
	questions.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving questions.",
			});
		else res.send(data);
	});
};

// Find a single question with a questionId
exports.getQuestion = (req, res) => {
	questions.getQuestion(req.params.questionId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving questions.",
			});
		else res.send(data);
	});
};

// Update a question identified by the questionId in the request
exports.updateQuestion = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	questions.updateQuestion(req.params.questionId, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found question with id ${req.params.questionId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating question with id " +
						req.params.questionId,
				});
			}
		} else res.send(data);
	});
};

// Delete a question with the specified questionId in the request
exports.deleteQuestion = (req, res) => {
	questions.deleteQuestion(req.params.questionId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving questions.",
			});
		else res.send(data);
	});
};

// Delete all questions from the database.
exports.deleteAllQuestions = (req, res) => {
	questions.deleteAllQuestions((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving questions.",
			});
		else res.send(data);
	});
};
