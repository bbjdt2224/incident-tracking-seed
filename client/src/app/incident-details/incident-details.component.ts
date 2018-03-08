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

  @Input() incident: Incident;
  user: User;
  revision = 0;
  trackers: User[];
  severity: string;
  severityclass = '';

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentsService,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTracker();
    this.getUser();
    this.getIncident();
  }

  getIncident(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incidentService.getIncident(id)
      .subscribe(incident => {
        this.incident = incident;
        this.findRevision();
        this.findSeverity();
      });
  }

  update(): void {
    const revision = this.incident.incidentrevisions[this.revision];
    this.incidentService.updateIncident(this.incident, revision).subscribe(result => this.goBack());
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  goBack(): void {
    this.router.navigate(['/incidents']);
  }

  redirect() {
    this.router.navigate(['/login']);
  }

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

  getTracker() {
    this.userService.getTrackers().subscribe(trackers => this.trackers = trackers);
  }

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

}
