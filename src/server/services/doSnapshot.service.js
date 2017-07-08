/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const Prices = require('../models/prices.model');

    module.exports = {
        getHttpMethod: function() {
            return 'POST'
        },
        getParameters: function() {
            return []
        },

        /*  creates a snapshot, based on array of stations
         *  @param [array] stations
         *
         */
        execute: function(stations, callback) {

            //  entry in database for every station and price per date
            console.log('invoked');
            console.log(stations);



            callback(
                null,
                //parse data to send to frontend here
                null
            )
        }
    }
}());
