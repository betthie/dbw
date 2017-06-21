/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const stationSchema = new Schema({
        _id: Number,
        name: String,
        brand: String,
        street: String,
        place: String,
        lat: Number,
        lng: Number,
    });

    // following functions implementing database logic to separate it from controller
    stationSchema.statics.create = function(station, callback){
        return this.model('Stations').save(station, callback)
    };

    stationSchema.statics.update = function (callback) {

    };

    stationSchema.statics.delete = function (callback) {

    };

    let Stations = mongoose.model('Stations', stationSchema);
    module.exports = Stations;

}());
