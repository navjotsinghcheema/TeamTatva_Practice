angular.module('sunburstGraph', ['ngMaterial'])
.directive('statistics',function(){
  return {
    restrict:'EA',
    // templateUrl:"statistics.html",
    controller:{

    },
    scope:{
      stats:"<stats"
    },
    templateUrl:"statistics.html",
    link:function(scope,element,attr){
      console.log("from statistics directive ",scope.stats);
      scope.$watch('stats',function(){
        console.log("hi im in stats link function");
      })
    }
  }
});
