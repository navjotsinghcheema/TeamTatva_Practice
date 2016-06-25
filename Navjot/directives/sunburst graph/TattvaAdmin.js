angular.module('sunburst', ['ngMaterial'])
.controller('sunburstGraph',['$scope','$http',function($scope, $http){
  var currentInstance=null;
    function getGraphdata() {
    $http.get('/test9.json').then(function(res){
      $scope.sunburstData = res.data;
      // console.log("Graph data from server: ", res.data);
    },function(res){
      console.log("Error in getting graph data from server, error: ", res.data);
    });
    // $scope.selection={};
  }
  getGraphdata();
  }])
