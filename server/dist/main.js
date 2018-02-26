"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const incidents_routes_1 = require("./modules/incidents/incidents.routes");
const app = express();
incidents_routes_1.default(app);
app.listen(3000, () => console.log('app is listening on port 3000'));
