var mongoose = require('mongoose'),
    passport = require('passport');
const Client = mongoose.model('Client');
exports.register = (req, res) => {
    console.log('aaaa');
    if (!req.body.fullname || !req.body.hash) {
        return res.status(400).json({message: "All fields required"});
    }
    Client.findOne({ fullname: req.body.fullname }).then(client => {
        if (client) {
            return res.status(400).json({ fullname: "client already exists" });
        } else {
            console.log('cccc');
            const client = new Client(req.body);
            client.setPassword(req.body.hash);
            client.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                     console.log(client);
                    const token = client.generateJwt();
                    res.status(200).json("Registered successfully");
                }
            }); 
        }
    });
};
// exports.google = (req,res) =>{
//     console.log('1');
//     passport.authenticate('google', { scope: 
//         [ 'https://www.googleapis.com/auth/plus.login',
//         , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] })
// };
// exports.google_callback = (req, res)=>{
//     console.log('2');
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     // res.redirect('/account');
//     res.status(500).json('ssss');
//   };
// }
exports.google_auth = (req, res) =>{
    console.log('save-0')
    console.log(req.body.providerId);
    Client.findOne({ providerUserID: req.body.providerId,logtype:1 }, function (err, client) {
        if (err) {
            return res.status(400).json('400 error');
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!client) {
            console.log('save-1')
            client = new Client({
                fullname: req.body.fullname,
                email: req.body.email,
                providerUserID: req.body.providerId,
                logtype: 1,
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                // facebook: profile._json
            });
            console.log('save-2')
            client.save(function(err) {
                if (err) console.log(err);
               res.status(200).json({'token':req.body.providerId});  // return done(err, client);
            // res.status(200).json("Google Registered successfully");
                    
            });
        }
        else{
            // const token = client.generateJwt();
            console.log('save-3')
            res.status(200).json({'token':req.body.providerId});  // return done(err, client);
            // res.status(200).json({token});
        }
    });
}
exports.login = (req, res) => {
    console.log('login1');
    if (!req.body.email || !req.body.hash) {
        return res.status(400).json(req.body.email);
    }
    console.log('login2');
    passport.authenticate("client", (err, client, info) => {
        console.log(client);
        let token;
        if (err) {
            console.log('err');
            return res.status(500).json(err);
        }
        if (client) {
            console.log('client');
            token = client.generateJwt();
            res.status(200).json({token});
        } else {
            console.log('login3');
            res.status(401).json(info);
        }
    })(req, res);
};
exports.update = (req,res) => {
    var role = req.type;
    var clientId = req.clientId;
    if (role == 0){
        Client.findById(req.params.id, function(err, client) {
            if (!client)
                res.status(404).send("data is not found");
            else
                Object.assign(client, req.body);
                client.setPassword(req.body.hash);
                client.save().then(client => {
                    res.json('client updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    }
    else{
        if (clientId == req.params.id){
            Client.findById(req.params.id, function(err, client) {
                if (!client)
                    res.status(404).send("data is not found");
                else
                    Object.assign(client, req.body);
                    client.setPassword(req.body.hash);
                    client.save().then(client => {
                        res.json('client updated!');
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            });
        }
        else {
             res.json('You are not owner of this profile. So you cannot update');
        }
    }    
};
exports.delete = (req,res) => {
    var clientId = req.clientId;
    var role = req.type;
    if (role == 0){
        Client.findByIdAndRemove({_id: req.params.id}, function(err, business){
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
    }
    else if(role == 2){
        if(clientId == req.params.id){
            Client.findByIdAndRemove({_id: req.params.id}, function(err, business){
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
    var role = req.logtype;
    // console.log(req.userId)
    if (role == 0){
        Client.findById(req.userId, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);    
        });
    }
    else{
        // res.json('you are not admin , cannot access !');
        console.log('abc')
        // console.log(req.headers.token)
        Client.findOne({ providerUserID: req.providerId}, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);    
        });
    }
}