angular.module('authServices',[])
    .factory('Auth',function($http){
        var authFactory = {};
        //User.create(regData)
        authFactory.create = function(loginData){
            return $http.post('api/authenticate/',loginData);
        }

        return authFactory;
});