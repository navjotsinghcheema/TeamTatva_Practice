<<<<<<< HEAD
angular.module('orders', ['ngMaterial'])
.config(function($mdIconProvider) {
  $mdIconProvider
  .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
})

.controller('AppCtrl', function($scope, $http) {

  $http.get("http://localhost:8888/orders/" + "{{userId}}").success(function(response){
    $scope.orders = response;
    $http.get("http://localhost:8888/productList/").success(function(response1){
      $scope.productDetails=function(id){
        for(var i in response1)
        {
          if(id==response1[i].productId){
            return $scope.products={
              productName:response1[i].productName,
              cost:response1[i].cost,
              image:response1[i].image
            };
          }
        }
      }
    });
  });
});

// .controller('UserOrders',function($scope,$http){
//   $http.get("http://localhost:8888/orders/?userId=1")
// });
=======
angular.module('orders', ['ngMaterial'])
.config(function($mdIconProvider) {
  $mdIconProvider
  .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
})

.controller('AppCtrl', function($scope, $http) {

  $http.get("http://localhost:8888/orders/" + "{{userId}}").success(function(response){
    $scope.orders = response;
    $http.get("http://localhost:8888/productList/").success(function(response1){
      $scope.productDetails=function(id){
        for(var i in response1)
        {
          if(id==response1[i].productId){
            return $scope.products={
              productName:response1[i].productName,
              cost:response1[i].cost,
              image:response1[i].image
            };
          }
        }
      }
    });
  });
});

// .controller('UserOrders',function($scope,$http){
//   $http.get("http://localhost:8888/orders/?userId=1")
// });
>>>>>>> 91a19d8c6cb6a76a4e716366d46e46cb75949bf6
