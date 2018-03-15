"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const LocalStrategy = require("passport-local");
const users_controller_1 = require("./users.controller");
exports.default = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, users_controller_1.default.configure));
    app.post('/api/signup', users_controller_1.default.signup);
    app.post('/api/login', passport.authenticate('local', { failureRedirect: '/failure' }), users_controller_1.default.login);
    app.get('/failure', users_controller_1.default.fail);
    app.post('/api/logout', users_controller_1.default.logout);
    app.put('/api/user/:id', users_controller_1.default.editUser);
    app.get('/api/trackers', users_controller_1.default.getTrackers);
    app.get('/api/user', users_controller_1.default.getUser);
    app.post('/api/check', users_controller_1.default.checkUser);
    app.get('/api/getUser/:id', users_controller_1.default.getUserById);
};
