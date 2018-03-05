import { Component, OnInit } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[];

  constructor(private incidentService: IncidentsService) { }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents()
    .subscribe(incidents => this.incidents = incidents);
  }

}
