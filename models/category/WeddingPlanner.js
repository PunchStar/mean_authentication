var mongoose = require('mongoose');

var WeddingPlannerSchema = new mongoose.Schema({

  otherWorkLocation : {type:String},
  citiesPlannedWeddingIn : {type:String},
  destinationWedding:{type:String},
  startingPackagePrice:{type:Number},
  packageDetails:{type:String},
  typeOfPlanningOffer:{type:String},
  serviceOffered:{
    trousseauPreperations:{type:Number},
    DJMusic:{type:Number},
    venueBooking:{type:Number},
    decor:{type:Number},
    photographyServices:{type:Number},
    honeymoon:{type:Number},
    serviceStaff:{type:Number},
    invitations:{type:Number},
    catering:{type:Number},
    PRMediaCoverage:{type:Number},
    gifts:{type:Number},
    celebrityInvites:{type:Number}
  },
  inHouseService:{type:String}

}, {_id: false, toJSON: { getters: true }});

module.exports = WeddingPlannerSchema;
