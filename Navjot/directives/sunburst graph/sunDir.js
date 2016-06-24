angular.module('sunburst', ['ngMaterial'])
.controller('sunburstGraph',['$scope','$http',function($scope, $http){
  var currentInstance=null;
    function getGraphdata() {
    $http.get('/test9.json').then(function(res){
      $scope.sunburstData = res.data;
      // console.log("Graph data from server: ", res.data);
    },function(res){
      console.log("Error in getting graph data from server, error: ", res.data);
    });
    // $scope.selection={};
  }
  getGraphdata();

  function onSelectedData(data) {
    $scope.currentSelection = data;
  }

  }])
.directive('sunburstchart',function(){
  return{
    restrict:'EA',
    templateUrl:"sunDir.html",
    controllerAs :'ctrl',
    // template: "<div id='sunburstcontainer'></div> ",
    scope:{
      data:"<data",
      change: '&change'
      // selectedinstance:"=selectedinstance"
    },
    controller: ['$scope',function ($scope){
      // $scope.someVar = {"one":"SomeString"};
      $scope.selectedinstance={"name":"tattva"};
      setSelectDetails=function(d){
        // $scope.someVar.one="BLAAAA";

        // console.log($scope.someVar);
        // console.log($scope.selectedinstance);

        // console.log(typeof $scope.selectedinstance);


        // function isCyclic (obj) {
        //   var seenObjects = [];
        //
        //   function detect (obj) {
        //     if (obj && typeof obj === 'object') {
        //       if (seenObjects.indexOf(obj) !== -1) {
        //         return true;
        //       }
        //       seenObjects.push(obj);
        //       for (var key in obj) {
        //         if (obj.hasOwnProperty(key) && detect(obj[key])) {
        //           console.log(obj, 'cycle at ' + key);
        //           console.log(obj[key]);
        //           console.log(obj[key] == obj);
        //           return true;
        //         }
        //       }
        //     }
        //     return false;
        //   }
        //
        //   return detect(obj);
        // }
        // $scope.keys;
        var count=0;
        $scope.$apply(function(){
          // console.log("I am inside $apply");
          console.log(++count);
          $scope.selectedinstance=d;
          // $scope.keys = Object.keys(d);
          // console.log($scope.keys);
          // console.log($scope.selectedinstance[$scope.keys[2]]);
          // var cyclic = isCyclic($scope.selectedinstance.children[0]);
          console.log("currentInstance",$scope.selectedinstance);
          // console.log("Cyclic: ", cyclic);
        });
      }
      // $scope.selectedinstance={name:"tattva",instanceType:"superUser",children:[{name:"organization1",instanceType:"organization"}]};
      // $scope.$watch('$scope.selectedinstance',function(nv,ov){
      //   console.log($scope.selectedinstance);
      // });
    }],
    link:function(scope, element, attrs){
      // scope.selectedinstance = {};
      console.log(scope.selectedinstance);
      // var selectedinstance = {};
            scope.$watch('data', function(nv, ov) {
        // console.log("Got new data for graph in $watch: ", nv);
        scope.data = nv;
        root = scope.data;
        if(root)
          drawMap(root);
      });
      var width = 400,
          height = 400,
          radius = Math.min(width, height) / 2;

      var x = d3.scale.linear()
          .range([0, 2 * Math.PI]);
      var y = d3.scale.sqrt()
          .range([0, radius]);

      // var colors = {
      //   "tattvaColor" : "#258faf",
      //   "organizationColor" : "#25afa2",
      //   "userColor" : "#af25ab",
      //   "watchColor" : "#ac9b98",
      //   "instanceColor" : "#afa925"
      // };
      // var color = d3.scale.category20c();
      var tattvaColor = "#258faf";
      var organizationColor = "#25afa2" ;
      var userColor = "#af25ab";
      var watchColor = "#ac9b98";
      var instanceColor = "#afa925";

      var svg = d3.select('#sunburstcontainer').append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

      var partition = d3.layout.partition()
          .sort(null)
          .value(function(d) { return 1; });

      var arc = d3.svg.arc()
          .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
          .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
          .innerRadius(function(d) { return Math.max(0, y(d.y)); })
          .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

      var node;
      function drawMap(root) {
        node = root;
        var path = svg.datum(root).selectAll("path")
            .data(partition.nodes)
          .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
              if(d.instanceType=="watch"){return "red"};
              if(d.instanceType=="superUser"){return tattvaColor};
              if(d.instanceType=="organization"){return organizationColor};
              if(d.instanceType=="user"){return userColor};
              if(d.instanceType=="watchlists owned"){return "black"};
              if(d.instanceType=="Data Instance"){return instanceColor};
            })
            .on("click", click)
            // .on("mouseover",updateLegend)
            // .on("mouseout",removelegend)
            .each(stash);

        function click(d) {
          node = d;
          path.transition()
            .duration(700)
            .attrTween("d", arcTweenZoom(d));
      // svg.select("g").append("svg:text")
      //   .style("font-size","4em")
      //   .style("font-weight","bold")
      //   .text(function(d) { return d.name; });
        }
        // var legend = svg.append("g")
        //                 .attr("class","legend")
        //                 .style("font-size","12px")
        //                 .attr("transform", "translate(0, 20)");
        //                 // .call(d3.legend);
        // function legend_function(d)
        // {
        //   return "<h2>"+d.name+"</h2><p>"+"Instance Type: "+d.instanceType+"</p>";
        // }
        // function updateLegend(d){
        //   legend.html(legend_function(d));
        //   legend.transition().duration(200).style("opacity","1");
        // }
        // function removelegend(d){
        //   legend.transition().duration(1000).style("opacity","0");
        // }
      }
      d3.select(self.frameElement).style("height", height + "px");

      // Setup for switching data: stash the old values for transition.
      function stash(d) {
        d.x0 = d.x;
        d.dx0 = d.dx;
      }

      // When switching data: interpolate the arcs in data space.
      function arcTweenData(a, i) {
        var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        function tween(t) {
          var b = oi(t);
          a.x0 = b.x;
          a.dx0 = b.dx;
          return arc(b);
        }
        if (i == 0) {
         // If we are on the first arc, adjust the x domain to match the root node
         // at the current zoom level. (We only need to do this once.)
          var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
          return function(t) {
            x.domain(xd(t));
            return tween(t);
          };
        } else {
          return tween;
        }
      }
      // When zooming: interpolate the scales.
      function arcTweenZoom(d) {
        // console.log("printing from dir",d);
        var obj=createobj(d);
        // setSelectDetails(d);
        change(d);
        // scope.selectedinstance=d;
        // console.log("selected instance:",scope.selectedinstance);
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(d, i) {
          return i
              ? function(t) { return arc(d); }
              : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        };
      }
      function createobj(d){
        var returnObject = {
          name: d.name,
          instanceType:d.instanceType
        };
        // if(d.children[0].name)

        if(d.children[0].name){
        // returnObject[d.children[0].instanceType] = d.children.length;}
        returnObject["children"]=d.children.length;}
        return returnObject;
      }
    }
  };
});
