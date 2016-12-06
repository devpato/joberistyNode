var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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

//Middleware before saving Schema
UserSchema.pre('save',function(next){
    var user = this; 
    //Encrypt password   
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err)
            return next(err);
        user.password = hash;
        next();
    });
    
});


module.exports = mongoose.model('User', UserSchema);