angular.module('authServices',[])
    .factory('Auth',function($http){
        var authFactory = {};
        //User.create(regData)
        authFactory.create = function(regData){
            return $http.post('api/users/',regData);
        }

        return userFactory;
});