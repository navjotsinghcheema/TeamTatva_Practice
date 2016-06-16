angular.module('sunburst').controller('sunburstGraph',function($scope,$http){
  var currentInstance=null;
  $http.get(./test9.json).then(function(res){
    var sunburstData = res.data;
  }, function(res){
    console.log("JSON not found/invalid");
  });
});
angular.module('sunburst').directive('sunburstChart',function($scope){
  return{
    scope:{
      data:"<sunburstData",
      currentInstance:"=currentInstance"
    },
    link:function(scope,element,attrs){
      var data = null;

      $scope.watch('data',function(){
        data=scope.data;
        drawMap();
      },true);


      var width = 960,
          height = 700,
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

      var svg = d3.select("body").append("svg")
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
      function drawMap() {
        if(error){console.log("invalid JSON");}
        node = root;
        console.log("root ",root);
        var path = svg.datum(root).selectAll("path")
            .data(partition.nodes)
          .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
              // console.log(colors[JSON.stringify(d.instanceType)]);
              // console.log(d.instanceType);
              // if(colors[d.instanceType]){return colors[d.instanceType];}
              // else{return "grey";}
              if(d.instanceType=="watch"){return "red"};
              if(d.instanceType=="superUser"){return tattvaColor};
              if(d.instanceType=="organization"){return organizationColor};
              if(d.instanceType=="user"){return userColor};
              if(d.instanceType=="watchlists owned"){return "black"};
              if(d.instanceType=="Data Instance"){return instanceColor};
            }
            )
            .on("click", click)
            .each(stash);

        function click(d) {
          node = d;
          path.transition()
            .duration(700)
            .attrTween("d", arcTweenZoom(d));
        }
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
        console.log(d);
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(d, i) {
          return i
              ? function(t) { return arc(d); }
              : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        };
      }

    }
  }
}
