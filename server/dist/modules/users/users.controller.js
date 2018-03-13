"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../database/models/index");
const passport = require("passport");
class UsersController {
    configure(username, password, done) {
        index_1.default.users.findOne({ where: { email: username } }).then(function (user) {
            console.log(user.verifyPassword(user.generateHash(password)));
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(user.generateHash(password))) {
                return done(null, false);
            }
            passport.serializeUser(function (user, done) {
                done(null, user);
            });
            passport.deserializeUser(function (user, done) {
                index_1.default.users.findById(user.id, function (err, user) {
                    done(err, user);
                });
            });
            return done(null, user);
        });
    }
    signup(req, res) {
        index_1.default.users.create({
            email: req.body.email,
            isTracker: req.body.isTracker,
            firstName: 'Insert',
            lastName: 'Name'
        }).then(function (user) {
            user.update({
                password: user.generateHash(req.body.password)
            });
            res.send(user);
        });
    }
    login(req, res) {
        res.send(req.session.passport.user);
    }
    logout(req, res) {
        req.logout();
        res.send('Logged Out');
    }
    editUser(req, res) {
        index_1.default.users.update({
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
    getTrackers(req, res) {
        index_1.default.users.findAll({
            where: {
                isTracker: 't'
            }
        }).then(function (trackers) {
            res.send(trackers);
        });
    }
    getUser(req, res) {
        res.send(req.session.passport.user);
    }
    checkUser(req, res) {
        index_1.default.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.send(true);
            }
            else {
                res.send(false);
            }
        });
    }
}
exports.default = new UsersController();
