'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
}

function IndexCtrl($scope, $http){
	console.log("### IndexCtrl here")
}

function MyCtrl1() {}
MyCtrl1.$inject = [];

function MainCtrl($scope, $http) {
	console.log("Main")
}
MainCtrl.$inject = ["$scope", "$http"];



function MyCtrl2($scope, $http) {
	$http({method:"GET", url: "/api/tests"}).
	success(function(data, status, headers, config) {
		console.log("### data", data[0])
	    $scope.row = data[0];
	}).
	error(function(data, status, headers, config) {
	    $scope.name = 'Error!'
	});
}
MyCtrl2.$inject = ["$scope", "$http"];
