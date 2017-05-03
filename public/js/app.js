const App = angular.module('app', ['angularUtils.directives.dirPagination']);
App.controller('controller', function ($scope, $http) {
	$scope.query = '';
	$scope.loading = true;
	$scope.currentPage = 1;
	$scope.pageSize = 9;
	$scope.pageChangeHandler = function (num) {
		console.log('page changed to ' + num);
	};
	$http.get('http://dahi.manoa.hawaii.edu/njs/data')
  .then(function (data) {
	$scope.data = data.data;
	$scope.loading = false;
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
	setTimeout(function () {
		$('.card-subtitle').each(function (idx, val) {
			val.innerHTML = toTitleCase(val.innerHTML);
		});
		$('.interest-item').each(function (idx, val) {
			val.innerHTML = toTitleCase(val.innerHTML);
		});
	}, 250);
});
});
App.controller('queryController', function ($scope) {
	$scope.pageChangeHandler = function (num) {
		$('.card-reveal').hide();
		console.log('going to page ' + num);
	};
});
