var mongoose = require('mongoose'),
    passport = require('passport');
const Vendor = mongoose.model('Vendor');
var BridalDesigner = require("./category/BridalDesigner.Controller");
var BridalMakeupArtist = require("./category/BridalMakeupArtist.Controller");
var Choreographer = require("./category/Choreographer.Controller");
var MehndiArtist = require("./category/MehndiArtist.Controller");
var Photographer = require("./category/Photographer.Controller");
var Venue = require("./category/Venue.Controller");
var WeddingDecorator = require("./category/WeddingDecorator.Controller");
var WeddingInvitation = require("./category/WeddingInvitation.Controller");
var WeddingPlanner = require("./category/WeddingPlanner.Controller");
var WeddingVideoGraph = require("./category/WeddingVideoGraph.Controller");
exports.create = (req, res) => {
    var type = req.body.type;
    if( type == 'BridalDesigner'){
        BridalDesigner.create(req, res);
    }
    else if (type =='BridalMakeupArtist'){
        BridalMakeupArtist.create(req, res);
    }
    else if (type =='Choreographer'){
        Choreographer.create(req, res);
    }
    else if (type =='MehndiArtist'){
        MehndiArtist.create(req, res);
    }
    else if (type =='Photographer'){
        Photographer.create(req, res);
    }
    else if (type =='Venue'){
        Venue.create(req, res);
    }
    else if (type =='WeddingDecorator'){
        WeddingDecorator.create(req, res);
    }
    else if (type =='WeddingInvitation'){
        WeddingInvitation.create(req, res);
    }
    else if (type =='WeddingPlanner'){
        WeddingPlanner.create(req, res);
    }
    else if (type =='WeddingVideograph'){
        WeddingVideoGraph.create(req, res);
    }else{
        res.json('sorry, this type is not exist');
    }
}
exports.register = (req, res) => {
    if (!req.body.username || !req.body.hash) {
        return res.status(400).json({message: "All fields required"});
    }
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "user already exists" });
        } else {
            const user = new User(req.body);
            user.setPassword(req.body.hash);
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    const token = user.generateJwt();
                    res.status(200).json("Registered successfully");
                }
            }); 
        }
    });
};

exports.login = (req, res) => {
    console.log('login1');
    if (!req.body.email || !req.body.hash) {
        return res.status(400).json(req.body.email);
    }
    console.log('login2');
    passport.authenticate("vendor", (err, vendor, info) => {
        let token;
        if (err) {
            console.log('err');
            return res.status(500).json(err);
        }
        if (vendor) {
            console.log('vendor');
            token = vendor.generateJwt();
            res.status(200).json({token});
        } else {
            console.log('login3');
            res.status(401).json(info);
        }
    })(req, res);
};
exports.update = (req,res) => {
    var type = req.body.type;
    if( type == 'BridalDesigner'){
        BridalDesigner.update(req, res);
    }
    else if (type =='BridalMakeupArtist'){
        BridalMakeupArtist.update(req, res);
    }
    else if (type =='Choreographer'){
        Choreographer.update(req, res);
    }
    else if (type =='MehndiArtist'){
        MehndiArtist.update(req, res);
    }
    else if (type =='Photographer'){
        Photographer.update(req, res);
    }
    else if (type =='Venue'){
        Venue.update(req, res);
    }
    else if (type =='WeddingDecorator'){
        WeddingDecorator.update(req, res);
    }
    else if (type =='WeddingInvitation'){
        WeddingInvitation.update(req, res);
    }
    else if (type =='WeddingPlanner'){
        WeddingPlanner.update(req, res);
    }
    else if (type =='WeddingVideograph'){
        WeddingVideoGraph.update(req, res);
    }else{
        res.json('sorry, this type is not exist');
    }
};
exports.delete = (req,res) => {
    var userId = req.userId;
    var role = req.type;
    if (role == 0){
        User.findByIdAndRemove({_id: req.params.id}, function(err, business){
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
    }
    else if(role == 2){
        if(userId == req.params.id){
            User.findByIdAndRemove({_id: req.params.id}, function(err, business){
                if(err) res.json(err);
                else res.json('Successfully removed');
            });
        }
        else {
            res.json('You are not owner of this profile. You are not permited');
        }
    }
    else{
        res.json('you are not permited , cannot delete !');
    }
};
exports.findById = (req,res) => {
    var role = req.type;
    if (role == 0){
        User.findById(req.params.id, function(err, user) {
            if (!user)
                res.status(500).send("data is not found");
            else
                res.status(200).json(user);    
        });
    }
    else{
        res.json('you are not admin , cannot access !');
    }
}
exports.uploadImgs = (req, res,next)=>{
    console.log(req.userId);
    const files = req.files;
    console.log(files);
    if(!files){
        // const error = new Error('no file')
        // error.httpStatusCode = 400
        // return next(errr)
        console.log('sss')
    }
    // return res.send({status:'ok'})
    res.send({results:files});
    // console.log(file);
}
exports.uploadImg = (req, res,next)=>{
    const file = req.file
    console.log(file.filename);
    if(!file){
        console.log('sss')
    }
    console.log(file);
}