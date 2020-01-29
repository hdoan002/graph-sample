const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const neo4j = require("neo4j-driver");

// Routes
const index = require("./routes/index");

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

app.listen(port, function() {
  console.log("Server started on port " + port);
});

// Neo4J config
const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "Le0isthebest!";

// Neo4J driver
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const personName = "Alice";
const resultPromise = session.run("CREATE (a:Person {name: $name}) RETURN a", {
  name: personName
});

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});
