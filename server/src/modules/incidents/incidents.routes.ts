import * as express from 'express';

import {IncidentController} from './incidents.controller';

export default (app: express.Express): void => {

  //GET /incidents 
  app.route('/incidents')
    .get(IncidentController.getAllIncidents)
  
  //POST /incidents
  app.post('/incidents', IncidentController.newIncident)

  //GET /incident/(id)
  app.get('/incident/:id', IncidentController.getIncident)

  //PUT /incident/(id)
  app.put('/incident/:id', IncidentController.editIncident)

};
