<<<<<<< HEAD

angular.module('myApp',['ngMaterial','ui.router'])

.controller('ctrl',function($scope){})



.controller('productController', function($scope,$http,$stateParams)
{
  $scope.desclist=function(){
    $http.get("http://localhost:8080/productList/",{params:{productId:$stateParams.productId}}).success(function(data){
      $scope.descList = data;

    })
  }

    $scope.params = $stateParams;
   $scope.desclist();

})

.factory()


.config(function($stateProvider) {
 $stateProvider
   .state('product', {
     url:'/product/:productId',
    templateUrl: '/desc.html',
    controller: 'productController',

  })
  .state('products', {
    url:"/products",
   templateUrl: '/iotwork.html',

 })


})


.controller('ctrl',function ($scope, $http,$state)
{
  $state.go('products');
  $scope.productlist=function(){
    $http.get("http://localhost:8080/productList/").success(function(response){
      $scope.productList = response;
    })
   }
   $scope.predicate = 'cost';
 $scope.reverse = true;
 $scope.order = function(predicate) {
   $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   $scope.predicate = predicate;
 };
   $scope.productlist();

});
=======

angular.module('myApp',['ngMaterial','ui.router'])

.controller('ctrl',function($scope){})



.controller('productController', function($scope,$http,$stateParams)
{
  $scope.desclist=function(){
    $http.get("http://localhost:8080/productList/",{params:{productId:$stateParams.productId}}).success(function(data){
      $scope.descList = data;

    })
  }

    $scope.params = $stateParams;
   $scope.desclist();

})

.factory()


.config(function($stateProvider) {
 $stateProvider
   .state('product', {
     url:'/product/:productId',
    templateUrl: '/desc.html',
    controller: 'productController',

  })
  .state('products', {
    url:"/products",
   templateUrl: '/iotwork.html',

 })


})


.controller('ctrl',function ($scope, $http,$state)
{
  $state.go('products');
  $scope.productlist=function(){
    $http.get("http://localhost:8080/productList/").success(function(response){
      $scope.productList = response;
    })
   }
   $scope.predicate = 'cost';
 $scope.reverse = true;
 $scope.order = function(predicate) {
   $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   $scope.predicate = predicate;
 };
   $scope.productlist();

});
>>>>>>> 91a19d8c6cb6a76a4e716366d46e46cb75949bf6
