import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incidents';
import { IncidentRevision } from '../incidentrevisions';
import { IncidentsService } from '../incidents.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  // the incident being viewed
  @Input() incident: Incident;
  // the current user
  user: User;
  // the revision number of the most current revision
  revision = 0;
  // an array of all the trackers
  trackers: User[];
  // the string representation of the severity
  severity: string;
  // the class of the severity to change the color of the text
  severityclass = '';
  // weather or not the past revisions drop down is collapsed or not
  isCollapsed = true;
  // the user who made the incident
  creator: User;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentsService,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) {}

  // gets the trackers, current user, and the incident being viewed
  ngOnInit() {
    this.getTracker();
    this.getUser();
    this.getIncident();
  }

  // gets the incident being viewed then finds the number of the most current revesion and the string representataion of the severity
  getIncident(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incidentService.getIncident(id)
      .subscribe(incident => {
        this.incident = incident;
        this.findRevision();
        this.findSeverity();
        this.getCreator(incident.userId);
      });
  }

  // calls the update function in the incident service
  update(): void {
    const revision = this.incident.incidentrevisions[this.revision];
    this.incidentService.updateIncident(this.incident, revision).subscribe(result => this.goBack());
  }

  // gets the current user and if there is no current user then redirect to login
  getUser(): void {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  // redirect to incidents
  goBack(): void {
    this.router.navigate(['/incidents']);
  }

  // redirect to login
  redirect() {
    this.router.navigate(['/login']);
  }

  // finds the most recent revision by finding the bigest number
  findRevision(): void {
    let id = 0;
    let index = 0;
    let counter = 0;
    this.incident.incidentrevisions.forEach(revision => {
      if (revision.revisionNumber > id) {
        id = revision.revisionNumber;
        index = counter;
      }
      counter++;
    });
    this.revision = index;
  }

  // gets all of the trackers
  getTracker() {
    this.userService.getTrackers().subscribe(trackers => this.trackers = trackers);
  }

  // sets the severity and severity class based on the number of severity of the incident
  findSeverity() {
    switch (this.incident.incidentrevisions[this.revision].severity) {
      case 1:
        this.severity = 'Security Weakness';
        this.severityclass = 'success';
        break;
      case 2:
        this.severity = 'Minor Incident';
        this.severityclass = 'warning';
        break;
      case 3:
        this.severity = 'Major Incident';
        this.severityclass = 'danger';
        break;
      default:
        this.severity = 'Not Set';
        break;
    }
  }

  // returns a date object represntating the time string given column of the incident
  getDate(timestamp: string): Date {
    const date = new Date(timestamp);
    return date;
  }

  // returns the string representation of the severity number given
  getSeverity(severity: number): string {
    switch (severity) {
      case 1:
        return 'Security Weakness';
      case 2:
        return 'Minor Incident';
      case 3:
        return 'Major Incident';
      default:
        return '';
    }
  }

  // gets the class to define the color of the text of the severity
  getSeverityClass(severity: number): string {
    switch (severity) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
      default:
        return '';
    }
  }

  // get the creator of the incident
  getCreator(id: number) {
    this.userService.getUserById(id).subscribe(user => this.creator = user);
  }

}
