/**
 * Created by Willi on 30.06.2017.
 */


(function() {
    'use strict';

    const Stations = require('../models/snapshot.model');

    module.exports = {

        /*  sendet Tankstationen anhand von Location und Radius
         *  @param {object} request
         *       .location
         *       .radius
         *       .date
         */
        execute: function(request, callback) {

            // http request an tankerkönig api
            //
            callback(
                null,
                //parse data to send to frontend here
                null
            )
        }
    }

}());