import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { AppRoutingModule } from './/app-routing.module';
import { IncidentsService } from './incidents.service';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { UserService } from './user.service';
import { NewIncidentComponent } from './new-incident/new-incident.component';


@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentDetailsComponent,
    NewIncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    IncidentsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
