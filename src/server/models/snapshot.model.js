/**
 * Created by Willi on 21.06.2017.
 */


(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const snapshotSchema = new Schema({
        date: Date,
        stationId: String,
        diesel: Number,
        e5: Number,
        e10: Number
    });

    // implementing database logic to separate it from controller
    snapshotSchema.statics.create = function (station, date) {
        let newSnapshot = new this(); // <- fetch  model
        newSnapshot.date = date;
        newSnapshot.stationId = station.id;
        newSnapshot.diesel = station.diesel;
        newSnapshot.e5 = station.e5;
        newSnapshot.e10 = station.e10;
        return newSnapshot;
    };


    // save station
    snapshotSchema.statics.save = function (snapshot, callback) {
        let query = {date: snapshot.date, stationId: snapshot.stationId};
        let update = {
            stationId: snapshot.id,
            diesel: snapshot.diesel,
            e5: snapshot.e5,
            e10: snapshot.e10
        };
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        return this.model('Snapshots').findOneAndUpdate(query, update, options, callback)
    };

    snapshotSchema.statics.get = function(query,callback) {
        return this.model('Snapshots').find(query, callback)
    };


    let Snapshots = mongoose.model('Snapshots', snapshotSchema);
    module.exports = Snapshots;

}());


