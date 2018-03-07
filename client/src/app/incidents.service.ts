import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Incident } from './incidents';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { IncidentRevision } from './incidentrevisions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IncidentsService {

  constructor (
    private http: HttpClient
  ) {}

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>('/api/incidents');
  }

  getIncident(id: number): Observable<Incident> {
    return this.http.get<Incident>('/api/incident/' + id);
  }

  addIncident(incident: Incident, incidentrevision: IncidentRevision): Observable<Incident> {
    return this.http.post<Incident>('/api/incidents', {
      'trackerId': incident.trackerId,
      'type': incidentrevision.type,
      'shortDescription': incidentrevision.shortDescription,
      'longDescription': incidentrevision.longDescription
    }, httpOptions);
  }

  updateIncident(incident: Incident): Observable<Incident> {
    return this.http.put<Incident>('/api/incident/' + incident.id, {
      'trackerId': incident.trackerId,
      'type': incident.incidentrevisions[incident.incidentrevisions.length - 1].type,
      'shortDescription': incident.incidentrevisions[incident.incidentrevisions.length - 1].shortDescription,
      'longDescription': incident.incidentrevisions[incident.incidentrevisions.length - 1].longDescription,
      'resolution': incident.incidentrevisions[incident.incidentrevisions.length - 1].resolution,
      'severity': incident.incidentrevisions[incident.incidentrevisions.length - 1].severity
    }, httpOptions);
  }

}
