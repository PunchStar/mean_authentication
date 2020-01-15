var mongoose = require('mongoose');
jwt = require('jsonwebtoken'),
crypto = require('crypto');

var ClientSchema = new mongoose.Schema({
  fullname: { type: String, required: true,
  }, 
  email:{type:String, required:true},
  phone:{type:Number},
  providerUserID:{type:String,default:'xxx'},
  password: { type: String,
  },
  logtype: { type: Number,
    default:0
  },
  clientLocation:{type:String},
  weddingDate:{type:Date},
  weddingCity:{type:String},
  brideName:{type:String},
  groomName:{type:String},
  position:{type:String},   //iam (bride/groom/friend or family)
  hash: {type: String},
  salt: {type: String}
}, { toJSON: { getters: true }} );

ClientSchema.methods.setPassword = function(password)  {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


ClientSchema.methods.ValidPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

ClientSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  return jwt.sign({
        _id: this._id,
        fullname: this.fullname,
        logtype : this.logtype,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, // 1 Hour
      process.env.JWT_SECRET);
};

module.exports = mongoose.model('Client', ClientSchema);
