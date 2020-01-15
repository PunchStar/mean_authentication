var mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    // const url = process.env.MONGO_URI;
    return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/WedDB',{useNewUrlParser: true})  
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};

