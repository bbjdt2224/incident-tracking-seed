import * as express from 'express';

var UsersController = require('./users.controller')

export default (app: express.Express): void => {
    app.post('/signup', UsersController.signup())
      
      app.post('/login', UsersController.login())
      
      app.post('/logout', UsersController.logout())

      app.put('/user/:id', UsersController.editUser())
};
