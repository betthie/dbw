/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const Snapshots = require('../models/snapshot.model.js');
    const Stations = require('../models/station.model');
    const moment = require('moment');

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
            //  create date
            console.log(stations);
            let date = (function() {
                let dt = new Date;
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
            }());
            //  entry in database for every station and price per date
            for(let i= 0; i < stations.length; i++) {
                let station = Stations.create(stations[i]);
                Stations.save(station, function(err, result) {
                    //  create snapshot
                    let snapshot = Snapshots.create(stations[i], date);
                    Snapshots.save(snapshot, function(err, result) {

                    })
                })
            }
            callback(
                null,
                null
            )
        }
    }
}());
