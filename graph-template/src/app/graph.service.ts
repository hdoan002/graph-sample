import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Link } from "./link";
import { Node } from "./node";

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

  constructor() {}

  addNode() {
    this.ngxNode.push({
      id: "10000",
      label: "Test",
      profile: "This is test node."
    });
    this.addLink();
    this.up();
  }

  addLink() {
    this.ngxLinks.push({
      id: "z",
      source: "2",
      target: "10000",
      label: "test label",
      selected: false,
      color: {
        stroke: "#666"
      }
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

  up(): Observable<boolean> {
    return of(true);
  }

  getNodes(): Observable<Node[]> {
    return of(this.ngxNode);
  }

  getLinks(): Observable<Link[]> {
    return of(this.ngxLinks);
  }
}
