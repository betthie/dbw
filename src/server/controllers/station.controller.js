/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const bodyParser = require('body-parser');
    const Stations = require('../models/snapshot.model');

    module.exports = function(app) {

        //  parses http body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));


        /*  @description - returns stations based on chosen location and radius
         *  @param {object} req.body got following informations
         *       .location
         *       .radius
         *       .date??
         */
        app.get('/stations', function(req, res) {
            const location = {}; //breite und längengrad einbauen
            const radius = req.body.radius;
            const date = '' // aktuelles Datum einbauen
        });


        /*  @description - returns price trend of a given gas station
        *
        *
        */
        app.get('/trend/:stationId', function(req, res) {
            const stationId = req.params.stationId;
        })

    }


}());

