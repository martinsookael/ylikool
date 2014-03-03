// JavaScript Document

$(document).ready(function() { 

});


// shortcut for console.log
function cl(data) {
    console.log(data);
}



var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
        
            .when('/:name', {
                templateUrl: '/Users/martinsookael/4m4t3ur/p/ylikool/pages/loeng.html', 
                controller: 'CMSController' 
            });
        
            // use the HTML5 History API
            //$locationProvider.html5Mode(true);
    });

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});


	scotchApp.controller('CMSController', function($scope, $route, $routeParams) {
        console.log($routeParams);
		$scope.message = 'JOU. '+$routeParams.name;
	});


/*
function CMSController($scope, $route, $routeParams) {

    $route.current.templateUrl = '/pages/' + $routeParams.name + ".html";

    $.get($route.current.templateUrl, function (data) {
        $scope.$apply(function () {
            $('#views').html($compile(data)($scope));
        });
    });
    ...
}
CMSController.$inject = ['$scope', '$route', '$routeParams'];
*/