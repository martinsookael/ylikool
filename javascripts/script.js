// JavaScript Document

$(document).ready(function() { 
    //console.log("ready");
            //var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id tortor nisi. Aenean sodales diam ac lacus elementum scelerisque. Suspendisse a dui vitae lacus faucibus venenatis vel id nisl. Proin orci ante, ultricies nec interdum at, iaculis venenatis nulla. ';
/*
        function play() {
            $('#player').ttwMusicPlayer(myPlaylist, {
                autoplay: false, 
                //description:description,
                jPlayer:{
                    swfPath:'../frameworks/music-player/plugin/jquery-jplayer' //You need to override the default swf path any time the directory structure changes
                }
            });
        }
*/

});


// shortcut for console.log
function cl(data) {
    console.log(data);
}


//angular.module('scotchApp', ['ngSanitize'])

var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider
/*
			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/otsi', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the about page
			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
*/        
            .when('/loeng/:name', { 
                templateUrl: 'pages/loeng.html', 
                controller: 'CMSController' 
            })
        
            // use the HTML5 History API
            //$locationProvider.html5Mode(true);
    });


	// create the controller and inject Angular's $scope
	//scotchApp.controller('mainController', function($scope, $route, $routeParams) {
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		//$scope.message = 'Everyone come and see how good I look!';
        //console.log($scope);
	});

	scotchApp.controller('CMSController', function($scope, $route, $routeParams) {
        //console.log($routeParams);
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
	})




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