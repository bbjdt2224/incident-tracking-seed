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
    styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {

    // a new incident object to hold the new incident information
    incident: Incident = new Incident;
    // a new incident revision object to hold the new incident information
    incidentrevision: IncidentRevision = new IncidentRevision;
    // an array of all trackers
    trackers: User[];
    // the current user
    user: User;

    constructor(
        private incidentService: IncidentsService,
        private location: Location,
        private userService: UserService,
        private router: Router
    ) { }

    // gets the array of trackers
    ngOnInit() {
        this.getTracker();
    }

    // calls the add incident function in the incident service
    addIncident(): void {
        this.incidentService.addIncident(this.incident, this.incidentrevision).subscribe(() => this.goBack());
    }

    // gets the array of trackers
    getTracker() {
        this.userService.getTrackers().subscribe(trackers => this.trackers = trackers);
    }

    // redirects to incidents
    goBack(): void {
        this.router.navigate(['/incidents']);
    }



}
