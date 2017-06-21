/**
 * Created by Willi on 21.06.2017.
 */

//  create our app w/ express
const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');


//  connect controllers
const app = express();
const snapshotController = require('controllers/snapshot.controller');
const stationController = require('controllers/station.controller');
snapshotController(app);
stationController(app);


//  set port
const port = process.env.PORT || 8080;
app.listen(port);
app.use(express.static('../webclient'));

mongoose.connect(config.getDbConnectionString());
