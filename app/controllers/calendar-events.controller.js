const calendarEvents = require("../models/calendar-events.model.js");

// Create and Save a new calendarEvent
exports.createCalendarEvent = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Save calendarEvent in the database
	calendarEvents.createCalendarEvent(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the calendarEvent.",
			});
		else res.send(data);
	});
};

// Retrieve all calendarEvents from the database.
exports.getAll = (req, res) => {
	calendarEvents.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving calendarEvents.",
			});
		else res.send(data);
	});
};

// Find a single calendarEvent with a calendarEventId
exports.getCalendarEvent = (req, res) => {
	calendarEvents.getCalendarEvent(req.params.calendarEventId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving calendarEvents.",
			});
		else res.send(data);
	});
};

// Update a calendarEvent identified by the calendarEventId in the request
exports.updateCalendarEvent = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	calendarEvents.updateCalendarEvent(req.params.calendarEventId, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found calendarEvent with id ${req.params.calendarEventId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating calendarEvent with id " +
						req.params.calendarEventId,
				});
			}
		} else res.send(data);
	});
};

// Delete a calendarEvent with the specified calendarEventId in the request
exports.deleteCalendarEvent = (req, res) => {
	calendarEvents.deleteCalendarEvent(req.params.calendarEventId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving calendarEvents.",
			});
		else res.send(data);
	});
};

// Delete all calendarEvents from the database.
exports.deleteAllCalendarEvents = (req, res) => {
	calendarEvents.deleteAllCalendarEvents((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving calendarEvents.",
			});
		else res.send(data);
	});
};
