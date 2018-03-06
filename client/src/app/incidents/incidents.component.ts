import { Component, OnInit } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentRevision } from '../incidentrevisions';
import { IncidentsService } from '../incidents.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[];
  user: User;
  isLoggedIn = true;
  weakness = 0;
  minor = 0;
  major = 0;

  constructor(
    private incidentService: IncidentsService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents()
    .subscribe(incidents => {
      this.incidents = incidents;
      this.countSeverity();
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  redirect() {
    this.router.navigate(['/login']);
  }

  countSeverity() {
    this.incidents.forEach(incident => {
      if (incident.incidentrevisions[this.findRevision(incident)].severity === 1) {
        this.weakness++;
      }
      if (incident.incidentrevisions[this.findRevision(incident)].severity === 2) {
        this.minor++;
      }
      if (incident.incidentrevisions[this.findRevision(incident)].severity === 3) {
        this.major++;
      }
    });
  }

  findRevision(incident: Incident): number {
    let id = 0;
    let index = 0;
    let counter = 0;
    incident.incidentrevisions.forEach(revision => {
      if (revision.revisionNumber > id) {
        id = revision.revisionNumber;
        index = counter;
      }
      counter++;
    });
    return index;
  }

}
