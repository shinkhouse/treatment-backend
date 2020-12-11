const sql = require("./database.model.js");

const profiles = (profile) => {
};

profiles.getAll = (result) => {
	sql.query("select * from profiles", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("profiles: ", res);
		result(null, res);
	});
};

profiles.getProfile = (profileId, result) => {
	sql.query(
		`select * from profiles where profile_id = ${profileId}`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log("profiles: ", res);
			result(null, res);
		}
	);
};

profiles.deleteProfile = (profileId, result) => {
	sql.query(`delete from profiles where profile_id = ${profileId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("profiles: ", res);
		result(null, res);
	});
};

profiles.deleteAllProfiles = (result) => {
	sql.query(`delete from profiles`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("profiles: ", res);
		result(null, res);
	});
};

profiles.createProfile = (profile, result) => {
	sql.query("INSERT INTO profiles SET ?", profile, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created profile: ", { id: res.insertId, ...profile });
		result(null, { profile_id: res.profile_id, ...profile });
	});
};

profiles.updateProfile = (id, profile, result) => {
	sql.query(
		"UPDATE profiles SET profile_name = ?, description = ?, intervention = ? WHERE profile_id = ?",
		[profile.profile_name, profile.description, profile.intervention, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found profile with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated profile: ", { id: id, ...profile });
			result(null, { id: id, ...profile });
		}
	);
};

module.exports = profiles;
