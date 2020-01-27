import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { GraphService } from "../graph.service";
import { Link } from "../link";
import { Node } from "../node";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  view = [window.innerWidth, window.innerHeight - 100];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = true;
  curve = false;

  links: Link[];
  nodes: Node[];

  clusters = this.graph.ngxCluster;

  matched: Array<any>;

  select = {
    stroke: "#666"
  };

  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  constructor(private graph: GraphService) {}

  ngOnInit() {
    this.getLinks();
    this.getNodes();
  }

  getUp(): void {
    this.graph.up().subscribe(up => {
      if (up) {
        this.updateGraph();
        console.log("up");
      }
    });
  }

  updateGraph() {
    this.update$.next(true);
    console.log("I have finished updating");
  }

  getNodes(): void {
    this.graph.getNodes().subscribe(nodes => (this.nodes = nodes));
  }

  getLinks(): void {
    this.graph.getLinks().subscribe(links => (this.links = links));
  }

  fitGraph() {
    this.zoomToFit$.next(true);
    console.log("Fitting");
  }

  centerGraph() {
    this.center$.next(true);
    console.log("Centering");
  }

  match(node: string) {
    console.log(this.links);
    this.matched = this.links.filter(element => element.source.match(node));
    this.matched.forEach(item => (item.selected = !item.selected));
    if (this.matched[0] !== undefined) {
      if (this.matched[0].selected) {
        this.matched.forEach(item => (item.color.stroke = "#f00"));
      } else {
        this.matched.forEach(item => (item.color.stroke = "#666"));
      }
    }
  }
}
