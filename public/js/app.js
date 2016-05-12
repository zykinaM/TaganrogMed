'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).


      when('/search', {
        templateUrl: 'search'
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


      
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);