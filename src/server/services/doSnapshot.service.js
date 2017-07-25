/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const Snapshots = require('../models/snapshot.model.js');
    const Stations = require('../models/station.model');
    const moment = require('moment');
    const async = require('async');

    module.exports = {
        getHttpMethod: function() {
            return 'POST'
        },
        getParameters: function() {
            return ['stations']
        },

        /*  creates a snapshot, based on array of stations
         *  @param [array] stations
         *
         */
        execute: function(stations, callback) {
            //  create date
            let date = (function() {
                let dt = new Date;
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
            }());
            //  entry in database for every station and price per date
            let tasks = [];
            for(let i = 0; i< stations.length; i++) {
                let station = Stations.create(stations[i]);
                let task = function(callback) {
                    Stations.save(station, function(err, result) {
                        //  create snapshot
                        let snapshot = Snapshots.create(stations[i], date);
                        Snapshots.save(snapshot, function(err, result) {
                            callback();
                        })
                    })
                };
                tasks.push(task);
            }
            //  wait until all promises are finished
            async.parallel(tasks, function (err) {
                if (err) throw err;
                callback(
                    null,
                    null
                )
            })
        }
    }
}());
