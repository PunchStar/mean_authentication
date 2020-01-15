var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  propertyType: { type: String, required: true}, //5star hotel, banquest hall
  chargeWay:{type:String},
  nameOfArea:{type:String},
  typeOfArea:{type:String}, //indoor, outdoor, ...
  floatingCapacity:{type:String},
  fixedCapacity:{type:String},
  roosAvaliable : {type:Boolean},
  foodPolicy:{
    foodProvidedByVenue:{type:Number},
    outsideCatererAllowed:{type:Number},
  },
  decorationPolicy:{
    fixedDecorationAvailable:{type:Number},
    decoratorsOnPanel:{type:Number},
    outsideDecoratorAllowed:{type:Number},
  },
  DJPolicy:{type:Boolean},
  alcoholPolicy:{type:Boolean},
  additionalFacilities:{
    electricityBackup:{type:Number},
    airConditioned:{type:Number},
    restaurant:{type:Number},
    bar:{type:Number},
    conferenceCenter:{type:Number},
    wifi:{type:Number},
    spa:{type:Number},
    valletParking:{type:Number},
    bridalRoom:{type:Number},
    airportPickupDrop:{type:Number},
    conciergeServices:{type:Number},
    pool:{type:Number},
    parking:{type:Number},
  },
  parkingFacility:{type:String}
}, {_id: false, toJSON: { getters: true }});

module.exports = VenueSchema;
