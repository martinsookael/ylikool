var entuURL = 'https://ylikool.entu.ee/api2/';

function cl(data) {
    console.log(data);
}

function toLecture(data) {
    try        { var date = data.properties.kuupaev.values[0].value; }
    catch(err) { var date = ''; }

    try        { var title = data.properties.nimi.values[0].value; }
    catch(err) { var title = ''; }

    try        { var authors = data.properties.esitaja.values; }
    catch(err) { var authors = []; }

    try        { var link = data.properties.link.values[0].value; }
    catch(err) { var link = ''; }

    var item_authors = [];
    for(a in authors) {
        item_authors.push(authors[a].value);
    }

    return {
        id      : data.id,
        date    : date,
        year    : date.substring(0, 4),
        title   : title,
        authors : item_authors,
        link    : link,
    };

}

angular.module('ylikoolApp', ['ngRoute'])

    .config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/ajatelg', {
                templateUrl : 'pages/history.html',
                controller  : 'listCtrl'
            })
            .when('/konelejad', {
                templateUrl : 'pages/authors.html',
                controller  : 'listCtrl'
            })
            .when('/:id', {
                templateUrl : 'pages/lecture.html',
                controller  : 'lectureCtrl'
            })
            .otherwise({ redirectTo: '/ajatelg' });

        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://heli.er.ee/**'
        ]);
    }])

    .controller('mainCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        $rootScope.url = $location.path().replace('/', '');
        $scope.nightTipNr = Math.floor((Math.random()*3)+1);
        $scope.pages = [
            {url: 'ajatelg',   title: 'Ajatelg'},
            {url: 'konelejad', title: 'Kõnelejad'},
            // {url: 'teemad',    title: 'Teemad'},
        ];

        $scope.nightToggle = function () {
            $scope.nightMode = !$scope.nightMode;
            $scope.hideNightTip = true;
        }
    }])

    .controller('listCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
        $rootScope.url = $location.path().replace('/', '');

        if($rootScope.lectures || $rootScope.years || $rootScope.authors) {
            $scope.lectures = $rootScope.lectures;
            $scope.years    = $rootScope.years;
            $scope.authors  = $rootScope.authors;
        } else {
            $http({method: 'GET', url: entuURL+'entity', params: {definition: 'loeng'}}).success(function(data) {
                $rootScope.lectures_count  = data.result.length;
                $rootScope.lectures_loaded = 0;
                $rootScope.lectures        = [];
                $rootScope.years           = [];
                $rootScope.authors         = [];

                for(i in data.result) {
                    $http({method: 'GET', url: entuURL+'entity-'+data.result[i].id}).success(function(data) {
                        var lecture = toLecture(data.result);

                        $rootScope.lectures.push(lecture);

                        if($rootScope.years.indexOf(lecture.year) == -1) {
                            $rootScope.years.push(lecture.year);
                            $rootScope.years = $rootScope.years.sort();
                            $rootScope.years = $rootScope.years.reverse();
                        }

                        for(a in lecture.authors) {
                            if($rootScope.authors.indexOf(lecture.authors[a]) == -1) {
                                $rootScope.authors.push(lecture.authors[a]);
                                $rootScope.authors = $rootScope.authors.sort();
                            }
                        }

                        $scope.lectures = $rootScope.lectures;
                        $scope.years    = $rootScope.years;
                        $scope.authors  = $rootScope.authors;

                        $rootScope.lectures_loaded += 1;
                    });
                };
            });
        }
     }])

    .controller('lectureCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function($rootScope, $scope, $http, $routeParams) {
        $rootScope.url = $routeParams.id;

        $http({method: 'GET', url: entuURL+'entity-'+$routeParams.id}).success(function(data) {
            $scope.lecture = toLecture(data.result);
        });

        $scope.palyAudio = function(lecture) {
            $rootScope.current_lecture = lecture;
        }
    }]);
