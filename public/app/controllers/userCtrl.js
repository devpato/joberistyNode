
angular.module('userController',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){
    
    var app = this;

    this.regUser = function(regData){
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;
        console.log("form submitted");

        User.create(app.regData).then(function(data){
            if(data.data.success){
                app.errorMsg = false;
                app.loading = false;                
                app.successMsg = data.data.message + '....Redirecting';
                $timeout(function(){
                     $location.path('/');
                },2000)
               
            }
            else{
                app.successMsg = false;
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });    
    };
});