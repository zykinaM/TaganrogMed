'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute', 'ngCookies']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partial/main', controller: MainCtrl});
    $routeProvider.when('/search', {templateUrl: 'partial/search', controller: MainCtrl});
    $routeProvider.when('/record', {templateUrl: 'partial/record', controller: MainCtrl});
    $routeProvider.when('/clinic', {templateUrl: 'partial/clinic', controller: MainCtrl});
    $routeProvider.when('/auth_clinic', {templateUrl: 'partial/auth_clinic', controller: MainCtrl});
    $routeProvider.when('/registration', {templateUrl: 'partial/registr_clinic', controller: MainCtrl});
    //$routeProvider.when('/edit_clinic', {templateUrl: 'partial/auth_clinic', controller: MainCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);