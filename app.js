var express = require('express')
var app = express()
var morgan = require('morgan');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
//Middleware
app.use(morgan('dev'));
var db = mongojs('mongodb://wearetamo:Policia9@ds119768.mlab.com:19768/jobersity',['jbusers'],function(err){
    if(err){
        console.log("Not connection to DB" + err);
        throw err;
    }
    else{
        console.log("Connected to DB");
    }
});
//Routes
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})