module.exports = (app) => {
	const calendarEvents = require("../controllers/calendar-events.controller.js");

	// Create a new calendarEvent
	app.post("/calendar-events", calendarEvents.createCalendarEvent);

	// Retrieve all calendarEvents
	app.get("/calendar-events", calendarEvents.getAll);

	// Retrieve a single calendarEvent with calendarEvent
	app.get("/calendar-events/:calendarEvent", calendarEvents.getCalendarEvent);

	// Update a calendarEvent with calendarEvent
	app.put("/calendar-events/:calendarEvent", calendarEvents.updateCalendarEvent);

	// Delete a calendarEvent with calendarEvent
	app.delete("/calendar-events/:calendarEvent", calendarEvents.deleteCalendarEvent);

	// Create a new calendarEvent
	app.delete("/calendar-events", calendarEvents.deleteAllCalendarEvents);
};
