import db from '../../database/models/index';

 class IncidentController {
    getAllIncidents(req, res) {
        const incidentarr = [];
        db.incidents.findAll({
            where: {
            userId: 1
            }
        }).then(incidents => {
        incidents.forEach(incident => {
            db.incidentrevisions.findOne({
                where: {
                incidentId: incident.id,
                revisionNumber: incident.revisionId
                }
            }).then(revision => {
                incidentarr.push(revision);
            });
            });
            res.send(incidentarr);
        });
    }
    newIncident(req, res) {
        db.incidents.create({
            revisionId: 1,
            userId: 1,
            trackerId: req.body.trackerId
        }).then(incident => {
            db.incidentrevisions.create({
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
    getIncident(req, res, id) {
        db.incidents.findById(req.params['id']).then(incident => {
            db.incidentrevisions.findOne({
              where: {
                incidentId: req.params['id'],
                revisionNumber: req.params['revision']
              }
            }).then(revision => {
              res.send(revision);
            });
        });
    }
    editIncident(req, res, id) {
        //tracker changes everything
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
}

export default new IncidentController();

