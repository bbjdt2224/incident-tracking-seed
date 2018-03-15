import db from '../../database/models/index';
import * as Sequelize from 'sequelize';

 class IncidentController {
     /*GET /incidents
     if user gets all incidents that user submitted
     if tracker gets all incidents that are assigned to them
    */
    getAllIncidents(req, res) {
        if(req.session.passport.user) {
            //user
            if(req.session.passport.user.isTracker === false) {
                db.incidents.findAll({
                    where: {
                    userId: req.session.passport.user.id
                    },
                    include: [
                        db.incidentrevisions
                    ],
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }).then(incidents => {
                    res.send(incidents);
                }, error => {res.send(error); });
            }
            //tracker
            else {
                db.incidents.findAll({
                    where: {
                    trackerId: req.session.passport.user.id
                    }
                    ,
                    include: [
                        db.incidentrevisions
                    ],
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }).then(incidents => {
                    res.send(incidents);
                }, error => {res.send(error); });
            }
        }
    }
    /* POST /incidents
    inserts a new incident with above information into database
        trackerId
        type
        shortDescription
        longDescription
    */
    newIncident(req, res) {
        if(req.session.passport.user) {
            db.incidents.create({
                revisionId: 1,
                userId: req.session.passport.user.id,
                trackerId: req.body.trackerId
            }).then(incident => {
                db.incidentrevisions.create({
                    incidentId: '0',
                    revisionNumber: '1',
                    type: req.body.type,
                    shortDescription: req.body.shortDescription,
                    longDescription: req.body.longDescription
                }).then( revision => {
                    revision.setIncident(incident);
                    res.send(incident);
                }, error => {res.send(error); });
            });
        }
    }
    /* GET /incident/:id
    gets an incident by id
    gets revision by incident
    rerurns incident
    */
    getIncident(req, res) {
        if(req.session.passport.user) {
            db.incidents.findOne({
                where: {
                    id: req.params['id']
                },
                include: [db.incidentrevisions]
            }).then(incident => {
                res.send(incident);
            }, error => {res.send(error); });
        }
    }
    /* PUT /incident/:id
    updates an existing incident based on id
    user:
        type
        shortDescription
        longDescription
        trackerId
    tracker:
        type
        shortDescription
        longDescription
        resolution
        severity
        trackerId
    */
    editIncident(req, res) {
        if(req.session.passport.user) {
            //user
            if(req.session.passport.user.isTracker === false) {
                db.incidents.findById(req.params['id']).then(incident => {
                    db.incidentrevisions.findOne({
                        where: {
                        incidentId: incident.id,
                        revisionNumber: incident.revisionId
                        }
                    }).then(revision => {
                        Promise.all([
                            db.incidentrevisions.create({
                                incidentId: revision.incidentId,
                                revisionNumber: revision.revisionNumber+1,
                                type: req.body.type,
                                shortDescription: req.body.shortDescription,
                                longDescription: req.body.longDescription
                            }),
                            db.incidents.update({
                                revisionId: revision.revisionNumber+1,
                                trackerId: req.body.trackerId
                            },{
                                where: {
                                id: req.params['id']
                                }
                            })
                        ]).then(success => {res.send(success);}, error => {res.send(error);} ).catch();
                    });
                });
            }
            //tracker
            else {
                db.incidents.findById(req.params['id']).then(incident => {
                    db.incidentrevisions.findOne({
                        where: {
                        incidentId: incident.id,
                        revisionNumber: incident.revisionId
                        }
                    }).then(revision => {
                        Promise.all([
                            db.incidentrevisions.create({
                                incidentId: revision.incidentId,
                                revisionNumber: revision.revisionNumber+1,
                                type: req.body.type,
                                shortDescription: req.body.shortDescription,
                                longDescription: req.body.longDescription,
                                resolution: req.body.resolution,
                                severity: req.body.severity
                            }),
                            db.incidents.update({
                                revisionId: revision.revisionNumber+1,
                                trackerId: req.body.trackerId
                            },{
                                where: {
                                id: req.params['id']
                                }
                            })
                        ]).then(success => {res.send(success);}, error => {res.send(error);}).catch();
                    });
                });
            }
        }
    }
}

export default new IncidentController();

