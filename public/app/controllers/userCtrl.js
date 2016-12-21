
angular.module('userController',[])

.controller('regCtrl',function(){
    console.log('testing reg controller');
    this.regUser = function(){
        console.log("testing button");
    };
});