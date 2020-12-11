const sql = require("./database.model.js");

const topics = (topic) => {
	this.topicId = topic.topic_id;
	this.topicName = topic.topic_name;
	this.topicDescription = topic.description;
	this.topicIntervention = topic.intervention;
	this.topicResponse = topic.response;
	this.topicCategoryId = topic.category_id;
	this.createdBy = topic.created_by;
	this.createdDate = topic.created_ts;
	this.updatedDate = topic.updated_ts;
};

topics.getAll = (result) => {
	sql.query("select * from topics", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("topics: ", res);
		result(null, res);
	});
};

topics.getTopic = (topicId, result) => {
	sql.query(
		`select * from topics where topic_id = ${topicId}`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log("topics: ", res);
			result(null, res);
		}
	);
};

topics.deleteTopic = (topicId, result) => {
	sql.query(`delete from topics where topic_id = ${topicId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("topics: ", res);
		result(null, res);
	});
};

topics.deleteAllTopics = (result) => {
	sql.query(`delete from topics`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("topics: ", res);
		result(null, res);
	});
};

topics.createTopic = (topic, result) => {
	sql.query("INSERT INTO topics SET ?", topic, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created topic: ", { id: res.insertId, ...topic });
		result(null, { topic_id: res.topic_id, ...topic });
	});
};

topics.updateTopic = (id, topic, result) => {
	sql.query(
		"UPDATE topics SET topic_name = ?, description = ?, intervention = ? WHERE topic_id = ?",
		[topic.topic_name, topic.description, topic.intervention, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found topic with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated topic: ", { id: id, ...topic });
			result(null, { id: id, ...topic });
		}
	);
};

module.exports = topics;
