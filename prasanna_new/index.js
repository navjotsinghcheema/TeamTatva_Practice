var myApp=angular.module("myApp",[]);
myApp.controller("studentController",['$scope',function($scope){
$scope.student={ name:"kp",
age:"22",
subject:"Maths"
}
}]);
myApp.directive('myDirective',function(){
  return
  {

    template:"hello from custom directive"

  }
})
myApp.directive('studentDetail',function(){
  return{
    template:"<b>hey{{student.name}}is {{student.age}}</b>",
    restrict:'E'
  }
});
