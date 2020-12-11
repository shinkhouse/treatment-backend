const sql = require("./database.model.js");

const categories = (category) => {

};

categories.getAll = (result) => {
	sql.query("select * from categories", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("categories: ", res);
		result(null, res);
	});
};

categories.getCategory = (categoryId, result) => {
	sql.query(
		`select * from categories where category_id = ${categoryId}`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log("categories: ", res);
			result(null, res);
		}
	);
};

categories.deleteCategory = (categoryId, result) => {
	sql.query(`delete from categories where category_id = ${categoryId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("categories: ", res);
		result(null, res);
	});
};

categories.deleteAllCategories = (result) => {
	sql.query(`delete from categories`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("categories: ", res);
		result(null, res);
	});
};

categories.createCategory = (category, result) => {
	sql.query("INSERT INTO categories SET ?", category, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created category: ", { id: res.insertId, ...category });
		result(null, { category_id: res.category_id, ...category });
	});
};

categories.updateCategory = (id, category, result) => {
	sql.query(
		"UPDATE categories SET category_name = ?, color = ? WHERE category_id = ?",
		[category.category_name, category.color, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found category with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated category: ", { id: id, ...category });
			result(null, { id: id, ...category });
		}
	);
};

module.exports = categories;
