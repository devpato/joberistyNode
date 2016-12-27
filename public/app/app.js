
angular.module('jobersity',['jobersityRoutes','userController','userServices','ngAnimate','mainController','authServices'])

//this confinguring the application with the factor that assigns the token to the header.
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
})
