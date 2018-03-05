import { Injectable } from '@angular/core';
import { Incident } from './incidents';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Incidents } from './testfile';

@Injectable()
export class IncidentsService {

  getIncidents(): Observable<Incident[]> {
    return of(Incidents);
  }

  getIncident(id: number): Observable<Incident> {
    return of(Incidents.find(incident => incident.id === id));
  }

  addIncident(incident: Incident): void {
    Incidents.push(incident);
  }

}
