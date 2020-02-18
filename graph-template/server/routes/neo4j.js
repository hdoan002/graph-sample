const express = require("express");
const neo4j = require("neo4j-driver");
const router = express.Router();

// Neo4J config
const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "abc123";

// Neo4J driver
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
// const session = driver.session();

// Get everything in the database
router.get("/items", function(req, res, next) {
  var retArray = [];
  const session = driver.session();
  const resultPromise = session.run("MATCH(n) RETURN n");
  resultPromise.then(result => {
    session.close();
    retArray = arrayConstructor(result);
    res.json(retArray);
  });
});

// Get a single node by label and return it
router.get("/singleItem/:id", function(req, res, next) {
  const session = driver.session();
  const param = req.params.id;
  const resultPromise = session.run("MATCH (m:Item {label: $label}) RETURN m", {
    label: param
  });

  resultPromise.then(result => {
    session.close();

    res.json(result);
  });
});

// Get a node (m) and everything directly attached to it, upstream and downstream (r)
router.get("/item/:id", function(req, res, next) {
  const session = driver.session();
  const param = req.params.id;
  const resultPromise = session.run(
    "MATCH (m:Item {label: $label})<-->(r) RETURN m,r",
    {
      label: param
    }
  );

  resultPromise.then(result => {
    session.close();
    res.json(result);
  });
});

// Get a node (m) and everything directly attached to it, upstream and downstream (r)
router.get("/limitedItems/:id", function(req, res, next) {
  const session = driver.session();
  const param = req.params.id;
  const resultPromise = session.run(
    "MATCH (m:Item {label: $label})<-[*1..3]->(r) RETURN m,r",
    {
      label: param
    }
  );

  resultPromise.then(result => {
    session.close();
    res.json(result);
  });
});

// Get links in the database
router.get("/links", function(req, res, next) {
  var retArray = [];
  const session = driver.session();
  const resultPromise = session.run("MATCH p=()-->() RETURN p");
  resultPromise.then(result => {
    session.close();
    // console.log(
    //   result.records[0]._fields[0].segments[0].relationship.properties
    // );
    retArray = linkArrayConstructor(result);
    res.json(retArray);
  });
});

// Add a new node
router.post("/addItem", function(req, res, next) {
  const session = driver.session();
  const param = req.body;
  console.log(param);
  const resultPromise = session.run(
    "CREATE (m:Item {label: $label, profile: $profile})",
    {
      label: param.label,
      profile: param.profile
    }
  );

  resultPromise.then(result => {
    session.close();
    console.log(result);
    res.json(result);
    // on application exit:
    // driver.close();
  });
});

// Add a new link
router.post("/addLink", function(req, res, next) {
  const session = driver.session();
  const param = req.body;
  console.log(param);
  const resultPromise = session.run(
    "MATCH (a:Item),(b: Item) WHERE a.uuid = $source AND b.uuid= $target CREATE (a) –[r:RELTYPE { label: $label, source: a.uuid, target: b.uuid, id: $id}]-> (b) RETURN type(r)",
    {
      source: param.source,
      target: param.target,
      label: param.label,
      id: "a" + (Math.floor(Math.random() * 10000) + 1).toString()
    }
  );

  resultPromise.then(result => {
    session.close();
    console.log(result);
    res.json(result);
    // on application exit:
    // driver.close();
  });
});

// Add a new Cluster
router.post("/addCluster", function(req, res, next) {
  const session = driver.session();
  const param = req.body;
  console.log(param);
  const resultPromise = session.run(
    "MATCH (a:Item),(b: Item) WHERE a.uuid = $source AND b.uuid= $target CREATE (a) –[r:RELTYPE { label: $label, source: a.uuid, target: b.uuid, id: $id}]-> (b) RETURN type(r)",
    {
      label: param.label,
      childNodeIds: param.childNodeIds
    }
  );

  resultPromise.then(result => {
    session.close();
    console.log(result);
    res.json(result);
    // on application exit:
    // driver.close();
  });
});

function arrayConstructor(result) {
  const returnArray = [];
  result.records.forEach(element => console.log(element._fields[0].properties));
  result.records.forEach(element =>
    returnArray.push(element._fields[0].properties)
  );
  returnArray.forEach(element => {
    element.id = element.uuid;
  });
  return returnArray;
}

function linkArrayConstructor(result) {
  const returnArray = [];
  result.records.forEach(element =>
    console.log(element._fields[0].segments[0].relationship.properties)
  );
  result.records.forEach(element =>
    returnArray.push(element._fields[0].segments[0].relationship.properties)
  );
  // console.log(returnArray);
  returnArray.forEach(element => {
    element.selected = false;
    element.color = {
      stroke: "#666"
    };
  });
  // console.log(returnArray);
  return returnArray;
}

module.exports = router;
