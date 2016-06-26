function binarySearch(a, key) {
  var low = 0,
      high = a.length - 1;
  while(low <= high) {
    var mid = Math.floor((low + high) / 2),
        midVal = a[mid];
    if(midVal < key) {
      low = mid + 1;
    } else if (midVal > key) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return low; //returns insertion index if not found
}

// add boxplot stats.
// m has .sortedVals
function addStats(m) {
  var vs = m.sortedVals,
      q1 = d3.quantile(vs, 0.25),
      q2 = d3.quantile(vs, 0.5),
      q3 = d3.quantile(vs, 0.75),
      iqr = q3 - q1;
  var i = -1,
      j = vs.length;
  while (vs[++i] < q1 - 1.5 * iqr);
  while (vs[--j] > q3 + 1.5 * iqr);

  var wl = vs[i], //whisker low
      wh = vs[j], //whisker high
      ol = vs.slice(0, i),        //outliers low
      oh = vs.slice(++j, vs.length); //outliers high
  m.min = vs[0];
  m.max = vs[vs.length-1];
  m.q1 = q1;
  m.q2 = q2;
  m.q3 = q3;
  m.wl = wl;
  m.wh = wh;
  m.ol = ol;
  m.oh = oh;
}

// sets group.reduce
// group => crossfilter group.
function setReduceStats(group, metric) {
  function reduceAdd(p, v) {
    var i = binarySearch(p.sortedVals,v[metric]);
    p.sortedVals.splice(i, 0, v[metric]);
    return p;
  }

  function reduceRemove(p, v) {
    var i = binarySearch(p.sortedVals, v[metric]);
    p.sortedVals.splice(i, 1);
    return p;
  }

  function reduceInitial() {
    return {sortedVals:[], min:0, max:0, wl:0, q1:0, q2:0, q3:0, wh:0, ol:[], oh:[]};
  }
  return group.reduce(reduceAdd, reduceRemove, reduceInitial);
}

var rbox = function() {
  var width = 960,
      height = 500,
      innerRadius = 80,
      scaleOverride = null,
      label = "",
      dimension,
      group,
      axisText = Object,
      color = "#3399FF"
  ;

  // selection => nested data
  function my(selection) {
    var svg = selection.select("svg g");
    if(svg.empty()) {
      selection = selection.append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr('class', 'star-container')
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      selection.append("g").attr("class", "layers");
      selection.append("g").attr("class", "axes");
      selection.append("g").attr("class", "outliers")
    } else {
      selection = svg;
    }

    var fill = [d3.rgb(color).brighter(), color, color, d3.rgb(color).brighter()];

    var outerRadius = height / 2 - 10;
    var angle = d3.time.scale()
      .range([0, 2 * Math.PI]);

    var radius = d3.scale.linear()
      .range([innerRadius, outerRadius]);

    var stack = d3.layout.stack()
      .offset("zero")
      .x(function(d) { return d.key; })
      .y(function(d) { return d.value; })
    ;

    var area = d3.svg.area.radial()
      .interpolate("cardinal-closed")
      .angle(function(d) { return angle(d.key); })
      .innerRadius(function(d) { return radius(d.y0); })
      .outerRadius(function(d) { return radius(d.y0 + d.y); });

    selection.each(function() { //groups
      var selection = d3.select(this),
          g = selection.select("g");

      var gs = group.all();
      gs.forEach(function(g) { addStats(g.value); });
      var ks = ["wl", "q1", "q2", "q3", "wh"];
      var nested = ks.map(function(k, i) {
        return gs.map(function(g) {
          var tmp = Object.create(g); //clone(ish)
          tmp.value = tmp.value[k] - (tmp.value[ks[i - 1]] || 0.0);
          return tmp;
        });
      });
      var layers = stack(nested);
      layers.shift(); //no need to draw first layer

      // Extend the domain slightly to match the range of [0, 2π].
      angle.domain([0, Math.floor(d3.max(gs, function(g) { return g.key; })) + 0.999]); // hour => [0, 24), day => [0, 7)
      if(scaleOverride) {
        radius.domain(scaleOverride);
      } else {
        radius.domain([d3.min(gs, function(g) { return g.value.min; }),
                       d3.max(gs, function(g) { return g.value.max; })]);
      }

      var selLabel = selection.selectAll(".label")
          .data([label]);
      selLabel.enter().append("text")
          .attr("class", "label")
          .attr("text-anchor", "middle");
      selLabel
          .text(function(d) { return d; })
          .style("opacity", 1);


      var selLayer = selection.select(".layers").selectAll(".layer")
          .data(layers);
      selLayer.enter().append("path")
          .attr("class", "layer")
          .attr("d", function(ds) { return area(ds.map(function(d) { return {key:d.key, y0:0, y:0}; })); })
          .style("fill", function(d, i) { return fill[i]; })
      selLayer
        .transition().duration(200)
          .attr("d", function(d) { return area(d); })
          .style("fill", function(d, i) { return fill[i]; });


      var outliersss = ["ol", "oh"].map(function(k) {
          return gs.map(function(g) {
              var theta = angle(g.key) - 0.5* Math.PI; //0 is at 12 o clock.
              return g.value[k].map(function(v) {
                  var h = radius(v);
                  var coord = {x: h * Math.cos(theta),
                               y: h * Math.sin(theta)};
                  return coord;
              });
          });
      });
      var outlierss = [].concat.apply([], outliersss),
          outliers = [].concat.apply([], outlierss);
      var selOutlier = selection.select(".outliers").selectAll(".outlier")
          .data(outliers);
      selOutlier.enter()
          .append("circle")
          .attr("class", "outlier")
      selOutlier
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", 2);
      selOutlier.exit()
          .remove();

      var selAxis = selection.select(".axes").selectAll(".axis")
        .data(d3.range(Math.floor(+angle.domain()[1]) + 1))
      selAxis.enter().append("g")
          .attr("class", "axis")
        .append("text")
          .attr("class", "axisLabel");
      selAxis //.transition().duration(1000)
          .attr("transform", function(d) { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
          .call(d3.svg.axis()
              .scale(radius.copy().range([-innerRadius, -outerRadius]))
              .orient("left"));
      selAxis.selectAll("text.axisLabel")
          .text(function(d) { return axisText(d); })
          .attr("y", -innerRadius + 6)
          .attr("dy", ".71em")
          .attr("text-anchor", "middle");
      selAxis.exit()
          .remove();
    });
  }

  /** Getter/Setters **/
  my.width = function(v) {
    if (!arguments.length) return width;
    width = v;
    return my;
  }
  my.height = function(v) {
    if (!arguments.length) return height;
    height = v;
    return my;
  }
  my.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = v;
    return my;
  }
  my.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = v;
    return my;
  }
  my.file = function(v) {
    if (!arguments.length) return file;
    file = v;
    return my;
  }
  my.scaleOverride = function(v) {
    if (!arguments.length) return scaleOverride;
    scaleOverride = (v[0] == 0 && v[1] == 0) ? null : v; //maybe do something better here?
    return my;
  }
  my.label = function(v) {
    if (!arguments.length) return label;
    label = v;
    return my;
  }
  my.dimension = function(v) {
    if (!arguments.length) return dimension;
    dimension = v;
    return my;
  }
  my.group = function(v) {
    if (!arguments.length) return group;
    group = v;
    return my;
  }
  my.axisText = function(_) {
    if (!arguments.length) return axisText;
    axisText = _;
    return my;
  };
  my.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return my;
  };
  return my;
};
