var express = require('express')
var app = express()
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router)

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api/',appRoutes);

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

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!')
});