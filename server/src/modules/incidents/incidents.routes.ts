import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from  'express-session';

import IncidentController from './incidents.controller';

export default (app: express.Express): void => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
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
