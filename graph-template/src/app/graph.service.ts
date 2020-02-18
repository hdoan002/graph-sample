import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Link } from "./link";
import { Node } from "./node";
import { Cluster } from "./cluster";

@Injectable({
  providedIn: "root"
})
export class GraphService {
  ngxNode = [
    {
      id: "1",
      label: "Something A",
      profile: "This is alpha node."
    },
    {
      id: "2",
      label: "Something B",
      profile: "This is bravo node."
    },
    {
      id: "3",
      label: "Something C",
      profile: "This is charlie node."
    },
    {
      id: "4",
      label: "Something D",
      profile: "This is delta node."
    },
    {
      id: "5",
      label: "Something E",
      profile: "This is echo node."
    },
    {
      id: "6",
      label: "Something F",
      profile: "This is foxtrot node."
    }
  ];

  ngxLinks: Link[] = [
    {
      id: "a",
      source: "1",
      target: "2",
      label: "is parent of",
      selected: false,
      color: {
        stroke: "#666"
      }
    },
    {
      id: "b",
      source: "2",
      target: "3",
      label: "custom label",
      selected: false,
      color: {
        stroke: "#666"
      }
    },
    {
      id: "c",
      source: "1",
      target: "3",
      label: "custom label",
      selected: false,
      color: {
        stroke: "#666"
      }
    },
    {
      id: "d",
      source: "1",
      target: "4",
      label: "custom label",
      selected: false,
      color: {
        stroke: "#666"
      }
    },
    {
      id: "e",
      source: "3",
      target: "5",
      label: "custom label",
      selected: false,
      color: {
        stroke: "#666"
      }
    },
    {
      id: "f",
      source: "3",
      target: "6",
      label: "custom label",
      selected: false,
      color: {
        stroke: "#666"
      }
    }
  ];

  ngxCluster = [
    {
      id: "0",
      label: "Layer 0",
      childNodeIds: ["1", "3", "4"]
    },
    {
      id: "asdfasdf",
      label: "Layer 1",
      childNodeIds: ["5", "6"]
    },
    {
      id: "asdfasdfgdsafasd",
      label: "Layer 2",
      childNodeIds: ["2"]
    }
  ];

  constructor(private http: HttpClient) {}

  addNode(node: string) {
    // this.ngxNode.push({
    //   id: "10000",
    //   label: node,
    //   profile: "This is " + node + " node."
    // });

    console.log("Sending post request to server");
    const post = this.http.post("/neo4j/addItem", {
      label: node,
      profile: "This is " + node + " node"
    });

    post.subscribe(x => {
      console.log("printing subscribe");
      console.log(x);
    });
    // console.log(this.ngxNode);
    // this.addLink();
    // this.up();
  }

  addLink(link: Link) {
    // this.ngxLinks.push({
    //   id: "1231231",
    //   source: link.source,
    //   target: link.target,
    //   label: link.label,
    //   selected: false,
    //   color: {
    //     stroke: "#666"
    //   }
    // });
    console.log("Sending post request to server");
    const post = this.http.post("/neo4j/addLink", {
      source: link.source,
      target: link.target,
      label: link.label
      // selected: false,
      // color: {
      //   stroke: "#666"
      // }
    });

    post.subscribe(x => {
      console.log("printing subscribe");
      console.log(x);
    });
  }

  addLink1() {
    this.ngxLinks.push({
      id: "x",
      source: "2",
      target: "6",
      label: "test label",
      selected: false,
      color: {
        stroke: "#666"
      }
    });
  }

  addCluster(cluster: Cluster) {
    const post = this.http.post("/neo4j/addCluster", {
      label: cluster.label,
      childNodeIds: cluster.childNodeIds
    });

    post.subscribe(x => {
      console.log("printing subscribe");
      console.log(x);
    });
  }

  // getSample() {
  //   return this.http.get("/neo4j/get");
  // }

  up(): Observable<boolean> {
    // Deprecated
    return of(true);
  }

  getNodes() {
    console.log("Sending get request to server");
    const get = this.http.get("/neo4j/items");

    return get;
    // return of(this.ngxNode);
  }

  getLinks() {
    console.log("Sending get request to server");
    const get = this.http.get("/neo4j/links");

    return get;
  }
}
