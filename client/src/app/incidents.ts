import { IncidentRevision } from './incidentrevisions';
export class Incident {
    id: number;
    revisionid: number;
    userId: number;
    trackerId: number;
    createdAt: Date;
    updatedAt: Date;
    incidentrevisions: IncidentRevision[];
}
