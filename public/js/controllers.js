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

function MainCtrl($scope, $http, $rootScope, $location) {
	$http({method:"GET", url: "/api/tests"}).
	success(function(data, status, headers, config) {
		console.log("### data", data[0])
	    $scope.row = data[0];
	}).
	error(function(data, status, headers, config) {
	    $scope.name = 'Error!'
	});

	console.log("Main")
	$scope.check_clinic = check_clinic;

	function check_clinic(){
		$http({method:"GET", url: "/api/db/clinic?id_clin=" + $('#clinic_id').val()}).
		success(function(data, status, headers, config) {
			console.log("### data1", data[0])
		    if(data.length){
		    	$rootScope.user = data[0];
		    	$location.path('/clinic')
		    }
		}).
		error(function(data, status, headers, config) {
		    $scope.name = 'Error!'
		});
	}

}
MainCtrl.$inject = ["$scope", "$http", "$rootScope", "$location"];



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
