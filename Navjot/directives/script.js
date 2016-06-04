angular.module('docsTemplateUrlDirective', [])
  .controller('Controller', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
  })
  .directive('myCustomer', function() {
    return {
      templateUrl: function(elem,attr){
        return 'customer-'+attr.type+'.html';
      }
    };
  });


  // angular.module('docsTemplateUrlDirective',[])
  // .controller('Controller',function($scope){
  //   $scope.customer = {
  //     name:'nav',
  //     zodiac:'sagittarius'
  //   };
  // })
  // .directive('myCustomer',function(){
  //   return {
  //     template : 'name: {{customer.name}} zodiac: {{customer.zodiac}}'
  //      };
  // });
