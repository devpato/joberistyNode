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
db = mongoose.connect('mongodb://wearetamo:Policia9@ds119768.mlab.com:19768/jobersity',['jbusers'],function(err){
    if(err){
        console.log("Not connection to DB" + err);
        throw err;
    }
    else{
        console.log("Connected to DB");
    }
});
//Routes
/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

//Creating Users
app.post('/users',function(req,res){
    res.send('testing users route');
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    //user.firstName = req.body.firstName;
    //user.lastName = req.body.lastName;
    user.email = req.body.email;
    //user.major = req.body.major;
    //Save user
    user.save(); 
    res.send('user created!');   
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})