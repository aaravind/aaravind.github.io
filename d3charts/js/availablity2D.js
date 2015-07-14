/**
 * D3 Chart -Avaialbility of Product Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
 var available2D = function (chartId, chartdata) {
     if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
         function change() {
                var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
        if(data != '-Select-')
                exportfile(chartId,chartdata, 'Availability2D', '.' + data,true);
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
    var bottommargin = chartdata.chart.slant ? 50 : 25;
    var color = d3.scale.category20c();
    var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
      var chartcontent = d3.select(chartId);
    var width = chartcontent[0][0].offsetWidth;
    var height = chartcontent[0][0].offsetHeight;

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

    function xAxis() {
        return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
    }

    var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", Math.min(width + margin.left + margin.right, height + margin.top + margin.bottom))
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + Math.min(width + margin.left + margin.right, height + margin.top + margin.bottom))
        .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 5 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
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
      .attr("class", "grid xgrid")
      .call(xAxis()
              .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
            )
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
       .attr("class", "grid xgrid")
      .call(xAxis()
             .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)

            )

    }
    svg.selectAll(chartId+' .xgrid').selectAll('line')
          .style("stroke-dasharray", 3)
          .on('mouseover', function (d, i) {
             d3.select(this)
         .transition()
         .duration(0)
         .attr('stroke', '#4AC3FF')
        .style("stroke-dasharray", 0)
        .style("cursor","pointer")  
         })
          .on('mouseout', function (d) {
              d3.select(this)
          .transition()
         .duration(0)
         .attr('stroke', '')
         .style("stroke-dasharray", 3)
             
          });

    var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.data);
    var count = dataGroup.length;
    var heightvalue = height / count;
    var chartvalue = 0;
    dataGroup.forEach(function (d, i) {
        var color = chartdata.chart.pallattecolor[i];
        var keyid = d.key;
        var colorstyle = 'stroke:' + color + ' !important';
        drawbarchart('availability2D', d.values, color, d.key);
    });
    var countdatagroupvalues = dataGroup[0].values.length;
    d3.selectAll('#barchart21 .tick')
    .attr("transform", function (d, i) {
        i++;
        return "translate(" + i * width / countdatagroupvalues + ",0)";
    });
    function drawbarchart(cType, cData, cColor, cKey) {
        chartvalue = heightvalue + chartvalue;
        var availablerect = svg.selectAll(".availablerect")
      .data(cData)
    .enter().append("g");
        availablerect.append("rect")
    
      .attr("fill", function (d, i) {
          if (d.value != false)
              return chartdata.chart.pallattecolor[0];
          else
              return "transparent";
      })
      .attr("opacity",".7")
      .attr("x", function (d, i) {
          return i * width / cData.length;
      })
      .attr("width", width / cData.length)
      .attr("y", chartvalue)
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', function (d) {
          if (chartdata.chart.slant != true)
              return chartvalue - margin.bottom ;
          else
              return chartvalue - 25;
      })
      .attr('height', heightvalue / 3 +10);

        availablerect.append('text')
  .attr("x", function (d, i) {
      return i * width / cData.length;
  })
      .attr("y", chartvalue - 6.25)
      .text(function (d, i) {
          if (i == 0)
              return d.category;
          else
              return '';
      })
      .attr("dy","0em")
      .attr("dx","5px")
      .attr("fill","white");
    }



}