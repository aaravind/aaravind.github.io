/**
 * D3 Chart - Bar Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
 var bar2D = function (chartId, chartdata) {
    if( d3.select(chartId).select('svg')[0][0] != null)
       d3.select(chartId).select('svg').remove();
    var bottommargin = chartdata.chart.slant ? 100 : 25;
    var color = d3.scale.category20c();
    var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
  var chartcontent = d3.select(chartId);
    var width = chartcontent[0][0].offsetWidth +margin.left + margin.right;
    var height = chartcontent[0][0].offsetHeight;
    var count = chartdata.data.length;
    var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
    var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: center;width: auto;height: auto;padding: 2px;font: 12px sans-serif;background: black;border: 0px;border-radius: 8px;pointer-events: none;color:white");
    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
    var y = d3.scale.linear()
    .range([height, 0]);
    var xaxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5);
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    function yaxis() {
        return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
          .tickFormat(function (d) {
              var prefix = d3.formatPrefix(d);
              return prefix.scale(d) + prefix.symbol;
          })
    }
    var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + Math.min(width + margin.left + margin.right, height + margin.top + margin.bottom))
        .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 5 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("text-decoration", "underline")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption);
    x.domain(chartdata.data.map(function (d) { return d.label; }));
    y.domain([0, height]);


     svg.append("g")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);


    svg.selectAll(".bar")
      .data(chartdata.data)
    .enter().append("rect")
    .on("mouseover", function (d, i) {
        div.transition()
                .duration(200)
                .style("opacity", .9);
        if (chartdata.data[i].tooltext != undefined) {
            div.html(chartdata.data[i].tooltext)
            .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }
        else {
            div.html(chartdata.data[i].label + '<br><hr>' + chartdata.data[i].value)
             .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }

    })
        .on("mouseout", function (d, i) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
      .attr("fill", function (d, i) { return chartdata.chart.pallattecolor[i]; })
      .attr("x", function (d) { return x(d.label); })
      .attr("width", width / count)
      .attr("y", height)
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', 0)
      .attr('height', height-margin.bottom);

    svg.selectAll(".text")
      .data(chartdata.data)
    .enter().append("text")
    .attr("x", function (d) { return x(d.label) + width/(count*2); })
    .attr("y", (height-margin.bottom) / 2)
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(function (d) { return d3.format("s")(d.value); })
    .attr("fill",chartdata.chart.color);

}