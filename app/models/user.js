var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require ('mongoose-validator');
var titlize = require ('mongoose-title-case');

//Validations Backend
var myValidator = [
    validate({
        validator: 'matches',
        arguments: /^([a-zA-Z]{3,20})+$/,
        message: 'Tiene que tener 3-20 caracteres, y no caracteres especiales.'
    })
];
var emailValidator = [
    validate({
        validator: 'isEmail',
    }),
    validate({
        validator: 'isLength',
        arguments: [3-50],
        message: 'Escribe un email valido de 3-50 caracteres.'
    })
];
//Table for usersSchema
var UserSchema = new Schema({
    //Secure backend for registration
    username:{type: String, lowercase: true, required: true, unique: true},
    password:{type: String, required: true},
    email:{type: String, lowercase: true, required: true, unique: true, validate: emailValidator},
    firstName: {type: String, required: true, validate: myValidator},
    lastName: {type: String, required: true, validate: myValidator},
    university: {type: String, required: true, validate: myValidator},    
    major: {type: String, required: true, validate: myValidator},
    type: {type: String, required: true, validate: myValidator}, 
    year: {type: String, required: true}, 
    jobsApplied:[{
        title: String,
        description: String,
        position: String
    }]
    
});

//Validations Backend
UserSchema.plugin(titlize,{
  paths: [ 'firstName', 'lastName' ]
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

//Backend validator
UserSchema.plugin(titlize,{
    paths: ['firstName','lastName','major', 'university']
});

UserSchema.methods.comparePass = function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', UserSchema);