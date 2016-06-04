angular.module('docsSimpleDirective',[])
.contoller('Controller',function($scope){
  $scope.customer = {
    name:'nav',
    zodiac:'sagittarius'
  };
})
.directive('myCustomer',function(){
  return {
    template : 'Name:{{customer.name}} zodiac:{{customer.zodiac}}'
  };
});
