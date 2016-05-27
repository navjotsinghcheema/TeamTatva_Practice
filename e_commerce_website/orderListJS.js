angular.module('orders', ['ngRoute','ngMaterial'])
.controller('AppCtrl', function($scope, $http) {
  var search=window.location.search;
  var user=search.split("=");
  $scope.orderDetails=function(){
    $http.get("http://localhost:8080/orders/",{params:{userId:user[1]}}).success(function(data){
      $scope.orders=data;
    });
  }
  $scope.orderDetails();
  $scope.cancelOrder=function(orderId,status){
    if(status==="delivered" || status==="order cancelled"){
      return true;
    }
    else{
      return false;
    }
  }
  $scope.cancel=function(orderId){
    $http.patch("http://localhost:8080/orders/"+orderId,{id:orderId,status:"order cancelled"}).success(function(){
      $scope.orderDetails();
    });
  }

  $scope.totalCost=function(i){
    var totalprice=0;
      for(var j in $scope.orders[i].details){
        var cost=$scope.orders[i].details[j].cost*$scope.orders[i].details[j].quantity;
        totalprice=totalprice+cost;
      }
      return totalprice;
  }
})
.controller('ViewOrderController', function($scope,$http,$routeParams) {
  $scope.viewOrder=function(){
    $http.get("http://localhost:8080/orders/",{params:{id:$routeParams.id}}).success(function(data1){
      $scope.orderView=data1;
    });
  }
  $scope.viewOrder();
  $scope.total=function(){
    var totalprice=0;
      for(var j in $scope.orderView[0].details){
        var cost=$scope.orderView[0].details[j].cost*$scope.orderView[0].details[j].quantity;
        totalprice=totalprice+cost;
      }
      return totalprice;
  }
})
.config(function($routeProvider,$mdIconProvider) {
  $mdIconProvider
  .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);

  $routeProvider
  .when('/viewOrder/:id', {
    templateUrl: '/viewOrder.html',
    controller: 'ViewOrderController'
  })
});
