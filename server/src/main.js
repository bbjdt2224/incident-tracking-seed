"use strict";
exports.__esModule = true;
var express = require("express");
var incidents_routes_js_1 = require("./modules/incidents/incidents.routes.js");
var app = express();
//var db  = require('./database/models/index.js')
//var users = require('./modules/users/users.routes.js')
incidents_routes_js_1["default"](app);
// Middleware
// Routes
// connect to db
// set static folder to serve angular app
// app.use(express.static(path.join(__dirname, staticDir)));
app.listen(3000, function () { return console.log('app is listening on port 3000'); });
