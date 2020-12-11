module.exports = (app) => {
	const questions = require("../controllers/questions.controller.js");

	// Create a new question
	app.post("/questions", questions.createQuestion);

	// Retrieve all questions
	app.get("/questions", questions.getAll);

	// Retrieve a single question with questionId
	app.get("/questions/:questionId", questions.getQuestion);

	// Update a question with questionId
	app.put("/questions/:questionId", questions.updateQuestion);

	// Delete a question with questionId
	app.delete("/questions/:questionId", questions.deleteQuestion);

	// Create a new question
	app.delete("/questions", questions.deleteAllQuestions);
};
