const App = angular.module('app', []);
App.controller('controller', function ($scope, $http) {
  $scope.loading = true;
  $http.get('http://dahi.manoa.hawaii.edu/njs/memberconnect/data')
  .then(function(data) {
    console.log(data.data[0]);
    $scope.data = data.data;
    $scope.query = {};
    $scope.loading = false;
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    setTimeout(function () {
      $('.card-subtitle').each(function(idx, val) {
        val.innerHTML = toTitleCase(val.innerHTML);
      });
      $('.interest-item').each(function(idx, val) {
        val.innerHTML = toTitleCase(val.innerHTML);
      });
    }, 250);
    // $scope.$apply();
  });
});
