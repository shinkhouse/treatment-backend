module.exports = (app) => {
	const topics = require("../controllers/topics.controller.js");

	// Create a new topic
	app.post("/topics", topics.createTopic);

	// Retrieve all topics
	app.get("/topics", topics.getAll);

	// Retrieve a single topic with topicId
	app.get("/topics/:topicId", topics.getTopic);

	// Update a topic with topicId
	app.put("/topics/:topicId", topics.updateTopic);

	// Delete a topic with topicId
	app.delete("/topics/:topicId", topics.deleteTopic);

	// Create a new topic
	app.delete("/topics", topics.deleteAllTopics);
};
