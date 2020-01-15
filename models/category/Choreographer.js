var mongoose = require('mongoose');

var ChoreographerSchema = new mongoose.Schema({

  otherWorkLocation : {type:String},
  travelOtherIndianCities : {type:Boolean},
  packagePricing : { type:String},
  provideBackupDancers :{type:Boolean}

},{_id: false, toJSON: { getters: true }});

module.exports = ChoreographerSchema;
