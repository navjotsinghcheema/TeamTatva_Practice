angular.module('sunburst')
.directive('selection',function(){
  return {
    restrict:'EA',
    templateUrl:"selection.html",
    // templateUrl:"statistics.html",
    // controller:{
    //   console.log("selection controller");
    // },
    scope:{
      data:"<data",
      stats:"<stats"
    },
    transclude:true,
    link:function(scope,element,attr){
      var found = false;
        scope.$watch('stats',function(){
          // scope.result = [];
          // found = false;
          // if(scope.data!=undefined && scope.stats!=undefined)
          // selectionTitle(scope.data,scope.stats,scope.result);
          console.log(scope.result);
        });
      // });
      // function selectionTitle(data,stats,result){
      //     if(found) {
      //   		return;
      //   	}
      //   	var tempData = data.children;
      //   	// result+=data.name+" ";
      //     scope.result.push(data.name);
      //       if(data.name===stats.name && data.instanceType===stats.instanceType) {
      //         console.log("result",result);
      //   		found = true;
      //   	} else if(tempData!=undefined && tempData.length>0) {
      //   		for(var i=0;i<tempData.length;i++) {
      //   			selectionTitle(tempData[i],stats,result);
      //   		}
      //   	}
      //   }
      }
    }
});
