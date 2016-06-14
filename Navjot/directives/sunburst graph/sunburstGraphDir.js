angular.module('sunburst').controller('sunburstGraph',function($scope){
  $http.get("/<url of the json file>").then(function(res){
    $scope.sunburstData = res.data;
  }, function(res){
    //error
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

    // defining d3 attributes
    var width = 960,
        height = 700,
        radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    //defining color coding on the basis of instanceType
    // var color = d3.scale.category20c;
    var tattvaColor = "#258faf";
    var organizationColor = "#25afa2" ;
    var userColor = "#af25ab";
    var watchColor = "#ac9b98";
    var instanceColor = "#afa925";

    //defining svg element
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
        .sort(null)
        .value(function(d) { return 1; });

    //arc creation logic
    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

        // Keep track of the node that is currently being displayed as the root.
        var node;
        function drawMap() {
          node = root;
          console.log("root ",root);
          //here root should correspond to Tattva Admin
          var path = svg.datum(root).selectAll("path")
              .data(partition.nodes)
            .enter().append("path")
              .attr("d", arc)
              .style("fill", function(d) {
                if((d.children ? d : d.parent).instanceType=="watch"){console.log("watch inside instance");};
                if((d.children ? d : d.parent).instanceType=="superUser"){return tattvaColor};
                if((d.children ? d : d.parent).instanceType=="organization"){return organizationColor};
                if((d.children ? d : d.parent).instanceType=="user"){return userColor};
                if((d.children ? d : d.parent).instanceType=="watchlists owned"){return "black"};
                if((d.children ? d : d.parent).instanceType=="Data Instance"){return instanceColor};
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
          $scope.currentInstance = d;
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
      });

      );
