
angular.module('userController',[])

.controller('regCtrl',function(){
    console.log('testing reg controller');
    this.regUser = function(regData){
        console.log("form submitted");
        console.log(this.regData);
    };
});