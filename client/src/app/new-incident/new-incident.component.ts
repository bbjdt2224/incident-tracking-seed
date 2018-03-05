import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {

  @Input() incident: Incident;

  constructor(private incidentService: IncidentsService) { }

  ngOnInit() {
  }

  addIncident() {
    this.incidentService.addIncident(this.incident);
  }

}
