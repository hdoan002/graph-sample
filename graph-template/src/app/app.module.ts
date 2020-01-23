import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TooltipModule } from 'ngx-tooltip';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Imports
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

// App components imports
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGraphModule,
    NgxChartsModule,
    TooltipModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
