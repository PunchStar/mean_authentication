var mongoose = require('mongoose');

var WeddingInvitationSchema = new mongoose.Schema({

  serviceOffered : {
    boxedInvites:{type:Number},
    unboxedInvites:{type:Number},
    digitalECards:{type:Number},
    onlyCardDesign:{type:Number},
    other:{type:Number}
  },
  speciality : {
    traditionalInvitations:{type:Number},
    funkyOfbeatInvitations:{type:Number},
    handmadeCards:{type:Number},
    modernInvites:{type:Number},
    boxedInvitations:{type:Number},
    weddingStationery:{type:Number},
    other:{type:Number}
  },
  shipInvities :{
    noShipping:{type:Number},
    domesticShipping:{type:Number},
    internationalShipping:{type:Number}
  }

},{_id: false, toJSON: { getters: true }});

module.exports = WeddingInvitationSchema;
