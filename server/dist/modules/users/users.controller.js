"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../database/models/index");
const passport = require("passport");
const bcrypt = require("bcrypt");
class UsersController {
    configure(username, password, done) {
        index_1.default.users.findOne({ where: { email: username } }).then(function (user) {
            if (!user) {
                return done(null, false);
            }
            passport.serializeUser(function (user, done) {
                done(null, user);
            });
            passport.deserializeUser(function (user, done) {
                done(null, user);
            });
            bcrypt.compare(password, user.password, function (err, res) {
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
    signup(req, res) {
        index_1.default.users.create({
            email: req.body.email,
            isTracker: req.body.isTracker,
            firstName: 'Insert',
            lastName: 'Name'
        }).then(user => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                user.update({
                    password: hash
                });
            });
            res.send(user);
        });
    }
    login(req, res) {
        res.send(req.session.passport.user);
    }
    fail(req, res) {
        res.send('Wrong');
    }
    logout(req, res) {
        req.logout();
        res.send('Logged Out');
    }
    editUser(req, res) {
        if (req.session.passport.user) {
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
    }
    getTrackers(req, res) {
        if (req.session.passport.user) {
            index_1.default.users.findAll({
                where: {
                    isTracker: 't'
                }
            }).then(trackers => {
                res.send(trackers);
            });
        }
    }
    getUser(req, res) {
        res.send(req.session.passport.user);
    }
    getUserById(req, res) {
        if (req.session.passport.user) {
            index_1.default.users.findById(req.params['id']).then(user => res.send(user));
        }
    }
    checkUser(req, res) {
        if (req.session.passport.user) {
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
}
exports.default = new UsersController();
