module.exports = (app) => {
	const profiles = require("../controllers/profiles.controller.js");

	// Create a new profile
	app.post("/profiles", profiles.createProfile);

	// Retrieve all profiles
	app.get("/profiles", profiles.getAll);

	// Retrieve a single profile with profileId
	app.get("/profiles/:profileId", profiles.getProfile);

	// Update a profile with profileId
	app.put("/profiles/:profileId", profiles.updateProfile);

	// Delete a profile with profileId
	app.delete("/profiles/:profileId", profiles.deleteProfile);

	// Create a new profile
	app.delete("/profiles", profiles.deleteAllProfiles);
};
