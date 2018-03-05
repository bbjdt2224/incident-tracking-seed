export class IncidentRevision {
    id: number;
    incidentId: number;
    revisionNumber: number;
    type: string;
    shortDescription: string;
    longDescription: string;
    resolution: string;
    severity: number;
    createdAt: Date;
    updatedAt: Date;
}
