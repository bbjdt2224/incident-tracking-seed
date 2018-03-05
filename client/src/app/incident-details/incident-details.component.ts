import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incidents';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  @Input() incident: Incident;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getIncident();
  }

  getIncident(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incidentService.getIncident(id)
      .subscribe(incident => this.incident = incident);
  }

  goBack(): void {
    this.location.back();
  }

}
