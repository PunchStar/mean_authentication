var mongoose = require('mongoose'),
    passport = require('passport');
const BridalDesigner = mongoose.model('BridalDesigner');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    BridalDesigner.findOne({email:req.body.email}).then(bridal =>{
        if(bridal){
            return res.status(400).json({email:'bridal designer already exists'});
        }else{
           const bridal = new BridalDesigner(req.body);
           bridal.setPassword(req.body.hash);
           bridal.status = 'false';
           bridal.save((err) =>{
               if(err){
                   res.status(401).json(err);
               }else{
                   res.status(200).json({result:'successfully created!'});
               }
           }); 
        }
    })
};

exports.update = (req,res) => {
    // role = req.type;
    userId = req.userId;
    BridalDesigner.findById(req.params.id, function(err, car) {
            if(role == 2){
                if(car.owner == req.userId){ // identify that user is owner of this model
                    Object.assign(car, req.body);
                    car.save((err) => {
                        if (err) {
                            res.status(404).json(err);
                        } else {
                            res.status(200).json({result:"successfully Updated!"});
                        }
                    });
                }
                else{
                    res.json('This is not your admodel,so you cannot update it');
                }
            }
            else{
                Object.assign(car, req.body);
                car.save((err) => {
                    if (err) {
                        res.status(404).json(err);
                    } else {
                        res.status(200).json({result:"successfully Updated!"});
                    }
                });
            }
    });
};

exports.delete = (req,res) => {
    // var role = req.type;
    // var userId = req.userId;
    // if(role == 0){
    //     Car.findByIdAndRemove({_id: req.params.id}, function(err, business){
    //         if(err) res.json(err);
    //         else res.json('Successfully removed');
    //     });
    // }
    // else if(role == 2){
    //     Car.findById(req.params.id, function(err, car) {
    //         if (userId == car.owner){
    //             Car.findByIdAndRemove({_id: req.params.id}, function(err, business){
    //                 if(err) res.json(err);
    //                 else res.json('Successfully removed');
    //             });
    //         }
    //         else{
    //             res.json('this model is not yours , so you cannot delete it')
    //         }
    //     });  
    // }
    // else{
    //     res.json('you are not admin, u are not allowed to delete it');
    // }

};

