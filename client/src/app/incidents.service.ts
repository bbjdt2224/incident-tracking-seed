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

    constructor(
        private http: HttpClient
    ) { }

    // gets all incidents for current user in array form
    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>('/api/incidents');
    }

    // gets a specific incident by id number
    getIncident(id: number): Observable<Incident> {
        return this.http.get<Incident>('/api/incident/' + id);
    }

    // sends the infomation to make a new incident in the database
    addIncident(incident: Incident, incidentrevision: IncidentRevision): Observable<Incident> {
        return this.http.post<Incident>('/api/incidents', {
            'trackerId': incident.trackerId,
            'type': incidentrevision.type,
            'shortDescription': incidentrevision.shortDescription,
            'longDescription': incidentrevision.longDescription
        }, httpOptions);
    }

    // sends information to the database about an incident to be updated
    updateIncident(incident: Incident, incidentrevision: IncidentRevision): Observable<Incident> {
        return this.http.put<Incident>('/api/incident/' + incident.id, {
            'trackerId': incident.trackerId,
            'type': incidentrevision.type,
            'shortDescription': incidentrevision.shortDescription,
            'longDescription': incidentrevision.longDescription,
            'resolution': incidentrevision.resolution,
            'severity': incidentrevision.severity
        }, httpOptions);
    }
}
