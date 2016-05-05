/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */

 (function() {

// Inspired by http://informationandvisualization.de/blog/box-plot
d3.box = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = boxWhiskers,
      quartiles = boxQuartiles,
      tickFormat = null;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var g = d3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = d.quartiles = quartiles(d);

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
          : d3.range(n);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
          .style('stroke','black')
          .style('stroke-dasharray','3,3')
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();
              countgrad++;
      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData]);
     var gradienteach = g.selectAll("linearGradient.grad")
          .data([quartileData]);
              var gradient = gradienteach.enter()
    .append("linearGradient")
    .attr("y1", function(d) { return x1(d[2]); })
    .attr("y2", function(d) { return  x1(d[2]) + (x1(d[0]) - x1(d[2])); })
    .attr("x1", "0")
    .attr("x2", "0")
    .attr("id",function(d,i){
        return "gradient" + countgrad})
    .attr("gradientUnits", "userSpaceOnUse")
    
gradient
    .append("stop")
    .attr("offset", "0")
    .attr("stop-color", colorsmap[1].value)
    
gradient
    .append("stop")
    .attr("offset", "1")
    .attr("stop-color", colorsmap[0].value);  

      box.enter().append("rect")
          .attr("class", "box")
          .attr("x", width/4)
          .attr("y", function(d) { return x0(d[2]); })
          .attr("width", width/2)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
          .attr("rx", "5")
          .attr("ry", "5")
          .style("fill", function(d,i){
            return "url(#gradient"+countgrad+")"})
          .style('stroke','none')
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });
      
      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });


            box.enter().append("text")
      .attr("class", "textaxis")
      .attr("x", width/2)
      .attr("y", height+20)
      .style('text-anchor','middle')
      .text('asd');


      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", width/4)
          .attr("y1", x0)
          .attr("x2", 3*width/4)
          .attr("y2", x0)
          .style('stroke',colorsmap[2].value)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", width/3)
          .attr("y1", x0)
          .attr("x2", 2*width/3)
          .attr("y2", x0)
          .style("opacity", 1e-6)
          .style("stroke",function(d,i){
            if(i == 0)
                return colorsmap[0].value
            else 
                return colorsmap[1].value

          })
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();

      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      outlier.enter().insert("circle", "text")
          .attr("class", "outlier")
          .attr("r", 5)
          .attr("cx", width / 2)
          .attr("cy", function(i) { return x0(d[i]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.exit().transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData);

      boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : 6 })
          .attr("x", function(d, i) { return i & 1 ? (width-width/4) : (width-width/4) })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "start"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", (width-width/3))
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return box;
  };

  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };
  box.colorsmap = function(x) {
    if (!arguments.length) return colorsmap;
    colorsmap = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

function boxWhiskers(d) {
  return [0, d.length - 1];
}

function boxQuartiles(d) {
  return [
    d3.quantile(d, .25),
    d3.quantile(d, .5),
    d3.quantile(d, .75)
  ];
}

})();

var boxplot2D = function (chartId, chartdata, chartType) {


    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {


            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'Pricing', '.' + data, false);
                        else
                            exportfile(chartId, chartdata, chartdata.export.filename, '.' + data, false);
                    }
                }
                if (chartdata.export.showexport == true) {
                    var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:35px ;height:20px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px'),
    options = select.selectAll('option').data(chartdata.export.format); // Data join

                    // Enter selection
                    options.enter().append("option").text(function (d) {
                        return d;
                    });


                }
            }
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var min = Infinity,max = -Infinity;
            var bottommargin = chartdata.chart.slant ? 100 : 50;
            var topval = 30;
            var color = d3.scale.category20c();
            var margin = { top: topval, right: 12, bottom: bottommargin, left: 12 };
            var marginbox = { top: 10, right: 20, bottom: 10, left: 20 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var widthbox = (chartcontent[0][0].offsetWidth/chartdata.data.length) - marginbox.left - marginbox.right;
            if(widthbox<50)
                widthbox = 50
            var translatedistance = (width-(widthbox*chartdata.data.length))/chartdata.data.length;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var heightbox = chartcontent[0][0].offsetHeight - margin.bottom - margin.top - 30;
            var styleborder = "fill: none; stroke: lightgrey;  shape-rendering: crispEdges;font:12px sans-serif";
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
                       var y = d3.scale.linear()
                               .range([height, 30]);

                                           function yaxis() { 
                return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
            }
y.domain([d3.min(chartdata.data, function(c) { return d3.min(c.data, function(v) { return v.value; }); }),
              d3.max(chartdata.data, function(c) { return d3.max(c.data, function(v) { return v.value; }); }) ]);
           var chart = d3.box()
                .whiskers(iqr(1.5))
                .width(widthbox-marginbox.left-marginbox.right)
                .height(heightbox)
                .colorsmap(chartdata.colormap);

                function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}

var databox = [];
 chartdata.data.forEach(function(d,i) {
    var categtemp = i;
    d.data.forEach(function(x){
        var s = Math.floor(x.value),
        d = databox[categtemp];
    if (!d) d = databox[categtemp] = [s];
    else d.push(s);
    if (s > max) max = s;
    if (s < min) min = s;       
    })

  });

  chart.domain([min, max]);

            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + 70) + ' ' + (height + margin.top + margin.bottom + 10))
        .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');
            if (chartdata.chart.twoxaxis == true)
                ytop = 15 - (margin.top / 1);
            else
                ytop = 5 - (margin.top / 2);
            svg.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .attr('class', 'captiontext')
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption.toUpperCase());

            if (chartdata.chart.hiddencaption != undefined) {
                if (chartdata.chart.hiddencaption.length != 0) {
                    svg.append("text")
          .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "start")
         .attr('class', 'hiddencaptiontext')
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
         .style("display", "none")
        .style("fill", function (d) {
            return chartdata.chart.captionColor;
        })
        .text(chartdata.chart.hiddencaption.toUpperCase());
                }

            }

            if (chartdata.chart.subhiddencaption != undefined) {
                if (chartdata.chart.subhiddencaption.length != 0) {
                    svg.append("text")
           .attr("x", function (d) {
               return d3.select(chartId + ' .hiddencaptiontext').node().getBoundingClientRect().width + 10;
           })
        .attr("y", 7.5)
        .attr("text-anchor", "start")
         .attr('class', 'subhiddencaptiontext')
        .style("font-size", "12px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
         .style("display", "none")
        .style("fill", function (d) {
            return chartdata.chart.captionColor;
        })
     .text('(' + chartdata.chart.subhiddencaption.toUpperCase() + ')');
                }

            }

            if (chartdata.chart.subcaption != undefined) {
                if (chartdata.chart.subcaption.length != 0) {
                    svg.append("text")
        .attr("x", function (d) {
            return d3.select(chartId + ' .captiontext').node().getBoundingClientRect().width + 10;
        })
        .attr("y", 7.5)
        .attr("text-anchor", "start")
         .attr('class', 'subcaptiontext')
        .style("font-size", "12px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", function (d) {
            return chartdata.chart.subcaptionColor != undefined ? chartdata.chart.subcaptionColor : chartdata.chart.captionColor;
        })
        .text('(' + chartdata.chart.subcaption.toUpperCase() + ')');
                }
            }

                        svg.append("g")
  .attr("class", "gridy")
      .call(yaxis()
       .tickSize(-width-70, 0, 0)
            )

    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);
      d3.select(chartId + ' .gridy path.domain').attr('d', '');
        d3.selectAll(chartId + ' .gridy .tick text').attr('x', '0').attr('y', '10').style('text-anchor','start');
           
             countgrad = 0;
           svg.selectAll("box")
            .data(databox)
    .enter().append("g")
      .attr("class", "box")
      .attr("width", widthbox - marginbox.left - marginbox.right)
      .attr("height", heightbox - marginbox.bottom - marginbox.top)
      .attr("transform",function(d,i){
        if(i != 0)   
        return "translate(" + (translatedistance*i) + ",0" + ")"
      })
    .append("g")
      .attr("transform",function(d,i){
        return "translate(" + ((widthbox*i)+20) + "," + margin.top + ")"
      })
      .call(chart);
       d3.selectAll(chartId + ' .textaxis').text(function(d,i){
        return chartdata.data[i].category.toUpperCase();
       });
            if (chartdata.chart.credits != undefined) {
                if (chartdata.chart.credits.text != undefined && chartdata.chart.credits.text != '') {
                    var credits = svg.selectAll('.credits')
            .data([1])
            .enter().append('g');
                    var positionwidth;
                    var imagewidth;
                    if (chartdata.chart.credits.imageurl != undefined && chartdata.chart.credits.imageurl != '') {
                        positionwidth = -30;
                        imagewidth = -20;
                    }
                    else
                        positionwidth = 0;
                    credits.append('text')
            .attr("class", 'credits' + chartId.replace("#", ''))
                    // .attr("x", d3.select(chartId + ' .gridy .tick line')[0][0].getAttribute('x2') / 1)
           .attr("x", document.getElementById(chartId.replace('#', '')).offsetWidth - positionwidth)
            .attr("y", height + margin.bottom - 6)
            .attr("text-anchor", "end")
            .style("font-size", "10px")
            .style("stroke", "#ccc")
            .style("text-decoration", "none")
            .style("text-transform", "uppercase")
            .style("font-weight", "100")
            .style("stroke-width", "0.5px")
            .style("fill", chartdata.chart.credits.color)
            .text(chartdata.chart.credits.text.toUpperCase());


if (chartdata.chart.showlegend) {
                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup')
            .attr('transform','translate(0,20)');
                legendgroup.append('g')
            .append('rect')
            .attr('width', '110')
            .attr('height', chartdata.colormap.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 30)
            .attr('y', 12.5)
            .attr('stroke', 'lightgrey');

                var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
                legend.append('rect')
        .attr('x', width - 25)
        .attr('y', function (d, i) { return (i + 1) * 15; })
         .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', 0.7)
        .style('fill', function (d, i) {
            return d.value;
        });

                legend.append('text')
        .attr('x', width - 25 + 12)
        .attr('y', function (d, i) { return ((i + 1) * 15) + 9; })
        .text(function (d) {
            if (d.name.length > 20)
                return d.name.substr(0, 20).toUpperCase() + '...';
            else
                return d.name.toUpperCase();
        })
         .style('text-transform', 'uppercase')
         .style('opacity', 0.8)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = 1;
         })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              this.style.opacity = 0.8;
          });

            };


                    if (chartdata.chart.credits.imageurl != undefined && chartdata.chart.credits.imageurl != '') {
                        function getBase64FromImageUrl(url) {
                            var img = new Image();

                            img.onload = function () {
                                var canvas2 = document.createElement("canvas");
                                canvas2.width = this.width;
                                canvas2.height = this.height;

                                var ctx2 = canvas2.getContext("2d");
                                ctx2.drawImage(this, 0, 0);

                                var dataURL = canvas2.toDataURL("image/png");


                                credits.append('image')
                                //.attr('x', d3.select(chartId + ' .gridy .tick line')[0][0].getAttribute('x2') / 1 - 10)
            .attr('x', document.getElementById(chartId.replace('#', '')).offsetWidth - imagewidth)
            .attr("y", height + margin.bottom - 25)
            .attr("width", 40)
            .attr("height", 30)
            .attr("xlink:href", dataURL);



                            };

                            img.src = url;
                        }
                        getBase64FromImageUrl(chartdata.chart.credits.imageurl);
                    }
                }
            }
        }
        else {
            var bottommargin = chartdata.chart.slant ? 100 : 50;
            var margin = { top: 50, right: 20, bottom: bottommargin, left: 50 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + 70) + ' ' + (height + margin.top + margin.bottom + 10))
        .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            svg.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .text("NO DATA TO DISPLAY")
        .style('font-size', '12px')
        .style('fill', 'black');
        }
    }

}

