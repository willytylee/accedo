'use strict';



// Declare app level module which depends on filters, and services
//,  'myApp.filters',  'myApp.services',  'myApp.directives',  'myApp.controllers'
var app= angular.module('myApp', ['ngRoute', 'ngSanitize']);
app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/movie_list', {templateUrl: 'partials/movie_list.html', controller: 'movieCtrl'});
	$routeProvider.when('/movie_info', {templateUrl: 'partials/movie_info.html', controller: 'movieCtrl'});
	$routeProvider.when('/movie_history', {templateUrl: 'partials/movie_history.html', controller: 'movieCtrl'});
	$routeProvider.otherwise({redirectTo: '/movie_list'});
}]);
