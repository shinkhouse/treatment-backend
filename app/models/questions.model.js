const sql = require("./database.model.js");

const questions = (question) => {
};

questions.getAll = (result) => {
	sql.query("select * from questions", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("questions: ", res);
		result(null, res);
	});
};

questions.getQuestion = (questionId, result) => {
	sql.query(
		`select * from questions where question_id = ${questionId}`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log("questions: ", res);
			result(null, res);
		}
	);
};

questions.deleteQuestion = (questionId, result) => {
	sql.query(`delete from questions where question_id = ${questionId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("questions: ", res);
		result(null, res);
	});
};

questions.deleteAllQuestions = (result) => {
	sql.query(`delete from questions`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("questions: ", res);
		result(null, res);
	});
};

questions.createQuestion = (question, result) => {
	sql.query("INSERT INTO questions SET ?", question, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created question: ", { id: res.insertId, ...question });
		result(null, { question_id: res.question_id, ...question });
	});
};

questions.updateQuestion = (id, question, result) => {
	sql.query(
		"UPDATE questions SET question_name = ?, description = ?, intervention = ? WHERE question_id = ?",
		[question.question_name, question.description, question.intervention, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found question with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated question: ", { id: id, ...question });
			result(null, { id: id, ...question });
		}
	);
};

module.exports = questions;
