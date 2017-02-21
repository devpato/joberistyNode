
angular.module('userController',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){
    
    var app = this;

    this.regUser = function(regData/*, valid*/){
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;
        console.log("form submitted");
        //if(valid){
            User.create(app.regData).then(function(data){
                if(data.data.success){
                    app.errorMsg = false;
                    app.loading = false;                
                    app.successMsg = data.data.message + '....Redirecting';
                    $timeout(function(){
                        $location.path('/');
                    },2000)
                
                }
                else{
                    app.successMsg = false;
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            }); 
        //}
        /*else{
            app.loading = false;
            app.errorMsg = "Porfavor asegurate que el formulario este completo adecuadamente";
        }*/
           
    };
    
   		// 	Custom function that checks if username is available for user to use	
		this.checkUsername = function(regData) {
			app.checkingUsername = true; // Start bootstrap loading icon
			app.usernameMsg = false; // Clear usernameMsg each time user activates ngBlur
			app.usernameInvalid = false; // Clear usernameInvalid each time user activates ngBlur

			// Runs custom function that checks if username is available for user to use
			User.checkUsername(app.regData).then(function(data) {
				// Check if username is available for the user
				if (data.data.success) {
					app.checkingUsername = false; // Stop bootstrap loading icon
					app.usernameMsg = data.data.message; // If successful, grab message from JSON object
				} else {
					app.checkingUsername = false; // Stop bootstrap loading icon
					app.usernameInvalid = true; // User variable to let user know that the chosen username is taken already
					app.usernameMsg = data.data.message; // If not successful, grab message from JSON object
				}
			});
		}

		// Custom function that checks if e-mail is available for user to use		
		this.checkEmail = function(regData) {
			app.checkingEmail = true; // Start bootstrap loading icon
			app.emailMsg = false; // Clear emailMsg each time user activates ngBlur
			app.emailInvalid = false; // Clear emailInvalid each time user activates ngBlur

			// Runs custom function that checks if e-mail is available for user to use			
			User.checkEmail(app.regData).then(function(data) {
				// Check if e-mail is available for the user
				if (data.data.success) {
					app.checkingEmail = false; // Stop bootstrap loading icon
					app.emailMsg = data.data.message; // If successful, grab message from JSON object
				} else {
					app.checkingEmail = false; // Stop bootstrap loading icon
					app.emailInvalid = true; // User variable to let user know that the chosen e-mail is taken already
					app.emailMsg = data.data.message; // If not successful, grab message from JSON object
				}
			});
		}
	})

	// Custom directive to check matching passwords	
	.directive('match', function() {
		return {
			restrict: 'A', // Restrict to HTML Attribute
			controller: function($scope) {
				$scope.confirmed = false; // Set matching password to false by default

				// Custom function that checks both inputs against each other				
				$scope.doConfirm = function(values) {
					// Run as a loop to continue check for each value each time key is pressed
					values.forEach(function(ele) {
						// Check if inputs match and set variable in $scope
						if ($scope.confirm == ele) {
							$scope.confirmed = true; // If inputs match
						} else {
							$scope.confirmed = false; // If inputs do not match
						}
					});
				}
			},

			link: function(scope, element, attrs) {

				// Grab the attribute and observe it			
				attrs.$observe('match', function() {
					scope.matches = JSON.parse(attrs.match); // Parse to JSON
					scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other	
				});

				// Grab confirm ng-model and watch it			
				scope.$watch('confirm', function() {
					scope.matches = JSON.parse(attrs.match); // Parse to JSON
					scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other	
				});
			}
		};
	})