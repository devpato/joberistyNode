var express = require('express')
var app = express()
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//My one modules
var User = require('./app/models/user');
var Company = require('./app/models/company');
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


//Connection to DB

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://wearetamo:Policia9@ds119768.mlab.com:19768/jobersity',function(err){
    if(err){
        console.log("Not connection to DB" + err);
        throw err;
    }
    else{
        console.log("Connected to DB");
    }
});

//Creating Users
app.post('/users',function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.major = req.body.major;
    user.save(function(err){
        if(err){
            res.send("User already exists");
        }
        else{
            res.send('User created!')
        }
    });    
});
//Creating Company
app.post('/company',function(req,res){
    var company = new Company();
    company.username = req.body.username;
    company.password = req.body.password;
    company.email = req.body.email;
    company.name = req.body.name;
    company.address = req.body.address;
    company.website = req.body.website;
    company.telephone = req.body.telephone;
    company.save(function(err){
        if(err){
            res.send("Company already exists");
        }
        else{
            res.send('Company created!')
        }
    });
    
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!')
});