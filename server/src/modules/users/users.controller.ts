import db from '../../database/models/index';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';


class UsersController {
    //sets up passport to deal with login authentication
    configure(username, password, done) {
        db.users.findOne({ where: { email: username }}).then( function (user) {
            if (!user) { return done(null, false); }

            passport.serializeUser(function(user, done) {
                done(null, user);
            });
            passport.deserializeUser(function(user, done) {
                done(null, user);
            });

            bcrypt.compare(password, user.password, function(err, res) {
                if (res === true) {
                    return done(null, user);
                }
                if (res === false) {
                    return done(null, false);
                }
                return done(null, false);
            });
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
        }).then( user => {
            bcrypt.hash(req.body.password , 10, function(err, hash) {
                user.update ({
                    password: hash
                });
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
    /*If Login fails*/
    fail(req, res) {
        res.send('Wrong');
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
        }).then( trackers => {
            res.send(trackers);
        });
    }

    /* GET /user
    gets the current user
    */
    getUser(req, res) {
        res.send(req.session.passport.user);
    }

    getUserById(req, res) {
        db.users.findById(req.params['id']).then(user => res.send(user));
    }

    /* POST /check
    checks if there is an email in the database
    returns a boolean
    */
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

