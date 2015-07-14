/**
 * D3 Chart - Gauge2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var gauge2D = function (chartId, chartdata) {
    if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
          function change() {
                var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
        if(data != '-Select-')
                exportfile(chartId,chartdata, 'GaugeChart', '.' + data,false);
            }
        if (chartdata.export.showexport == true) {
            var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:25px ;border: 0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;'),
    options = select.selectAll('option').data(chartdata.export.format); // Data join
            
            // Enter selection
            options.enter().append("option").text(function (d) {
                return d;
            });

          
        }
    }

    if (d3.select(chartId).select('svg')[0][0] != null)
        d3.select(chartId).select('svg').remove();
    var bottommargin = 25;
    var color = d3.scale.category20c();
    var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
    var chartcontent = d3.select(chartId);
    var width = chartcontent[0][0].offsetWidth;
    var height = chartcontent[0][0].offsetHeight;
    var charttranslate = 3 * height / 4;
    var radius = Math.min(width, height) / 2;
    var innerradius = radius / 2;
    var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
    var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: center;width: auto;height: auto;padding: 2px;font: 12px sans-serif;background: black;border: 0px;border-radius: 8px;pointer-events: none;color:white");

    len = height / 3;
    rad = len / 6;
    var recalcPointerPos = function (perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - len * Math.cos(thetaRad);
        topY = centerY - len * Math.sin(thetaRad);
        leftX = centerX - rad * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - rad * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - rad * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - rad * Math.sin(thetaRad + Math.PI / 2);
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    percToDeg = function (perc) {
        return perc * 360;
    };

    percToRad = function (perc) {
        return degToRad(percToDeg(perc));
    };

    degToRad = function (deg) {
        return deg * Math.PI / 180;
    };


    var svg = d3.select(chartId)
          .append('svg')
          .attr('width', "100%")
          .attr('height', "100%")
          .attr('viewBox', '0 0 ' + Math.min(width, height + 30) + ' ' + Math.min(width, height + 30))
        .attr('preserveAspectRatio', 'xMidYMid')
          .append('g')
          .attr('transform', 'translate(' + Math.min(width, height + 30) / 2 +
            ',' + (charttranslate) + ')');

    svg.append("text")
        .attr("x", 0)
        .attr("y", -10 - height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("text-decoration", "underline")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption);


    var arc = d3.svg.arc()
          .outerRadius(radius).innerRadius(innerradius);

    var arcOver = d3.svg.arc()
    .innerRadius(innerradius + 10)
    .outerRadius(radius + 10);

    var pie = d3.layout.pie()
          .value(function (d) { return chartdata.gauge.range; })
           .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
          .sort(null);



    function tweenPie(finish) {
        var start = {
            startAngle: 0,
            endAngle: 0
        };
        var i = d3.interpolate(start, finish);
        return function (d) { return arc(i(d)); };
    }

    var path = svg.selectAll('.gaugepath')
          .data(pie(chartdata.data))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('style', function (d, i) {
              return "fill:" + chartdata.chart.pallattecolor[i] + ";stroke:black;stroke-width: 1px;";
          }).on("mouseover", function (d, i) {

              div.transition()
                .duration(200)
                .style("opacity", .9);

              if (chartdata.data[i].tooltext != undefined) {
                  div.html(chartdata.data[i].tooltext)
            .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
              }
              else {
                  if (i == 0)
                      var rangefirst = 0
                  else
                      var rangefirst = chartdata.gauge.range * (i);
                  div.html(chartdata.data[i].label + '<br><hr>' + rangefirst + '-' + (chartdata.gauge.range * (i + 1)))
             .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
              }
              d3.select(this).transition()
                    .duration(300)
                    .attr("d", arcOver)
                    .style("opacity", '0.8');
          })
        .on("mouseout", function (d, i) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this).transition()
                    .duration(300)
                    .attr("d", arc)
                     .style("opacity", '1');
        })
        .on('resize', function () {
            console.log("hi");
        });


    if (chartdata.chart.showlegend) {
        var legend = svg.selectAll('.legend')
        .data(chartdata.data)
        .enter()
      .append('g')
        .attr('class', 'legend');
        legend.append('rect')
        .attr('x', width / 4)
        .attr('y', function (d, i) { return i * 20 - height / 2; })
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i];
        });

        legend.append('text')
        .attr('x', width / 4 + 10)
        .attr('y', function (d, i) { return (i * 20) + 9 - height / 2; })
        .text(function (d) { return d.label; })
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i]
        });
    }



    var needle = svg
    .append("g")
    .attr("class", "needle")
    .attr("transform", "translate( 0 , 0 )")
    .append("path")
    .attr("class", "tri")
    .attr("d", recalcPointerPos(1))
    .style("stroke", "black")
     .style("fill", "black")
     .transition()
        .duration(2000)
        .attrTween("transform", tween);
    function tween(d, i, a) {
        return d3.interpolateString("rotate(-180, 0, 0)", "rotate(" + ((180 / 100) * (chartdata.gauge.pointer * 100) - 180) + ", 0, 0)");
    };
    var needlecircle = svg.append('circle')
        .attr('class', 'needle-center')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', rad);


};




