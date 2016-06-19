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

function MainCtrl($scope, $http, $rootScope, $location, $cookieStore) {
	console.log("Main")
	$('#datetimepicker1').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	$scope.check_clinic = check_clinic;
	$scope.load_spec = load_spec;
	$scope.check_captcha = check_captcha;
	$rootScope.logout = logout;
	$scope.captchaError = false;
	$scope.searchValueText = $scope.searchValue;
	$rootScope.user = $cookieStore.get('user');
	$scope.records = [{
		'num':'001',
		'date':'12/01/2016',
		'time': '13.30',
		'doctor': 'Иванов И.И. (Стоматолог)',
		'patient': 'Мария',
		'phone': '44305',
		'status': ''
	},
	{
		'num':'002',
		'date':'12/01/2016',
		'time': '13.30',
		'doctor': 'Петров И.И. (Кардиолог)',
		'patient': 'Евгения',
		'phone': '123123',
		'status': ''
	},
	{
		'num':'003',
		'date':'12/01/2016',
		'time': '13.20',
		'doctor': 'Сидоров И.И. (Окулист)',
		'patient': 'Вартанов Михаил',
		'phone': '',
		'status': '1'
	},
	{
		'num':'004',
		'date':'12/01/2016',
		'time': '13.30',
		'doctor': 'Петечкин И.И. (Массажист)',
		'patient': 'Не указано',
		'phone': '7765',
		'status': ''
	}]
	$scope.onenumber = Math.floor(Math.random() * 9 + 1)
	$scope.twonumber = Math.floor(Math.random() * 9 + 1)
	genCaptcha();
	function genCaptcha(){
		$scope.onenumber = Math.floor(Math.random() * 9 + 1)
		$scope.twonumber = Math.floor(Math.random() * 9 + 1)
		$('#captchaCalc').text($scope.onenumber + " + " + $scope.twonumber);
	}
	function logout(){
		console.log("### logout")
		$rootScope.user = null;
		$cookieStore.put('user', null);
		$location.path('/auth_clinic')
	}
	function check_captcha() {
		console.log("### check_captcha")
		if($('#captchaAnswer').val() == $scope.onenumber + $scope.twonumber){
			$scope.captchaError = false;
			$('#recModal').modal('show')
		} else {
			$scope.captchaError = true;
			genCaptcha();
		}
	}
	function get_test_data(){
		$http({method:"GET", url: "/api/tests"}).
		success(function(data, status, headers, config) {
			console.log("### data", data[0])
		    $scope.row = data[0];
		}).
		error(function(data, status, headers, config) {
		    $scope.name = 'Error!'
		});
	}

	function check_clinic(){
		$http({method:"GET", url: "/api/db/clinic?id_clin=" + $('#clinic_id').val()}).
		success(function(data, status, headers, config) {
			console.log("### data1", data[0])
		    if(data.length){
		    	$rootScope.user = data[0];
		    	$cookieStore.put('user', data[0]);
		    	$location.path('/clinic')
		    }
		}).
		error(function(data, status, headers, config) {
		    $scope.name = 'Error!'
		});
	}

	function load_spec(){
		$http({method:"GET", url: "/api/db/specialisation"}).
		success(function(data, status, headers, config) {
			console.log("### spec", data[0])
		    if(data.length){
		    	$rootScope.spec = data[0];
		    	$location.path('/specialisation')
		    }
		}).
		error(function(data, status, headers, config) {
		    $scope.name = 'Error!'
		});
	}

}
MainCtrl.$inject = ["$scope", "$http", "$rootScope", "$location", "$cookieStore"];



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


