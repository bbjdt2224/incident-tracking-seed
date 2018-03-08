import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'incidents', component: IncidentsComponent},
  { path: 'incident/:id', component: IncidentDetailsComponent},
  { path: 'newIncident', component: NewIncidentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'userinfo', component: UserInfoComponent},
  { path: 'newuser', component: NewUserComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
