import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { AppRoutingModule } from './/app-routing.module';
import { IncidentsService } from './incidents.service';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { UserService } from './user.service';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentDetailsComponent,
    NewIncidentComponent,
    LoginComponent,
    HeaderComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    IncidentsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
