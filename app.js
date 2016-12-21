var express = require('express')
var app = express()
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router)
var path = require('path');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/api/',appRoutes);

//Connection to db in the cloud
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://wearetamo:Policia9@ds119768.mlab.com:19768/jobersity',function(err){
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://wearetamo:Policia9@ds119768.mlab.com:19768/jobersity',function(err){
    if(err){
        console.log("Not connection to DB" + err);
        throw err;
    }
    else{
        console.log("Connected to DB");
    }
});

//Showing home page
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!')
});