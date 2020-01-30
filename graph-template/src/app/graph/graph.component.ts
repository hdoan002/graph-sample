import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { GraphService } from "../graph.service";
import { Link } from "../link";
import { Node } from "../node";
import { Cluster } from "../cluster";
import { NodeDialogComponent } from "../node-dialog/node-dialog.component";
import { LinkDialogComponent } from "../link-dialog/link-dialog.component";
import { ClusterDialogComponent } from "../cluster-dialog/cluster-dialog.component";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  view = [window.innerWidth - 18, window.innerHeight - 96];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = true;
  curve = false;

  links: Link[];
  nodes: Node[];

  clusters = this.graph.ngxCluster;

  // Variable to hold new node
  newNode: Node = {
    id: "",
    label: "",
    profile: ""
  };

  // Variable to hold new link
  newLink: Link = {
    id: "",
    source: "",
    target: "",
    label: "",
    selected: false,
    color: {
      stroke: "#666"
    }
  };
  newCluster: Cluster; // Variable to hold new cluster

  // Variable used for link highlighting
  matched: Array<any>;

  select = {
    stroke: "#666"
  };

  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  constructor(private graph: GraphService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getLinks();
    this.getNodes();
  }

  // getUp(): void {
  //   this.graph.up().subscribe(up => {
  //     if (up) {
  //       this.updateGraph();
  //       console.log("up");
  //     }
  //   });
  // }

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

  addNode(node: string) {
    this.graph.addNode(node);
    console.log("Nav bar adding node");
    this.updateGraph();
  }

  addLink(link: Link) {
    this.graph.addLink(link);
    this.updateGraph();
  }

  fitGraph() {
    this.zoomToFit$.next(true);
    console.log("Fitting");
  }

  centerGraph() {
    this.center$.next(true);
    console.log("Centering");
  }

  // Open node dialog
  openNode(): void {
    const dialogRef = this.dialog.open(NodeDialogComponent, {
      width: "500px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.newNode.label = result;
      console.log(this.newNode.label);

      if (this.newNode.label != "" && this.newNode.label != undefined) {
        console.log("Adding new node");
        this.addNode(this.newNode.label); // Calls GraphService's addNode function
      }
    });
  }

  // Open link dialog
  openLink(): void {
    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: "500px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.newLink.label = result.label;
      this.newLink.source = result.source;
      this.newLink.target = result.target;

      console.log(this.newLink);
      if (this.newLink.label != "" && this.newLink.label != undefined) {
        console.log("Adding new Link");
        this.addLink(this.newLink); // Calls GraphService's addLink function
      }
    });
  }

  // Open cluster dialog
  openCluster(): void {
    const dialogRef = this.dialog.open(ClusterDialogComponent, {
      width: "500px",
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
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
