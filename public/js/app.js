'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
     

      when('/search', {
        templateUrl: 'search'
      }).
      when('/record', {
        templateUrl: 'record'
      }).
      when('/auth_clinic', {
        templateUrl: 'auth_clinic'
      }).
      when('/registr_clinic', {
        templateUrl: 'registr_clinic'
      }).
      when('/index_clinic', {
        templateUrl: 'index_clinic'
      }).
      when('/edit_clinic', {
        templateUrl: 'edit_clinic'
      }).

      when('/test/db', {
        templateUrl: 'test_db',
        controller: TestCtrl
      })
      
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);