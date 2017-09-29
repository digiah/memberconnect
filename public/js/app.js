const App = angular.module('app', ['angularUtils.directives.dirPagination', 'angular.filter']);
App.controller('controller', function ($scope, $http) {
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
});
App.controller('queryController', function ($scope) {
	$scope.pageChangeHandler = function (num) {
		$('.card-reveal').hide();
		console.log('going to page ' + num);
	};
});
