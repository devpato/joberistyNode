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
        user.university = req.body.university;
        user.major = req.body.major;
        user.type = req.body.type;
        user.year = req.body.year;
        
        if(req.body.username == null || req.body.username == '' ||
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == '' ||
        req.body.firstName == null || req.body.lastName == '' ||
        req.body.university == null || req.body.university == '' ||
        req.body.major == null || req.body.major == '' ||
        req.body.type == null || req.body.type == '' ||
        req.body.year == null || req.body.year == ''
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
                    if(err.errors != null){
                        if(err.errors.email){
                            res.json({success: false, message:err.errors.email.message});
                        }
                        else if(err.errors.username){
                            res.json({success: false, message:err.errors.username.message});
                        }
                        else if(err.errors.firstName){
                            res.json({success: false, message:err.errors.firstName.message});
                        }
                        else if(err.errors.lastName){
                            res.json({success: false, message:err.errors.lastName.message});
                        }
                        else if(err.errors.university){
                            res.json({success: false, message:err.errors.university.message});
                        }
                        else if(err.errors.major){
                            res.json({success: false, message:err.errors.major.message});
                        }
                        else if(err.errors.type){
                            res.json({success: false, message:err.errors.type.message});
                        }
                        else if(err.errors.password){
                            res.json({success: false, message:err.errors.password.message});
                        }
                        else{
                            res.json({success: false, message:err});
                        }
                    }
                    else if (err) {
                            if(err.code == 11000){
                                res.json({success: false, message: 'username o email ya fueron registrados, intenta otro'});
                            }else{
                                res.json({success: false, message:err});
                            }
                    }
                }     
                else{                    
                    res.json({success: true, message:'Usuario creado!'});
                }
            }); 
        }
        
    });
    //Check username
   router.post('/checkusername', function(req,res){
        User.findOne({username: req.body.username}).select('username').exec(function(err,user){//
           if(err) throw err;
            if(user){
                res.json({success: false, message: "El usuario ya esta tomado"});
            }else{
                res.json({success: true, message: "Nombre de usuario valido"});
            }
        }); 
    });
    //Check email
    router.post('/checkemail', function(req,res){
        User.findOne({email: req.body.email}).select('email').exec(function(err,user){//
           if(err) throw err;
            if(user){
                res.json({success: false, message: "El e-mail ya esta tomado"});
            }else{
                res.json({success: true, message: "E-mail de usuario valido"});
            }
        }); 
    });
    // ng-blur="register.checkUsername(regData);"*/
    //User login this seems to be gucci money
    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username}).select('email username password firstName major').exec(function(err,user){//
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
                   var token = jwt.sign({username: user.username, email: user.email, firstName: user.firstName,university: user.university, major: user.major, type: user.type, year: user.year}, secret, {expiresIn: '24h'} );//
                   res.json({success: true, message: 'Usuario autentificado!', token: token});
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
        res.send(req.decoded);
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
