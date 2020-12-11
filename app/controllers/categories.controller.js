const categories = require("../models/categories.model.js");

// Create and Save a new category
exports.createCategory = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Save category in the database
	categories.createCategory(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the category.",
			});
		else res.send(data);
	});
};

// Retrieve all categories from the database.
exports.getAll = (req, res) => {
	categories.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving categories.",
			});
		else res.send(data);
	});
};

// Find a single category with a categoryId
exports.getCategory = (req, res) => {
	categories.getCategory(req.params.categoryId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving categories.",
			});
		else res.send(data);
	});
};

// Update a category identified by the categoryId in the request
exports.updateCategory = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	categories.updateCategory(req.params.categoryId, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found category with id ${req.params.categoryId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating category with id " +
						req.params.categoryId,
				});
			}
		} else res.send(data);
	});
};

// Delete a category with the specified categoryId in the request
exports.deleteCategory = (req, res) => {
	categories.deleteCategory(req.params.categoryId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving categories.",
			});
		else res.send(data);
	});
};

// Delete all categories from the database.
exports.deleteAllCategories = (req, res) => {
	categories.deleteAllCategories((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving categories.",
			});
		else res.send(data);
	});
};
