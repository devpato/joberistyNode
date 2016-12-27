//My one modules
var User = require('../models/user');
var Company = require('../models/company');
var jwt = require('jsonwebtoken');
var secret = 'jobersity';

module.exports = function(router){
    //Creating Users
    //http://localhost:5000/api/users
    router.post('/users',function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.major = req.body.major;
        if(req.body.username == null || req.body.username == '' ||
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == '' ||
        req.body.firstName == null || req.body.lastName == '' ||
        req.body.major == null || req.body.major == ''
        )
        {
            //res.send('Ensure all the required files have been provided');
            console.log("blanks");
            res.json({success: false, message:'Asegurate que todos los campos fueron llenados'});
        }
        else{
            user.save(function(err){
                if(err){
                    //res.send("User already exists");
                    res.json({success: false, message:'Usuario o Email ya existen'});
                }
                else{                    
                    res.json({success: true, message:'Usuario creado!'});
                }
            }); 
        }
        
    });
    //User login this seems to be gucci money
    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
           if(err) throw err;

           if(!user){
               res.json({success: false, message: 'No se encontro a ese usuario'});
           } else if(user){
               if(req.body.password){
                   var validPassword = user.comparePass(req.body.password);
               } 
               if(!validPassword){
                   res.json({success: false, message: 'No se pudo comprobar el password'});
               }else{
                   var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'} );
                   res.json({success: true, message: 'Usuario atentificado!', token: token});
               }
           }
        }); 
    });
    //Middleware in Express
    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid', expired: true }); // new variable if token expires
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }

    });
    router.post('/me',function(req, res){
        res.send('testing me route');
    });
    //Creating Company
    router.post('/company', function(req,res){
        var company = new Company();
        company.username = req.body.username;
        company.password = req.body.password;
        company.email = req.body.email;
        company.name = req.body.name;
        company.address = req.body.address;
        company.website = req.body.website;
        company.telephone = req.body.telephone;
        if(req.body.username == null || req.body.username == '' ||
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == '' ||
        req.body.name == null || req.body.name == ''
        ){
            res.send('Ensure all the required files have been provided');
        }
        else{
            company.save(function(err){
                if(err){
                    res.send("Company already exists");
                }
                else{
                    res.send('Company created!')
                }
            });
        } 
    });
    return router;
}

//token
