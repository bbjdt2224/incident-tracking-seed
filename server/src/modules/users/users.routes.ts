import * as express from 'express';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from  'express-session';

import UsersController from './users.controller';

export default (app: express.Express): void => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(app.router);
  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, UsersController.configure));

  app.post('/api/signup', UsersController.signup);

  app.post('/api/login', passport.authenticate('local', { failureRedirect: '/login' }), UsersController.login);

  app.post('/api/logout', UsersController.logout);

  app.put('/api/user/:id', UsersController.editUser);

  app.get('/api/trackers', UsersController.getTrackers);

  app.get('/api/user', UsersController.getUser);
};
