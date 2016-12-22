//we inject this controller to all the views because it will used in all views
angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$timeout,$location){
    
    var app = this;

    this.doLogin = function(loginData){
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;
        console.log("form submitted");

       Auth.create(app.loginData).then(function(data){
            if(data.data.success){
                app.errorMsg = false;
                app.loading = false;
                app.successMsg = data.data.message + '....Redireccionando';
                $timeout(function(){
                     $location.path('/about');
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