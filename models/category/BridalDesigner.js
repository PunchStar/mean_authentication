var mongoose = require('mongoose');

var BridalDesignerSchema = new mongoose.Schema({
  chooseTypeOfStore : {type:String},
  speciality : {
    readyToPurchaseOutfits:{type:Number},
    samplePiecesOnOrders:{type:Number},
    designedOutfitsFromScratch:{type:Number},
  },
  outfitsOffer :{
    bridalLehengas:{type:Number},
    lightLehengas:{type:Number},
    growns:{type:Number},
    anarkalisSuits:{type:Number},
    sareers:{type:Number},
    indoWestern:{type:Number}
  }
},{_id: false, toJSON: { getters: true }});
module.exports = BridalDesignerSchema;
