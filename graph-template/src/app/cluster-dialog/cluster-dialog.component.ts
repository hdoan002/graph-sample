import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { Cluster } from "../cluster";

@Component({
  selector: "app-cluster-dialog",
  templateUrl: "./cluster-dialog.component.html",
  styleUrls: ["./cluster-dialog.component.css"]
})
export class ClusterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClusterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
