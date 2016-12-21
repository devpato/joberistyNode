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
        ){
            res.send('Ensure all the required files have been provided');
        }
        else{
            user.save(function(err){
                if(err){
                    res.send("User already exists");
                }
                else{
                    res.send('User created!')
                }
            }); 
        }
        
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
