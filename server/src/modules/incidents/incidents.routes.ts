import * as express from 'express';

import IncidentController from './incidents.controller';

export default (app: express.Express): void => {

  //GET /incidents
  //POST /incidents
  app.route('/incidents')
    .get(IncidentController.getAllIncidents)
    .post(IncidentController.newIncident);

  //GET /incident/(id)
   //PUT /incident/(id)
  app.route('/incident/:id')
    .get(IncidentController.getIncident)
    .put(IncidentController.editIncident);
};
