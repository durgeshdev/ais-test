/**
 * @package [setup] - Application db configuration
 * @author [durgesh]
 */

'use strict';

/* DB */
var mongoose = require('mongoose');
mongoose.Promise = Promise;

require('../api/models/Employee');

mongoose.connect('mongodb://localhost:27017/ais', {
    useMongoClient: true
  });
var db = mongoose.connection;
db.on('error', function(error){
    console.log('Database connection error',error);
    process.exit();
});
db.once('open', function(callback) {
    console.log('Database connection successful!');
});
/* end DB */

module.exports = db;
