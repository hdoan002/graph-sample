const express = require("express");
const neo4j = require("neo4j-driver");
const router = express.Router();

// Neo4J config
const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "123abc";

// Neo4J driver
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

router.route("/get").post(function(req, res, next) {
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
    
    res.send("index.html");
});

module.exports = router;
