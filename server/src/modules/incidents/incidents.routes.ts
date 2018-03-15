import * as express from 'express';

import IncidentController from './incidents.controller';

export default (app: express.Express): void => {
    //GET /incidents
    //POST /incidents
    app.route('/api/incidents')
        .get(IncidentController.getAllIncidents)
        .post(IncidentController.newIncident);

    //GET /incident/(id)
    //PUT /incident/(id)
    app.route('/api/incident/:id')
        .get(IncidentController.getIncident)
        .put(IncidentController.editIncident);
};
