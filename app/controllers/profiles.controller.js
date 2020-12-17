const profiles = require("../models/profiles.model.js");

// Create and Save a new profile
exports.createProfile = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Save profile in the database
	profiles.createProfile(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the profile.",
			});
		else res.send(data);
	});
};

// Retrieve all profiles from the database.
exports.getAll = (req, res) => {
	profiles.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving profiles.",
			});
		else res.send(data);
	});
};

// Find a single profile with a profileId
exports.getProfile = (req, res) => {
	profiles.getProfile(req.params.profileId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving profiles.",
			});
		else res.send(data[0]);
	});
};

// Update a profile identified by the profileId in the request
exports.updateProfile = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	profiles.updateProfile(req.params.profileId, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found profile with id ${req.params.profileId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating profile with id " +
						req.params.profileId,
				});
			}
		} else res.send(data);
	});
};

// Delete a profile with the specified profileId in the request
exports.deleteProfile = (req, res) => {
	profiles.deleteProfile(req.params.profileId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving profiles.",
			});
		else res.send(data);
	});
};

// Delete all profiles from the database.
exports.deleteAllProfiles = (req, res) => {
	profiles.deleteAllProfiles((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving profiles.",
			});
		else res.send(data);
	});
};
