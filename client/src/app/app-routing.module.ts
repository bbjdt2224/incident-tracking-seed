import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/incidents', pathMatch: 'full'},
  { path: 'incidents', component: IncidentsComponent},
  { path: 'incident/:id', component: IncidentDetailsComponent},
  { path: 'newIncident', component: NewIncidentComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
