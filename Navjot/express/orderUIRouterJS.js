angular.module('orders', ['ui.router','ngMaterial'])

.factory('orderfactory',function($http){
  return{
    orderDetails:function(userId){
      console.log("fetching orders....");
      console.log(userId);
      return $http.get("http://localhost:8080/orders/"+userId);
    },
    cancel:function(orderId){
      return $http.patch("http://localhost:8080/orders/"+orderId,{id:orderId,status:"order cancelled"});
    },
    viewOrder:function(id){
      return $http.get("http://localhost:8080/orders/"+id);
    },
  }
})

.service('orderServices',function(){
  this.cancelOrder=function(orderId,status){
    if(status==="delivered" || status==="order cancelled"){
      return true;
    }
    else{
      return false;
    }
  }
})
.controller('getIdController',function($state){
  $state.go('getId');
})
.controller('AppCtrl', function($scope,$stateParams,orderfactory,orderServices) {
  // $state.go('Orders');
  // var search=window.location.search;
  // var user=search.split("=");
  var user = $stateParams.userId;
  console.log(user);
  orderfactory.orderDetails(user).success(function(orders) {
    console.log($scope.orders);
    $scope.orders = orders; });

  $scope.cancelOrder=function(orderId,status){
    return orderServices.cancelOrder(orderId,status);
  }
  $scope.cancel=function(orderId){
    orderfactory.cancel(orderId).success(function(){
      orderfactory.orderDetails(user).success(function(orders) { $scope.orders = orders; });
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

.controller('ViewOrderController', function($scope,$http,$stateParams,orderfactory) {

  orderfactory.viewOrder($stateParams.id).success(function(orderView) { $scope.orderView = orderView; });

  $scope.total=function(){
    var totalprice=0;
      for(var j in $scope.orderView[0].details){
        var cost=$scope.orderView[0].details[j].cost*$scope.orderView[0].details[j].quantity;
        totalprice=totalprice+cost;
      }
      return totalprice;
  }
})

.config(function($stateProvider,$mdIconProvider) {
  $mdIconProvider
  .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);

  $stateProvider
  .state('Orders', {
    url: "/Orders/:userId",
    templateUrl: "/OrdersUIRoute.html",
    controller:'AppCtrl'
  })
  .state('viewOrder', {
    url: "/Orders/:id",
    templateUrl: "/viewOrder.html",
    controller: 'ViewOrderController'
  })
  .state('getId',{
    url:"/",
    templateUrl:"/getId.html"
  })
});
