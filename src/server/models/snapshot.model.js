/**
 * Created by Willi on 21.06.2017.
 */


(function() {
   'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const snapshotSchema = new Schema({
        _id: Number,
        date: Date,
        diesel: Number,
        e5: Number,
        e10: Number
    });

    // following functions implementing database logic to separate it from controller
    snapshotSchema.statics.create = function(callback){
        return this.model('Records').find({}, callback)
    };

    snapshotSchema.statics.update = function (callback) {

    };

    snapshotSchema.statics.delete = function (callback) {

    };

    let Snaphots = mongoose.model('Snaphots', snapshotSchema);
    module.exports = Snaphots;

}());


