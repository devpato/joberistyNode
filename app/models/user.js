var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require ('mongoose-validator');

var myValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z]+$/
    })
];
//Table for usersSchema
var UserSchema = new Schema({
    //Secure backend for registration
    username:{type: String, lowercase: true, required: true, unique: true},
    password:{type: String, required: true},
    email:{type: String, lowercase: true, required: true, unique: true},
    firstName: {type: String, required: true, myValidator},
    lastName: {type: String, required: true},
    university: {type: String, required: true},    
    major: {type: String, required: true},
    type: {type: String, required: true}, 
    year: {type: String, required: true}, 
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

UserSchema.plugin(titlize,{
    paths: ['firstName','lastName','major']
});

UserSchema.methods.comparePass = function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', UserSchema);