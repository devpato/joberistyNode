var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Table for usersSchema
var UserSchema = new Schema({
    username:{type: String, lowercase: true, required: true, unique: true},
    password:{type: String, required: true},
    email:{type: String, lowercase: true, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},   
    major: {type: String, required: true},
    jobsApplied:[{
        title: String,
        description: String,
        position: String
    }]
    
});

module.exports = mongoose.model('User', UserSchema);