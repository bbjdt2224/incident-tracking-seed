"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const users_controller_1 = require("./users.controller");
exports.default = (app) => {
    app.use(express.static('public'));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, users_controller_1.default.configure));
    app.post('/signup', users_controller_1.default.signup);
    app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), users_controller_1.default.login);
    app.post('/logout', users_controller_1.default.logout);
    app.put('/user/:id', users_controller_1.default.editUser);
};
