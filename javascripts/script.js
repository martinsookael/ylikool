// JavaScript Document

$(document).ready(function() { 
    
});


// shortcut for console.log
function cl(data) {
    console.log(data);
}

var scotchApp = angular.module('scotchApp', ['ngRoute']);

    scotchApp.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://heli.er.ee/helid/oy/**']);
        
        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**']);
    });


	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/otsi.html',
				controller  : 'otsiController'
			})

			.when('/otsi', {
				templateUrl : 'pages/otsi.html',
				controller  : 'otsiController'
			})

            .when('/esinejad', {
				templateUrl : 'pages/esinejad.html',
				controller  : 'otsiController'
			})
        
            .when('/loeng/:name', { 
                templateUrl: 'pages/loeng.html', 
                controller: 'CMSController' 
            })
    });


	scotchApp.controller('mainController', function($scope) {
    });

    scotchApp.controller('otsiController', function($scope) {
        $scope.db = db;        
    });

    scotchApp.controller('CMSController', function($scope, $route, $routeParams) {
        $scope.message = 'JOU. '+$routeParams.name;
        var nid = $routeParams.name;
        var data = db[nid];
        $scope.title = data.title;
        $scope.tag = data.tag;
        $scope.source = data.source;
        $scope.text = data.text;
        $scope.date = data.date;
        $scope.authors = data.authors;   
        $scope.shortSource = data.shortSource; 
        $scope.nid = nid; 
    })


