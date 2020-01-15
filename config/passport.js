const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


module.exports = () => {
    const Client = mongoose.model('Client');
    const Vendor = mongoose.model('Vendor');
    // console.log(Client);
    console.log('bb');
    passport.use('client', new LocalStrategy({
        usernameField:'email',
        passwordField: 'hash'
        }, (username, password, done) => {
            console.log('dddd');
            console.log('hash' + username);     
            Client.findOne({'email':username}, (err, client) => {
                if (err) {
                    return done(err);
                }
                if (!client) {
                    return done(null, false, {
                        message: "Incorrect fullname."
                    });
                }
                if (!client.ValidPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return done(null, client);
            });
        })
    );
    passport.use('vendor', new LocalStrategy({
        usernameField:'email',
        passwordField: 'hash'
        }, (username, password, done) => {
            console.log('eeee');
            console.log('hash' + username);     
            Vendor.findOne({'email':username}, (err, vendor) => {
                if (err) {
                    return done(err);
                }
                if (!vendor) {
                    return done(null, false, {
                        message: "Incorrect fullname."
                    });
                }
                if (!vendor.ValidPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return done(null, vendor);
            });
        })
    );
    // console.log('2');
    // passport.use(new GoogleStrategy({
    //     clientID:     '286837487654-mqurj9air21n08au2hfgh8ql8spglshm.apps.googleusercontent.com',
    //     clientSecret: 'sB4YBpuEv-iSaBCTcSEAYDj-',
    //     callbackURL: "http://localhost:5000/auth/client/google/callback",
    //     passReqToCallback   : true
    //   },
    //   function(request, accessToken, refreshToken, profile, done) {
    //     console.log('3');
    //     console.log(profile);
    //     // Client.findOrCreate({ googleId: profile.id }, function (err, client) {
    //     //   return done(err, client);
    //     // });
    //   }
    // ));
};


