var db = require('/../../database/models/index')

export class UsersController {

    signup(req, res){
        db.users.create({
            email: req.body.email
            //password
        });
    }
    
    login(req, res){
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            //check if password is same as in database
        });
    }
    
    logout(req, res){
        
    }
    
    editUser(req, res, id){
        db.users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
          }, {
            where: {
              id: req.params['id']
            }
        })
    }
}

