let mongoose = require('mongoose');

const ConnectionString ='mongodb://127.0.0.1:27017/rest-api'

mongoose.connect(ConnectionString,  { useNewUrlParser: true });

let CustomerSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        required : true,
        unique: true
    }
});

module.exports = mongoose.model('customer',CustomerSchema);