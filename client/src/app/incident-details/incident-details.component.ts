import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incidents';
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
      });
  }

  update(short: string, long: string, type: string, tracker: number, reason: string, severity: number): void {
    this.incident.incidentrevisions[this.revision].shortDescription = short;
    this.incident.incidentrevisions[this.revision].longDescription = long;
    this.incident.incidentrevisions[this.revision].type = type;
    if (reason != null) {
      this.incident.incidentrevisions[this.revision].resolution = reason;
    }
    if (severity != null) {
      this.incident.incidentrevisions[this.revision].severity = severity;
    }
    this.incident.trackerId = tracker;
    this.incidentService.updateIncident(this.incident).subscribe(result => this.goBack());
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

}
