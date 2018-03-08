import db from '../../database/models/index';
import * as passport from 'passport';


class UsersController {
    //sets up passport to deal with login authentication
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
    /* POST /signup
    adds new user to database
        email
        isTracker
        password
    */
    signup(req, res) {
        db.users.create({
            email: req.body.email,
            isTracker: req.body.isTracker,
            firstName: 'Insert',
            lastName: 'Name'
        }).then(function(user) {
            user.update ({
                password: user.generateHash(req.body.password)
            });
            res.send(user);
        });
    }
    /* POST /login
    if username and password are correct then redirect to next page
        email
        password
    */
    login(req, res) {
        res.send(req.session.passport.user);
    }
    /* POST /logout
    logout the user
    */
    logout(req, res) {
        req.logout();
        res.send('Logged Out');
        //redirect
    }

    /* PUT /user/:id
    changes the users information
        firstName
        lastName
        role
    */
    editUser(req, res) {
        db.users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
          }, {
            where: {
              id: req.params['id']
            }
        }).then(user => {
            req.session.passport.user.firstName = req.body.firstName;
            req.session.passport.user.lastName = req.body.lastName;
            req.session.passport.user.role = req.body.role;
            res.send(user);
        });
    }

    /* GET /tracker
    gets all the trackers
    */
    getTrackers(req, res) {
        db.users.findAll({
            where: {
                isTracker: 't'
            }
        }).then(function(trackers) {
            res.send(trackers);
        });
    }

    getUser(req, res) {
        res.send(req.session.passport.user);
    }

    checkUser(req, res) {
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
    }
}

export default new UsersController();

