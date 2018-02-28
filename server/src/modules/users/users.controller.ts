import db from '../../database/models/index';
import * as passport from 'passport';


class UsersController {

    configure(username, password, done) {
        db.users.findOne({ where: { email: username }}).then( function (user) {
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(user.password)) { return done(null, false); }
            passport.serializeUser(function(user, done) {
                done(null, user);
            });
            passport.deserializeUser(function(user, done) {
                done(null, user);
            });
            return done(null, user);
        });
    }

    signup(req, res) {
        db.users.create({
            email: req.body.email
        }).then(function(user) {
            user.update ({
                password: user.generateHash(req.body.password)
            });
        });
        res.send('Added New User');
    }
    login(req, res) {
        res.send('Logged In');
        //redirect
    }
    logout(req, res) {
        //logout
    }
    editUser(req, res, id) {
        db.users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
          }, {
            where: {
              id: req.params['id']
            }
        });
        res.send('User Edited');
    }
}

export default new UsersController();

