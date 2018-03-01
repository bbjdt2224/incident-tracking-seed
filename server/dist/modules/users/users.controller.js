"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../database/models/index");
const passport = require("passport");
class UsersController {
    configure(username, password, done) {
        index_1.default.users.findOne({ where: { email: username } }).then(function (user) {
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(user.password)) {
                return done(null, false);
            }
            passport.serializeUser(function (user, done) {
                done(null, user);
            });
            passport.deserializeUser(function (user, done) {
                done(null, user);
            });
            return done(null, user);
        });
    }
    signup(req, res) {
        index_1.default.users.create({
            email: req.body.email,
            isTracker: req.body.isTracker
        }).then(function (user) {
            user.update({
                password: user.generateHash(req.body.password)
            });
        });
        res.send('Added New User');
    }
    login(req, res) {
        res.send('Logged In');
    }
    logout(req, res) {
        req.logout();
        res.send('Logged Out');
    }
    editUser(req, res, id) {
        index_1.default.users.update({
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
exports.default = new UsersController();
