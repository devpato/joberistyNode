var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Table for companySchema
var CompanySchema = new Schema({
    username:{type: String, lowercase: true, required: true, unique: true},
    password:{type: String, required: true},
    email:{type: String, lowercase: true, required: true, unique: true},
    name: {type: String, required: true},
    address: String,
    website: String,
    telephone: Number,
    jobs:[{
        title: String,
        description: String,
        position: String,
        date: Date
    }]
});

module.exports = mongoose.model('Company', CompanySchema);