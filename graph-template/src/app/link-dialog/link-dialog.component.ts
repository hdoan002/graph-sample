import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith, filter } from "rxjs/operators";
// import { Link } from "../link";

@Component({
  selector: "app-link-dialog",
  templateUrl: "./link-dialog.component.html",
  styleUrls: ["./link-dialog.component.css"]
})
export class LinkDialogComponent implements OnInit {
  sourceCtrl = new FormControl();
  filteredSrcNodes: Observable<any>;

  targetCtrl = new FormControl();
  filteredTarNodes: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.filterSrc();
    this.filterTar();
  }

  filterSrc() {
    console.log(this.data);
    this.filteredSrcNodes = this.sourceCtrl.valueChanges.pipe(
      startWith(""),
      map(node => this._filterNodes(node))
    );
  }

  filterTar() {
    this.filteredTarNodes = this.targetCtrl.valueChanges.pipe(
      startWith(""),
      map(node => this._filterNodes(node))
    );
  }

  private _filterNodes(value: string): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.data.nodes.filter(
      node => node.label.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // assignSrc(event) {
  //   console.log("[FUNCTION] assignSrc");
  //   this.data.source = event.src.uuid;
  // }

  // assignTar(event) {
  //   console.log("[FUNCTION] assignTar");
  //   this.data.target = event.tar.uuid;
  // }

  getSrcLabel(src) {
    // console.log(src);
    // if (src.uuid !== undefined) {
    //   console.log(src.uuid);
    //   console.log(this.data.link.source);
    //   this.data.link.source = src.uuid;
    // }
    return src ? src.label : null;
  }

  getTarLabel(tar) {
    // if (tar.uuid !== undefined) {
    //   this.data.link.target = tar.uuid;
    // }
    return tar ? tar.label : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.data.label = this.data.label;
    this.data.source = this.data.source.uuid;
    this.data.target = this.data.target.uuid;
    console.log(this.data);
    this.dialogRef.close();
  }
}
