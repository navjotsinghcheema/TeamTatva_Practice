var app = angular.module('myApp',[]);

//[] means dependancy

app.controller('myCtrl',function($scope){
  $scope.firstName  = "Agam";
  $scope.lastName = "Cheema";
});
