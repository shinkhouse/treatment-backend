const topics = require("../models/topics.model.js");

// Create and Save a new topic
exports.createTopic = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Save topic in the database
	topics.createTopic(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the topic.",
			});
		else res.send(data);
	});
};

// Retrieve all topics from the database.
exports.getAll = (req, res) => {
	topics.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving topics.",
			});
		else res.send(data);
	});
};

// Find a single topic with a topicId
exports.getTopic = (req, res) => {
	topics.getTopic(req.params.topicId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving topics.",
			});
		else res.send(data[0]);
	});
};

// Update a topic identified by the topicId in the request
exports.updateTopic = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	topics.updateTopic(req.params.topicId, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found topic with id ${req.params.topicId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating topic with id " +
						req.params.topicId,
				});
			}
		} else res.send(data);
	});
};

// Delete a topic with the specified topicId in the request
exports.deleteTopic = (req, res) => {
	topics.deleteTopic(req.params.topicId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving topics.",
			});
		else res.send(data);
	});
};

// Delete all topics from the database.
exports.deleteAllTopics = (req, res) => {
	topics.deleteAllTopics((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving topics.",
			});
		else res.send(data);
	});
};
