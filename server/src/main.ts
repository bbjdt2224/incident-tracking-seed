import * as express from 'express';
import incidents from './modules/incidents/incidents.routes';
import users from './modules/users/users.routes';

const app: express.Express = express();

//var db  = require('./database/models/index.js')

//var users = require('./modules/users/users.routes.js')

incidents(app);
users(app);

// Middleware

// Routes

// connect to db

// set static folder to serve angular app
// app.use(express.static(path.join(__dirname, staticDir)));


app.listen(3000, () => console.log('app is listening on port 3000'));
