//My one modules
var User = require('../models/user');
var Company = require('../models/company');

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
            res.json({success: false, message:'Ensure all the required files have been provided'});
        }
        else{
            user.save(function(err){
                if(err){
                    //res.send("User already exists");
                    res.json({success: false, message:'Username or Email already exists'});
                }
                else{                    
                    res.json({success: true, message:'User created!'});
                }
            }); 
        }
        
    });
    //User login
    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.json({success:false, message: 'cannot authenticate user'});
            }else if(user){
               var validPass = user.comparePass(req.body.password);
               if(!validPass){
                   res.json({sucess: false, message: 'Cannot authenticate password'});
               }else{
                   res.json({sucess: true, message: 'authenticated password'});
               }
            }
        });
    });
    //Creating Company
    router.post('/company',function(req,res){
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
