import { Component, OnInit } from '@angular/core';
import { Incident } from '../incidents';
import { IncidentRevision } from '../incidentrevisions';
import { IncidentsService } from '../incidents.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-incidents',
    templateUrl: './incidents.component.html',
    styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

    // array of all incidents for this user
    incidents: Incident[];
    // the current user
    user: User;
    // number of security weaknesses
    weakness = 0;
    // number of minor incidents
    minor = 0;
    // number of major incidents
    major = 0;
    // number of unresolved incidents
    unresolved = 0;
    // number of new incidents
    newincidents = 0;
    // value of search bar
    search = '';

    constructor(
        private incidentService: IncidentsService,
        private userService: UserService,
        private router: Router
    ) { }

    // gets the current user and all incidents for this user
    ngOnInit() {
        this.getUser();
        this.getIncidents();
    }

    //  gets an array of incidetns and sets it to this incidents array then counts the diffrent types of incidents
    getIncidents(): void {
        this.incidentService.getIncidents()
            .subscribe(incidents => {
                this.incidents = incidents;
                this.count();
            });
    }

    // gets the current user and if there is no user redirect to login
    getUser(): void {
        this.userService.getUser().subscribe(user => {
            if (!user) {
                this.redirect();
            }
            this.user = user;
        });
    }

    // redirect ot login
    redirect() {
        this.router.navigate(['/login']);
    }

    // counts the number of weaknesses, minor incidents, major incidents, unresolved incidents, and new incidents
    count() {
        this.incidents.forEach(incident => {
            if (incident.incidentrevisions[this.findRevision(incident)].severity === 1) {
                this.weakness++;
            }
            if (incident.incidentrevisions[this.findRevision(incident)].severity === 2) {
                this.minor++;
            }
            if (incident.incidentrevisions[this.findRevision(incident)].severity === 3) {
                this.major++;
            }
            if (!incident.incidentrevisions[this.findRevision(incident)].severity) {
                this.newincidents++;
            }
            if (!incident.incidentrevisions[this.findRevision(incident)].resolution) {
                this.unresolved++;
            }
        });
    }

    // finds the most recent revision number of a given incident
    findRevision(incident: Incident): number {
        let id = 0;
        let index = 0;
        let counter = 0;
        incident.incidentrevisions.forEach(revision => {
            if (revision.revisionNumber > id) {
                id = revision.revisionNumber;
                index = counter;
            }
            counter++;
        });
        return index;
    }

    // returns a date object of a given datetime string
    getDate(timestamp: string): Date {
        const date = new Date(timestamp);
        return date;
    }

    // returns the string representation of a give severity number
    getSeverity(severity: number): string {
        switch (severity) {
            case 1:
                return 'Security Weakness';
            case 2:
                return 'Minor Incident';
            case 3:
                return 'Major Incident';
            default:
                return '';
        }
    }

    // returns the class that colors the severity value
    getSeverityClass(severity: number): string {
        switch (severity) {
            case 1:
                return 'success';
            case 2:
                return 'warning';
            case 3:
                return 'danger';
            default:
                return '';
        }
    }

    // returns the class that colors the row of the table
    rowClass(incident: Incident): string {
        if (this.user.isTracker) {
            if (!incident.incidentrevisions[this.findRevision(incident)].severity) {
                return 'info-row';
            } else {
                if (!incident.incidentrevisions[this.findRevision(incident)].resolution) {
                    return 'primary-row';
                }
            }
        }
        return '';
    }
}
