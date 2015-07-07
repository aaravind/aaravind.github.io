/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var column2D = function (chartId, chartdata) {
     if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
           function change() {
                var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
        if(data != '-Select-')
                exportfile(chartId,chartdata, 'Column2D', '.' + data,false);
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
    if( d3.select(chartId).select('svg')[0][0] != null)
       d3.select(chartId).select('svg').remove();
    var bottommargin = chartdata.chart.slant ? 100 : 50;
    var color = d3.scale.category20c();
    var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
 var chartcontent = d3.select(chartId);
  var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
    var height = chartcontent[0][0].offsetHeight -margin.bottom - margin.top;
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
    .attr("height", "100%")
    .attr('viewBox','0 0 '+ (width + margin.left + margin.right) +' '+ (height + margin.top + margin.bottom) )
        .attr('preserveAspectRatio','xMinYMin')
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
    y.domain([0, d3.max(chartdata.data, function (d) { return d.value; })]);


    if (chartdata.chart.slant) {
        if (chartdata.chart.slantdegree != undefined)
            rotatevalue = "rotate(-" + chartdata.chart.slantdegree + ")";
        else
            rotatevalue = "rotate(-" + 65 + ")";
        svg.append("g")
      .attr("style", styleborder)
      .attr("transform", "translate(0," + height + ")")
      .call(xaxis)
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return rotatevalue
            });
    }
    else {
        svg.append("g")
      .attr("style", styleborder)
      .attr("transform", "translate(0," + height + ")")
      .call(xaxis);
    }
    svg.append("g")
  .attr("class", "grid")
      .call(yaxis()
       .tickSize(-width, 0, 0)
            )
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);
    svg.selectAll(".column")
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
      .attr("width", x.rangeBand())
      .attr("y", height)
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', function (d) { return y(d.value); })
      .attr('height', function (d) { return height - y(d.value); });


}