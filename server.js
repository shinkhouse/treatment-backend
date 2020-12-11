const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.host || "localhost";

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.listen
// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to treatment plan application. We are online." });
});

require("./app/routes/topics.route.js")(app);
require("./app/routes/categories.route.js")(app);
require("./app/routes/profiles.route.js")(app);
require("./app/routes/questions.route.js")(app);
require("./app/routes/calendar-events.route.js")(app);

// set port, listen for requests
app.listen(port,host, () => {
	console.log("Server is running on port 3000.");
});
