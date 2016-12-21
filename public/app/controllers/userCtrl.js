
angular.module('userController',[])

.controller('regCtrl',function($http,$location,$timeout){
    
    var app = this;

    this.regUser = function(regData){
        app.loading = true;
        app.errorMsg = false;
        console.log("form submitted");

        $http.post("/api/users",app.regData).then(function(data){
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                $timeout(function(){
                     $location.path('/');
                },2000)
               
            }
            else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });    
    };
});