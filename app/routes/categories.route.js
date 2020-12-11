module.exports = (app) => {
	const categories = require("../controllers/categories.controller.js");

	// Create a new category
	app.post("/categories", categories.createCategory);

	// Retrieve all categories
	app.get("/categories", categories.getAll);

	// Retrieve a single category with categoryId
	app.get("/categories/:categoryId", categories.getCategory);

	// Update a category with categoryId
	app.put("/categories/:categoryId", categories.updateCategory);

	// Delete a category with categoryId
	app.delete("/categories/:categoryId", categories.deleteCategory);

	// Create a new category
	app.delete("/categories", categories.deleteAllCategories);
};
