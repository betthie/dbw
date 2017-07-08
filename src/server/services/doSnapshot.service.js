/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const Prices = require('../models/prices.model');
    const Stations = require('../models/station.model');

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
            for(let i= 0; i < stations.length; i++) {
                let station = Stations.createStation(stations[i]);
                Stations.saveStation(station, function(err, record) {
                })
            }

            callback(
                null,
                //parse data to send to frontend here
                null
            )
        }
    }
}());
