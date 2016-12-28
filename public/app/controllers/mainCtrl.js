//we inject this controller to all the views because it will used in all views
angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location, $rootScope, $window, $route){
    
    var app = this;

    //when we get the user info the load this app
    app.loadme = false;

    $rootScope.$on('$routeChangeStart', function() {
        if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function(data) {
                    //Retriving the data from the user
                    app.username = data.data.username;
                    app.email = data.data.email;
                    app.firstName = data.data.firstName//
                    app.password = data.data.password//
                    app.major = data.data.major//
                    app.loadme = true;
                    //Printing data form the user
                    console.log("Name :" + data.data.major);//
                    if (data.data.expired) app.logout();                
                });
        } else {
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
        }
        if ($location.hash() == '_=_') $location.hash(null);

    });
    if(Auth.isLoggedIn()){
        console.log('Success: user is logged in');
        Auth.getUser().then(function(data){
            console.log(data);
        });
    }else{
        console.log('Failure: user is NOT looged in');
    }
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
                     app.loginData = '';
                     app.successMsg = false;
                },2000)
               
            }
            else{
                app.successMsg = false;
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });           
    };
    //Authentification logout
    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        },2000);
    };
});