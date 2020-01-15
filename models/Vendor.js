var mongoose = require('mongoose');
var VenueSchema = require('./category/Venue');
var BridalDesignerSchema = require('./category/BridalDesigner');
var BridalMakeupArtistSchema = require('./category/BridalMakeupArtist');
var ChoreographerSchema = require('./category/Choreographer');
var MehndiArtistSchema = require('./category/MehndiArtist');
var PhotographerSchema = require('./category/Photographer');
var WeddingDecoratorSchema = require('./category/WeddingDecorator');
var WeddingInvitationSchema = require('./category/WeddingInvitation');
var WeddingPlannerSchema = require('./category/WeddingPlanner');
var WeddingVideoGraphSchema = require('./category/WeddingVideoGraph');
jwt = require('jsonwebtoken'),
crypto = require('crypto');

var VendorSchema = new mongoose.Schema({
  brandname: { type: String }, 
  email:{type:String, required:true},
  phone:{type:Number},
  providerUserID:{type:String,default:'xxx'},
  password: { type: String },
  logtype: { type: Number,default:0},
  introduction:{type:String},
  workingSince:{type:Number},
  noWeddingCovered:{type:Boolean},
  websiteUrl:{type:String},
  facebookPageLink:{type:String},
  instagramPageLink:{type:String},
  contactPersonName:{type:String},
  anotherNumber:{type:Number},
  businessAddress:{type:String},
  businessCity:{type:String},   
  area:{type:String},   
  pincode:{type:String},   
  pastworkPhotos:[String],   
  pastworkVideos:[String],   
  advanceForBooking:{type:String},   
  paymentOnEventDate:{type:String},   
  paymentOnDelivery:{type:String},   
  cancellationPolicy:{type:String},   
  trialPolicy:{type:String},   
  hash: {type: String},
  salt: {type: String},
  status:{type:String}
},  {discriminatorKey: 'type', toJSON: { getters: true }});

VendorSchema.methods.setPassword = function(password)  {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


VendorSchema.methods.ValidPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

VendorSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  return jwt.sign({
        _id: this._id,
        logtype : this.logtype,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, // 1 Hour
      process.env.JWT_SECRET);
};
var VendorModel = mongoose.model('Vendor', VendorSchema);
const Venue =VendorModel.discriminator("Venue", new mongoose.Schema(VenueSchema));
const BridalDesigner =VendorModel.discriminator("BridalDesigner", new mongoose.Schema(BridalDesignerSchema));
const BridalMakeupArtist =VendorModel.discriminator("BridalMakeupArtist", new mongoose.Schema(BridalMakeupArtistSchema));
const Choreographer =VendorModel.discriminator("Choreographer", new mongoose.Schema(ChoreographerSchema));
const MehndiArtist =VendorModel.discriminator("MehndiArtist", new mongoose.Schema(MehndiArtistSchema));
const Photographer =VendorModel.discriminator("Photographer", new mongoose.Schema(PhotographerSchema));
const WeddingDecorator =VendorModel.discriminator("WeddingDecorator", new mongoose.Schema(WeddingDecoratorSchema));
const WeddingInvitation =VendorModel.discriminator("WeddingInvitation", new mongoose.Schema(WeddingInvitationSchema));
const WeddingPlanner =VendorModel.discriminator("WeddingPlanner", new mongoose.Schema(WeddingPlannerSchema));
const WeddingVideoGraph =VendorModel.discriminator("WeddingVideoGraph", new mongoose.Schema(WeddingVideoGraphSchema));

// module.exports = mongoose.model('Vendor', VendorSchema);
module.exports = VendorModel;
module.exports = Venue;
module.exports = BridalDesigner;
module.exports = BridalMakeupArtist;
module.exports = MehndiArtist;
module.exports = Choreographer;
module.exports = Photographer;
module.exports = WeddingDecorator;
module.exports = WeddingInvitation;
module.exports = WeddingPlanner;
module.exports = WeddingVideoGraph;