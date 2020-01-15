var mongoose = require('mongoose');

var MehndiArtistSchema = new mongoose.Schema({

  otherWorkLocation : {type:String},
  travelOtherIndianCities : {type:Boolean},
  bridalMehndiPrice : { type:Number},
  familyMehndiPrice :{type:Number}

}, {_id: false, toJSON: { getters: true }});

module.exports = MehndiArtistSchema;
