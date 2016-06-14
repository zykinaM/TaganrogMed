'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index_clinic.jade',
        controller: 'IndexCtrl'
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: 'AddPostCtrl'
      }).


      when('/search', {
        templateUrl: 'search'
      }).
      when('/record', {
        templateUrl: 'record'
      }).
      when('/auth_clinic', {
        controller: 'AuthCtrl',
        templateUrl: 'auth_clinic.jade'
      }).
      when('/registr_clinic', {
        templateUrl: 'registr_clinic'
      }).
      // when('/index_clinic', {
      //   templateUrl: 'index_clinic'
      // }).
      when('/edit_clinic', {
        templateUrl: 'edit_clinic'
      }).
      when('/test_page', {
        templateUrl: 'test_page',
        controller: 'TestCtrl'
      });


      
      // otherwise({
      //   redirectTo: '/'
      // });
    $locationProvider.html5Mode(true);
  }]);