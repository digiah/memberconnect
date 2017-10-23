const App = angular.module('authenticatedapp', ['angularUtils.directives.dirPagination', 'angular.filter']);
App.controller('authenticatedcontroller', function ($scope, $http) {
	$scope.query = '';
	$scope.loading = true;
	$scope.currentPage = 1;
	$scope.pageSize = 9;
	$scope.pageChangeHandler = function (num) {
		console.log('page changed to ' + num);
	};
	$http.get('https://dahi.manoa.hawaii.edu/njs/data')
  .then(function (data) {
		$scope.data = data.data;
		$scope.loading = false;
	});
	const obj = getUrlVars();
	var auth = $.ajax({type: "GET", url: `https://cors-anywhere.herokuapp.com/https://authn.hawaii.edu/cas/validate?service=https://dahi.manoa.hawaii.edu/njs/&ticket=${obj.ticket}`, async: false}).responseText;
	console.log(auth);
	$scope.username = auth;
});
App.controller('queryController', function ($scope) {
	$scope.pageChangeHandler = function (num) {
		$('.card-reveal').hide();
		console.log('going to page ' + num);
	};
});
