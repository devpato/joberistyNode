//we inject this controller to all the views because it will used in all views
angular.module('mainController',[]).controller('mainCtrl',function(){
    console.log('testing main ctrl');
});