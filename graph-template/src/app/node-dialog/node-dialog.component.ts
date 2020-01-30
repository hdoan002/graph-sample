import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Node } from "../node";

@Component({
  selector: "app-node-dialog",
  templateUrl: "./node-dialog.component.html",
  styleUrls: ["./node-dialog.component.css"]
})
export class NodeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Node
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
