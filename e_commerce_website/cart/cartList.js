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
        $scope.summaryDesc=function(productName,totalCost) {
          //alert("gh");
           //$scope.status=' ';
          // $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
           var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        $mdDialog.show({
          //controller:Otherctrl;
          //alert("gh");
          templateUrl:'summaryCart.html',
          parent: angular.element(document.body),
          targetEvent: productName,totalCost,
          clickOutsideToClose:true,
          // fullscreen: useFullScreen

        })
//         .then(
//        function(answer) {
//          $scope.status = 'You said the information was "' + answer + '".';
//        },
//        function() {
//          $scope.status = 'You cancelled the dialog.';
//        }
//    );
//    function DialogController($scope, $mdDialog) {
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
//
//   $scope.answer = function(answer) {
//     $mdDialog.hide(answer);
//   };
// }

        }

      });
    });
  }
  // $scope.summaryDesc=function(id) {
  //   alert("gh");
  //    $scope.status=' ';
  //    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  //
  // $mdDialog.show({
  //   controller:OtherCtrl;
  //   templateUrl:'summaryCart.html',
  //   parent: angular.element(document.body),
  //   targetEvent: ev,
  //   clickOutsideToClose:true,
  //   fullscreen: useFullScreen
  //
  // })
  //
  // }

});
