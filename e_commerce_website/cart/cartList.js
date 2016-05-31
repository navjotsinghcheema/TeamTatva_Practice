angular.module('myCart',['ngMaterial'])

.controller('Cartctrl', function($scope,$http,$mdDialog,$mdMedia) {
  $scope.getOrder = function(forUserId) {
    $http.get("http://localhost:8080/users", {params: {'userId': forUserId}}).success(function(response){
      $scope.cart=response;
      $http.get("http://localhost:8080/productList").success(function(response1){
        $scope.products=response1;
        $scope.productDesc=function(id){
          for(var i in response1){
            if(id==response1[i].productId){
              return obj={
                productName:response1[i].productName,
                cost:response1[i].cost,
                specs:response1[i].specs,
                image:response1[i].image,

              };
            }
          }
        }
        $scope.summaryDesc=function(ev) {
          //alert("gh");
           //$scope.status=' ';
          // $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
           var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
           console.log
        $mdDialog.show({
            controller: function($scope, productName) {
           $scope.productName = productName;
           //$scope.totalCost = totalCost;
            },
          //alert("gh");
          templateUrl:'summaryCart.html',
          parent: angular.element(document.body),
          targetEvent:ev,
          clickOutsideToClose:true,
          locals: {productName: $scope.productName}

          // fullscreen: useFullScreen

        })

        }

      });
    });
  }


});
