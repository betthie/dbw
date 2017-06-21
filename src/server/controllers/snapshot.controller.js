/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const bodyParser = require('body-parser');
    const Snapshots = require('../models/snapshot.model');

    module.exports = function(app) {

        //  parses http body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));


        /*  creates a snapshot, based on chosen location and radius
        *   req.body {object}
        *       .location
        *       .radius
        *       .date??
        */
        app.post('/snapshot', function(req, res) {

        })

    }


}());

