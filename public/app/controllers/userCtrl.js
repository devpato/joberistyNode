
angular.module('userController',[])

.controller('regCtrl',function($http){
    console.log('testing reg controller');
    this.regUser = function(regData){
        console.log("form submitted");
        console.log(this.regData);
        $http.post("/api/users",this.regData);
    };
});