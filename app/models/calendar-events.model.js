const sql = require("./database.model.js");

const calendarEvents = (calendar_event) => {
};

calendarEvents.getAll = (result) => {
	sql.query("select * from calendar_events", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("calendar_events: ", res);
		result(null, res);
	});
};

calendarEvents.getCalendarEvent = (calendarEventId, result) => {
	sql.query(
		`select * from calendar_events where calendar_event_id = ${calendarEventId}`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log("calendar_events: ", res);
			result(null, res);
		}
	);
};

calendarEvents.deleteCalendarEvent = (calendarEventId, result) => {
	sql.query(`delete from calendar_events where calendar_event_id = ${calendarEventId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("calendar_events: ", res);
		result(null, res);
	});
};

calendarEvents.deleteAllCalendarEvents = (result) => {
	sql.query(`delete from calendar_events`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("calendar_events: ", res);
		result(null, res);
	});
};

calendarEvents.createCalendarEvent = (calendar_event, result) => {
	sql.query("INSERT INTO calendar_events SET ?", calendar_event, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created calendar_event: ", { id: res.insertId, ...calendar_event });
		result(null, { calendar_event_id: res.calendar_event_id, ...calendar_event });
	});
};

calendarEvents.updateCalendarEvent = (id, calendarEvent, result) => {
	sql.query(
		"UPDATE calendar_events SET name = ?, event_datetime = ? WHERE calendar_event_id = ?",
		[name, calendarEvent.event_datetime, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found calendar_event with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated calendar_event: ", { id: id, ...calendarEvent });
			result(null, { id: id, ...calendarEvent });
		}
	);
};

module.exports = calendarEvents;
