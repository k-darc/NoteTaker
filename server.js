var express = require("express");

var connection = require("./connection");

var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port
var app = express();
var PORT = process.env.PORT || 8080;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MOUNTING ROUTES
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});
