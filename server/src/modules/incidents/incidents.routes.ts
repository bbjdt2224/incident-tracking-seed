import * as express from 'express';
import * as bodyParser from 'body-parser';

import IncidentController from './incidents.controller';

export default (app: express.Express): void => {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //GET /incidents
  //POST /incidents
  app.route('/incidents')
    .get(IncidentController.getAllIncidents)
    .post(IncidentController.newIncident);

  //GET /incident/(id)
   //PUT /incident/(id)
  app.route('/incident/:id/:revision')
    .get(IncidentController.getIncident)
    .put(IncidentController.editIncident);
};
