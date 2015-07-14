/**
 * D3 Chart - Pie2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
 var pie2D = function (chartType, chartId, chartdata) {

      if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
          function change() {
                var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
        if(data != '-Select-')
                exportfile(chartId,chartdata, chartType, '.' + data,false);
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
    var bottommargin = chartdata.chart.slant ? 100 : 25;
    var color = d3.scale.category20c();
    var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
      var chartcontent = d3.select(chartId);
    var width = chartcontent[0][0].offsetWidth;
    var height = chartcontent[0][0].offsetHeight - 30;
    var charttranslate = chartType == "SemiDoughnut2D" || chartType == "SemiPie2D" ? 3 * height / 4 : (height / 2 + 25);
    var radius = 2 * Math.min(width, height) / 5;
    var innerradius = chartType == "Doughnut2D" || chartType == "SemiDoughnut2D" ? radius / 2 : 0;
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

    if (chartType == 'SemiPie2D' || chartType == 'SemiDoughnut2D') {
        var pie = d3.layout.pie()
          .value(function (d) { return d.value; })
           .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
          .sort(null);
    }
    else {
        var pie = d3.layout.pie()
          .value(function (d) { return d.value; })

          .sort(null);
    }


    function tweenPie(finish) {
        var start = {
            startAngle: 0,
            endAngle: 0
        };
        var i = d3.interpolate(start, finish);
        return function (d) { return arc(i(d)); };
    }

    var path = svg.selectAll('path')
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
                  div.html(chartdata.data[i].label + '<br><hr>' + chartdata.data[i].value)
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
                  .transition()
    .duration(1000)
    .attrTween('d', tweenPie);


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
};




