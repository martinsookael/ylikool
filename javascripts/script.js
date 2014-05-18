var entuURL = 'https://ylikool.entu.ee/api/';

function cl(data) {
    console.log(data);
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

    .controller('listCtrl', ['$rootScope', '$scope', '$http', '$filter', '$location', function($rootScope, $scope, $http, $filter, $location) {
        $rootScope.url = $location.path().replace('/', '');

        if($rootScope.lectures || $rootScope.years || $rootScope.authors) {
            $scope.lectures = $rootScope.lectures;
            $scope.years = $rootScope.years;
            $scope.authors = $rootScope.authors;
        } else {
            $http({method: 'GET', url: entuURL+'get_entity_list', params: {entity_definition_keyname: 'loeng', only_public: true, full_info: true}}).success(function(data) {
                $rootScope.lectures = [];
                $rootScope.years = [];
                $rootScope.authors = [];

                for(i in data) {
                    try        { var date = data[i].properties.kuupaev.values[0].value; }
                    catch(err) { var date = ''; }

                    try        { var year = parseInt($filter('date')(data[i].properties.kuupaev.values[0].value, 'yyyy')); }
                    catch(err) { var year = ''; }

                    try        { var title = data[i].properties.nimi.values[0].value; }
                    catch(err) { var title = ''; }

                    try        { var authors = data[i].properties.esitaja.values; }
                    catch(err) { var authors = []; }

                    try        { var link = data[i].properties.link.values[0].value; }
                    catch(err) { var link = ''; }

                    if($scope.years.indexOf(year) == -1) {
                        $rootScope.years.push(year);
                        $rootScope.years = $rootScope.years.sort();
                        $rootScope.years = $rootScope.years.reverse();
                    }

                    var item_authors = [];
                    for(a in authors) {
                        var author = authors[a].value;
                        item_authors.push(author);
                        if($rootScope.authors.indexOf(author) == -1) {
                            $rootScope.authors.push(author);
                            $rootScope.authors = $rootScope.authors.sort();
                        }
                    }

                    $rootScope.lectures.push({
                        id      : data[i].id,
                        date    : date,
                        year    : year,
                        title   : title,
                        authors : item_authors,
                        link    : link,
                    });

                };

                $scope.lectures = $rootScope.lectures;
                $scope.years = $rootScope.years;
                $scope.authors = $rootScope.authors;
            });
        }

     }])

    .controller('lectureCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams) {
        $rootScope.url = $routeParams.id;

        for(i in $rootScope.lectures) {
            if($rootScope.lectures[i].id == $routeParams.id) {
                $scope.lecture = $rootScope.lectures[i];
                break;
            }
        }

        $scope.palyAudio = function(lecture) {
            $rootScope.current_lecture = lecture;
        }
    }]);
