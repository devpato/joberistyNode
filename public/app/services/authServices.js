angular.module('authServices',[])
    .factory('Auth',function($http, AuthToken){
        var authFactory = {};
        //User.create(regData)
        authFactory.create = function(loginData){
            return $http.post('api/authenticate/',loginData).then(function(data){
                console.log(data.data.token);
                AuthToken.setToken(data.data.token);
                return data;
            });
        };
        //Auth loggedIn
        authFactory.isLoggedIn = function(){
            if(AuthToken.getToken()){
                return true;
            }else{
                return false;
            }
        };
        authFactory.getUser = function(){
            if(AuthToken.getToken()){
                return $http.post('/api/me');
            }else{
                $q.reject({message: 'User has no token'});
            }
        };
        //Auth loggedOut
        authFactory.logout = function() {
            AuthToken.setToken();
        };
        return authFactory;
    })

.factory("AuthToken", function($window){
    var authTokenFactory = {};
    authTokenFactory = {};

    authTokenFactory.setToken = function(token){
        //$window.localStorage.setItem('token', token);
        if(token){
            $window.localStorage.setItem('token',token);
        }else{
            $window.localStorage.removeItem('token');
        }
    };
    authTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
    };
    return authTokenFactory;
});