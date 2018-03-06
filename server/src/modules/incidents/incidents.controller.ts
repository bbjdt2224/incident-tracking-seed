import db from '../../database/models/index';

 class IncidentController {
     /*GET /incidents
     if user gets all incidents that user submitted
     if tracker gets all incidents that are assigned to them
    */
    getAllIncidents(req, res) {
        const incidentarr = [];
        //if(req.user) {
            //user
            if(req.session.passport.user.isTracker === false) {
                db.incidents.findAll({
                    where: {
                    userId: req.session.passport.user.id
                    },
                    include: [
                        db.incidentrevisions
                    ]
                }).then(incidents => {
                    res.send(incidents);
                });
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
                    ]
                }).then(incidents => {
                    res.send(incidents);
                });
            }
        //}
    }
    /* POST /incidents
    inserts a new incident with above information into database
        trackerId
        type
        shortDescription
        longDescription
    */
    newIncident(req, res) {
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
            }).then(function(revision) {
              return revision.setIncident(incident);
            });
        });
        res.send('Done');
    }
    /* GET /incident/:id
    gets an incident by id
    gets revision by incident
    rerurns incident
    */
    getIncident(req, res) {
        db.incidents.findOne({where: {id: req.params['id']}, include: [db.incidentrevisions]}).then(incident => {
            // db.incidentrevisions.findOne({
            //   where: {
            //     incidentId: incident.id,
            //     revisionNumber: incident.revisionId
            //   }
            // }).then(revision => {
            //   res.send(revision);
            // });
            res.send(incident);
        });
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
        shorDescription
        longDescription
        resolution
        severity
        trackerId
    */
    editIncident(req, res) {
        //if(req.user) {
            //user
            if(req.session.passport.user.isTracker === false) {
                db.incidents.findById(req.params['id']).then(incident => {
                    db.incidentrevisions.findOne({
                        where: {
                        incidentId: incident.id,
                        revisionNumber: incident.revisionId
                        }
                    }).then(revision => {
                        db.incidentrevisions.create({
                            incidentId: revision.incidentId,
                            revisionNumber: revision.revisionNumber+1,
                            type: req.body.type,
                            shortDescription: req.body.shortDescription,
                            longDescription: req.body.longDescription
                        });
                        db.incidents.update({
                            revisionId: revision.revisionNumber+1,
                            trackerId: req.body.trackerId
                        },{
                            where: {
                            id: req.params['id']
                            }
                        });
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
                        db.incidentrevisions.create({
                            incidentId: revision.incidentId,
                            revisionNumber: revision.revisionNumber+1,
                            type: req.body.type,
                            shortDescription: req.body.shortDescription,
                            longDescription: req.body.longDescription,
                            resolution: req.body.resolution,
                            severity: req.body.severity
                        });
                        db.incidents.update({
                            revisionId: revision.revisionNumber+1,
                            trackerId: req.body.trackerId
                        },{
                            where: {
                            id: req.params['id']
                            }
                        });
                    });
                });
            }
        //}
    }
}

export default new IncidentController();

