import * as express from 'express';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import UsersController from './users.controller';

export default (app: express.Express): void => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, UsersController.configure));

    app.post('/api/signup', UsersController.signup);

    app.post('/api/login', passport.authenticate('local', { failureRedirect: '/failure' }), UsersController.login);

    app.get('/failure', UsersController.fail);

    app.post('/api/logout', UsersController.logout);

    app.put('/api/user/:id', UsersController.editUser);

    app.get('/api/trackers', UsersController.getTrackers);

    app.get('/api/user', UsersController.getUser);

    app.post('/api/check', UsersController.checkUser);

    app.get('/api/getUser/:id', UsersController.getUserById);
};
