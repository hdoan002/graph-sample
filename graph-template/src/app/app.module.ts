import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TooltipModule } from "ngx-tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Angular Material Imports
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

// App components imports
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { GraphComponent } from "./graph/graph.component";
import { NodeDialogComponent } from "./node-dialog/node-dialog.component";
import { LinkDialogComponent } from "./link-dialog/link-dialog.component";
import { ClusterDialogComponent } from "./cluster-dialog/cluster-dialog.component";
import { ProfileDialogComponent } from "./profile-dialog/profile-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GraphComponent,
    NodeDialogComponent,
    LinkDialogComponent,
    ClusterDialogComponent,
    ProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxGraphModule,
    NgxChartsModule,
    TooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [
    NodeDialogComponent,
    LinkDialogComponent,
    ClusterDialogComponent,
    ProfileDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
