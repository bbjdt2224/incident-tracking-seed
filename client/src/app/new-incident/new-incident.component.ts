import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentsService } from '../incidents.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';
import { IncidentRevision } from '../incidentrevisions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {

  incident: Incident = new Incident;
  incidentrevision: IncidentRevision = new IncidentRevision;
  trackers: User[];
  user: User;

  constructor(
    private incidentService: IncidentsService,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTracker();
  }

  addIncident(short: string, long: string, type: string, tracker: number): void {
    this.incident.trackerId = tracker;
    this.incidentrevision.shortDescription = short;
    this.incidentrevision.longDescription = long;
    this.incidentrevision.type = type;
    this.incidentService.addIncident(this.incident, this.incidentrevision).subscribe(() => this.goBack());
  }

  getTracker() {
    this.userService.getTrackers().subscribe(trackers => this.trackers = trackers);
  }

  goBack(): void {
    this.location.back();
  }



}
