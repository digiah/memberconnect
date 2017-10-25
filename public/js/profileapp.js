const App = angular.module('profileapp', []);
App.controller('profilecontroller', function ($scope, $http) {
	$http.get('https://dahi.manoa.hawaii.edu/njs/data')
  .then(function (data) {
		$scope.data = data.data;
		$scope.loading = false;
		console.log($scope.data);
		$scope.profile = $scope.data.find((e) => e.username == $.username);
		console.log($scope.profile);
	});

	function getUrlVars() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
			}
			return vars;
	}
	const obj = getUrlVars();
	var auth = $.ajax({type: "GET", url: `https://cors-anywhere.herokuapp.com/https://authn.hawaii.edu/cas/validate?service=https://dahi.manoa.hawaii.edu/njs/&ticket=${obj.ticket}`, async: false}).responseText;
	console.log(auth);
	$scope.username = auth;
});
