const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const index = require("./routes/index");
const neo4j = require("./routes/neo4j");

// Port constiable
const port = 3000;

// Initating express server
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, "../dist/graph-template")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home route
app.use("/", index);
app.use("/neo4j", neo4j);

app.listen(port, function() {
  console.log("Server started on port " + port);
});
