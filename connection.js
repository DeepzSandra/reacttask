'use strict';
/**
 * Description: All database authentication mentioned here.
 */

var mongoose = require('mongoose'),
    config = require('./config');

//require('events').EventEmitter.defaultMaxListeners = Infinity;
require('events').EventEmitter.prototype._maxListeners = Infinity;
var mongoDb = function() {
    if (mongoose.connection.readyState == 0) {
         // mongoose.connect("mongodb://" + config.databases.mongodb.host + ":" + config.databases.mongodb.port + "/" + config.databases.mongodb.database, {
    
      

    }
}

mongoDb();