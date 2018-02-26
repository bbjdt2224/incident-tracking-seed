"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsersController = require('./users.controller');
exports.default = (app) => {
    app.post('/signup', UsersController.signup());
    app.post('/login', UsersController.login());
    app.post('/logout', UsersController.logout());
    app.put('/user/:id', UsersController.editUser());
};
