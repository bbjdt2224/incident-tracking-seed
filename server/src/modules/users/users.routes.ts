import * as express from 'express';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import UsersController from './users.controller';

export default (app: express.Express): void => {
  app.use(express.static('public'));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, UsersController.configure));

  app.post('/signup', UsersController.signup);

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), UsersController.login);

  app.post('/logout', UsersController.logout);

  app.put('/user/:id', UsersController.editUser);
};
