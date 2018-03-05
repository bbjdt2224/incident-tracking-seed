import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentsService } from '../incidents.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';
import { IncidentRevision } from '../incidentrevisions';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {

  incident: Incident = new Incident;
  incidentrevision: IncidentRevision = new IncidentRevision;
  trackers: User[];

  constructor(
    private incidentService: IncidentsService,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getTracker();
  }

  addIncident(short: string, long: string, type: string, tracker: number): void {
    this.incident.trackerId = tracker;
    this.incidentrevision.shortDescription = short;
    this.incidentrevision.longDescription = long;
    this.incidentrevision.type = type;
    this.incidentService.addIncident(this.incident, this.incidentrevision).subscribe(incident => this.incident = incident);
    this.goBack();
  }

  getTracker() {
    this.userService.getTrackers().subscribe(trackers => this.trackers = trackers);
  }

  goBack(): void {
    this.location.back();
  }

}
