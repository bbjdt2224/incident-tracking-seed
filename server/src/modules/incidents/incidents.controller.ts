import db from '../../database/models/index';

export class IncidentController {
    constructor (){

    }
    getAllIncidents(req, res){
        var incidentarr = [];
        db.incidents.findAll({
            where: {
            userId: 1
            }
        }).then(incidents =>{
        incidents.forEach(incident => {
            db.incidentrevisions.findOne({
                where: {
                incidentId: incident.id,
                revisionNumber: incident.revisionId
                }
            }).then(revision =>{
                incidentarr.push(revision)
            })
            })
        })
    }
    
    newIncident(req, res){
        db.incidents.create({
            revisionId: 1,
            userId: req.body.userId,
            trackerId: req.body.trackerId
        }).then(incident => {
            db.incidentrevisions.create({
                revisionNumber: '1',
                type: req.body.type,
                shortDescription: req.body.shortDescription,
                longDescription: req.body.longDescription
            }).then(function(revision){
              return revision.setIncident(incident)
            })
        })
        res.send("Done")
    }
    
    getIncident(req, res, id){
        db.incidents.findById(req.params['id']).then(incident => {
            db.incidentrevisions.findOne({
              where: {
                incidentId: incident.id,
                revisionNumber: incident.revisionId
              }
            }).then(revision => {
              res.send(revision)
            })
        })
    }
    
    editIncident(req, res, id){
        var pastRevision;
        db.incidents.findById(req.params['id']).then(incident => {
          db.incidentrevisions.findOne({
            where: {
              incidentId: incident.id,
              revisionNumber: incident.revisionId
            }
          }).then(revision => {
            pastRevision = revision
          })
        })
      
        db.incidentrevisions.create({
          revisionNumber: pastRevision.revisionNumber+1,
          type: req.body.type,
          shortDescription: req.body.shortDescription,
          longDescription: req.body.longDescription
        })
      
        db.incidents.update({
          revisionId: pastRevision.revisionNumber+1,
          trackerId: req.body.trackerId
        },{
          where: {
            id: req.params['id']
          }
        })
    }
}
