const mongoose = require('mongoose');
const db = process.env.MONGO_URL || 'mongodb+srv://putra:detik2019@cluster0-ujm0z.gcp.mongodb.net/detik'

module.exports = function(req, res, next) {
    mongoose.connect(db,{useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true}, function(err, db) {
        if (err) {
            res.status(400).send({'status':false})
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected');
            next();
        }
    });
};
