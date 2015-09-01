/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var column2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {


            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'Column2D', '.' + data, false);
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
            var bottommargin = chartdata.chart.slant ? 100 : 50;
            if (!chartdata.chart.twoxaxis)
                topval = 30;
            if (chartdata.chart.twoxaxis && chartdata.chart.slant)
                topval = 100;
            if (chartdata.chart.twoxaxis && !chartdata.chart.slant)
                topval = 50;
            var color = d3.scale.category20c();
            var margin = { top: topval, right: 12, bottom: bottommargin, left: 12 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
            var domarr = [];
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
            if (chartdata.chart.singlecolorgradient != undefined) {
                if (chartdata.chart.singlecolorgradient.length != 0) {
                    function sortNumber1(a, b) {
                        return b - a;
                    }
                    domarr = [];
                    for (i = 0; i < chartdata.data.length; i++)
                        domarr.push(chartdata.data[i].value);
                    domarr.sort(sortNumber1);
                    var colorsinglepallete = d3.scale.linear()
    .domain([0, chartdata.data.length])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
                }
            }

            if (chartType != 'StackedColumn2D') {
                if (chartdata.chart.showlegend != true && chartdata.chart.showlegend != undefined && chartType != 'ColumnRange2D')
                    var x = d3.scale.ordinal()
    .rangeRoundBands([20, width + 50], .1);
                else
                    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
            }

            if (chartdata.chart.twoxaxis == true) {
                var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
                var xaxis1 = d3.svg.axis()
    .scale(x1)
    .orient("top")
    .ticks(5);
                x1.domain(chartdata.data.map(function (d) { return d.label; }));
            }
            if (chartType == 'Column2D') {
                var checkposcount = 0;
                var checknegcount = 0;
                var checkzerocount = 0;
                for (i = 0; i < chartdata.data.length; i++) {
                    if (chartdata.data[i].value > 0)
                        checkposcount++;
                    else if (chartdata.data[i].value < 0)
                        checknegcount++;
                    else
                        checkzerocount++;
                };
                if (checkposcount + checkzerocount == chartdata.data.length) {
                    var y = d3.scale.linear()
    .range([height, 25]);
                }
                else if (checknegcount + checkzerocount == chartdata.data.length) {
                    var y = d3.scale.linear()
    .range([25, height]);
                }
                else {
                    var y = d3.scale.linear()
    .range([height, 25]);
                }
            }

            else {
                if (chartType != 'StackedColumn2D') {
                    var y = d3.scale.linear()
    .range([height, 25]);
                }
            }
            if (chartType == 'StackedColumn2D') {
                var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.data);
                var categorylength = dataGroup.length;
                var labellength = dataGroup[0].values.length;
                var series = dataGroup.map(function (d) {
                    return d.key;
                });
                var dataGroup = dataGroup.map(function (d) {
                    return d.values.map(function (o, i) {
                        // Structure it so that your numeric
                        // axis (the stacked amount) is y
                        for (j = 0; j < i; j++) {
                            yprevvalue = d.values[j].value;
                        }
                        return {
                            y: o.value,
                            x: o.label,
                            z: o.category,
                            yprev: i == 0 ? 0 : yprevvalue,
                            tool: o.tooltip != undefined ? o.tooltip : ''
                        };
                    });
                });
                var stack = d3.layout.stack();
                stack(dataGroup);
                var dataGroup = dataGroup.map(function (group) {
                    return group.map(function (d) {
                        // Invert the x and y values, and y0 becomes x0
                        return {
                            x: d.y,
                            y: d.x,
                            x0: d.y0,
                            z: d.z,
                            yprev: d.yprev,
                            tool: d.tool
                        };
                    });
                });
                domainmax = d3.max(dataGroup, function (group) {
                    return d3.max(group, function (d) {
                        return d.x + d.x0;
                    });
                })
                var labels = dataGroup[0].map(function (d) {
                    return d.y;
                });
                xScale1 = d3.scale.ordinal()
        .domain(labels)
        .rangeRoundBands([0, width])

                yScale1 = d3.scale.linear()
        .domain([0, domainmax])
        .range([height, 25], 0.1);
                function xAxis5() {
                    return d3.svg.axis()
        .scale(xScale1)
        .orient("bottom")
                }
                function yAxis1() {
                    return d3.svg.axis()
        .scale(yScale1)
        .orient("left")
        .ticks(5);
                }
                var color = d3.scale.linear()
    .domain([0, categorylength])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);

            }
            else {
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
            }


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

            if (chartType != 'StackedColumn2D')
                x.domain(chartdata.data.map(function (d) { return d.label; }));
            function Y0() {
                return y(0);
            }
            function Y(d) {
                return y(d);
            }
            if (chartType == 'Column2D') {
                var domainmaxcol = d3.max(chartdata.data, function (d) { return Math.abs(d.value) + (0.25 * Math.abs(d.value)); });
                if (checkposcount + checkzerocount != chartdata.data.length && checknegcount + checkzerocount != chartdata.data.length) {
                    y
          .domain(d3.extent(chartdata.data.map(function (d) { return d.value; })))
          .nice();
                    var domainminval = d3.min(chartdata.data, function (d) { return d.value + (0.25 * d.value); });
                }
                else {
                    domainminval = 0;
                    y.domain([domainminval, domainmaxcol]);
                }
            }
            else if (chartType == 'DoubleColumn2D') {
                var domainmaxcol = d3.max(chartdata.data, function (d) { return Math.abs(d.highvalue) + (0.25 * Math.abs(d.highvalue)); });
                var domainminval = d3.min(chartdata.data, function (d) { return d.lowvalue + 0.25 * d.lowvalue; });
                y.domain([domainminval, domainmaxcol]);
            }
            else {
                if (chartType != 'StackedColumn2D')
                    y.domain([chartdata.range.lowrange, chartdata.range.highrange]);
            }


            if (chartdata.chart.slant) {
                if (chartdata.chart.slantdegree != undefined)
                    rotatevalue = "rotate(-" + chartdata.chart.slantdegree + ")";
                else
                    rotatevalue = "rotate(-" + 65 + ")";
                if (chartType != 'StackedColumn2D') {
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
      .call(xAxis5().innerTickSize(-height + 25)
    .outerTickSize(0)
    .tickPadding(10))
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return rotatevalue
            });
                }


                if (chartdata.chart.twoxaxis == true) {
                    svg.append("g")
      .attr("style", styleborder)
      .attr("class", "texttop")
      .attr("transform", "translate(0," + 0 + ")")
      .call(xaxis1)
      .selectAll("text")
            .style("text-anchor", "start")
            .attr("x", "1.5em")
            .attr("dx", "-.8em")
            .attr("dy", "1em")
            .attr("transform", function (d) {
                return rotatevalue
            });
                    d3.selectAll(".texttop").selectAll("text").data(chartdata.data)
    .text(function (d) {
        return d.axistop;
    });
                }
            }
            else {
                if (chartType != 'StackedColumn2D') {
                    svg.append("g")
      .attr("style", styleborder)
      .attr("class", "xtick")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xaxis);
                }
                else {
                    svg.append("g")
      .attr("style", styleborder)
      .attr("class", "xtick")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis5().innerTickSize(-height + 25)
    .outerTickSize(0)
    .tickPadding(10));
                }

                if (chartdata.chart.twoxaxis == true) {
                    svg.append("g")
      .attr("style", styleborder)
      .attr("class", "texttop")
      .attr("transform", "translate(0," + 0 + ")")
      .call(xaxis1);
                    d3.selectAll(".texttop").selectAll("text").data(chartdata.data)
    .text(function (d) {
        return d.axistop;
    });
                }

            }
            if (chartType != 'StackedColumn2D') {
                svg.append("g")
  .attr("class", "grid exportgrid")
      .call(yaxis()
       .tickSize(-width, 0, 0)
            )
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);
            }
            else {
                svg.append("g")
  .attr("class", "grid exportgrid")
      .call(yAxis1().innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);
            }


            function drawstackbar(cType, cData) {

                var groups = svg.selectAll('.stackcol')
        .data(cData)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
            if (chartdata.colormap != undefined && chartdata.colormap != '') {
                for (i = 0; i < chartdata.colormap.length; i++) {
                    if (d[0].z == chartdata.colormap[i].name)
                        return chartdata.colormap[i].value;
                }
            }
            else
                return color(i);
        });
                var rects = groups.selectAll('rect')
        .data(function (d) {
            return d;
        })
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return xScale1(d.y) + xScale1.rangeBand() / 4;
        })
        .attr('width', function (d) {
            return xScale1.rangeBand() / 2;
        })
        .attr('class', function (d) {
            return 'Column' + d.z.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 0.5)
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = 1;
             div.transition()
                .duration(100)
                .style("opacity", .9);

             var xattr = bodyRect = elemRect = yattr = 0;
             var bodyRect = document.body.getBoundingClientRect();
             var elemRect = this.getBoundingClientRect();

             var yattr = (elemRect.top - bodyRect.top) + 'px';
             //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
             if (d.tool == '')
                 var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.z + ': ' + d.x + '</span>';
             else
                 var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.z + ': ' + d.tool + '</span>';
             var xattr = (elemRect.right - bodyRect.left + 10) + 'px';
             div.html(htmlcontent)
       .style("left", function (d) {
           if (xattr.replace('px', '') / 1 < window.innerWidth / 2)
               return (xattr.replace('px', '') / 1 + this.getAttribute('width') / 2) + 'px';
           else
               return (xattr.replace('px', '') / 1 - div[0][0].offsetWidth - (elemRect.right - elemRect.left + 5)) + 'px';
       })
                .style("top", yattr);
         })
            .on("mouseout", function (d, i) {
                this.style.cursor = 'pointer';
                this.style.opacity = 0.5;
                div.transition()
                .duration(100)
                .style("opacity", 0);
            })
                    .attr('height', 0)
                               .attr('y', function (d, i) {
                                   return yScale1(d.x0);
                               })
               .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
                      .attr('y', function (d, i) {
                          return yScale1(d.x + d.x0);
                      })
                     .attr('height', function (d) {
                         var summa = yScale1(d.x0) - yScale1(d.x + d.x0);
                         return summa;
                     });
            }
            var datarangeval;

            function drawrangerect(cType, cData, cLabel, heightzero) {

                function sortFunction(a, b) {
                    if (a[2] === b[2]) {
                        return 0;
                    }
                    else {
                        return (a[2] < b[2]) ? -1 : 1;
                    }
                }
                var sorteddata = cData.sort(sortFunction);
                var rangediff = 0;
                var domaincolorarray = [];
                var domainarray = [];
                rangediff = Math.round(cData.length / 5);
                for (j = 0; j < cData.length; j++) {

                    if (j < rangediff)
                        domaincolorarray.push({ "color": '#c7001e', "class": chartdata.colormap != undefined ? chartdata.colormap[0].name : 'Very Low' });
                    else if (j < 2 * rangediff) {
                        if (cData[j][2] == cData[j - 1][2])
                            domaincolorarray.push({ "color": domaincolorarray[j - 1].color, "class": domaincolorarray[j - 1].class });
                        else
                            domaincolorarray.push({ "color": '#f6a580', "class": chartdata.colormap != undefined ? chartdata.colormap[1].name : 'Low' });
                    }

                    else if (j < 3 * rangediff) {
                        if (cData[j][2] == cData[j - 1][2])
                            domaincolorarray.push({ "color": domaincolorarray[j - 1].color, "class": domaincolorarray[j - 1].class });
                        else
                            domaincolorarray.push({ "color": '#cccccc', "class": chartdata.colormap != undefined ? chartdata.colormap[2].name : 'Average' });
                    }

                    else if (j < 4 * rangediff) {
                        if (cData[j][2] == cData[j - 1][2])
                            domaincolorarray.push({ "color": domaincolorarray[j - 1].color, "class": domaincolorarray[j - 1].class });
                        else
                            domaincolorarray.push({ "color": '#92c6db', "class": chartdata.colormap != undefined ? chartdata.colormap[3].name : 'High' });
                    }

                    else {
                        if (cData[j][2] == cData[j - 1][2])
                            domaincolorarray.push({ "color": domaincolorarray[j - 1].color, "class": domaincolorarray[j - 1].class });
                        else
                            domaincolorarray.push({ "color": '#086fad', "class": chartdata.colormap != undefined ? chartdata.colormap[4].name : 'Very High' });
                    }

                }

                svg.selectAll(".columnrange")
      .data(cData)
    .enter().append("rect")
    .attr('class', function (d, i) {
        return 'Column' + domaincolorarray[i].class.replace(/[^a-zA-Z0-9]/g, "");

    })
    .attr("fill", function (d, i) {
        return domaincolorarray[i].color;
    })
    .style('stroke', 'white')
    .style('stroke-width', '0.5')
    .on("mouseover", function (d, i) {
        this.style.opacity = 1;
        div.transition()
                .duration(0)
                .style("opacity", .9);
        var bodyRect = document.body.getBoundingClientRect();
        var elemRect = this.getBoundingClientRect();
        if (this.getBoundingClientRect().right > window.innerWidth / 2) {
            var xattr = (elemRect.left - bodyRect.left - div[0][0].offsetWidth) + 'px';
        }
        else
            var xattr = (elemRect.right - bodyRect.left) + 'px';
        var topval = false;
        topval = false;
        if (d[1] > chartdata.range.highrange / 2) {
            topval = true;
            var yattrval = (elemRect.bottom - bodyRect.top + div[0][0].offsetHeight);
            var yattr = yattrval + 'px';
        }
        else {
            var yattrval = (elemRect.top - bodyRect.top - div[0][0].offsetHeight);
            var yattr = yattrval + 25 + 'px';
        }
        if (chartdata.chart.tooltipheader == undefined || chartdata.chart.tooltipheader == '')
            var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Node' + ': ' + cLabel + '</span><hr>';
        else
            var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + chartdata.chart.tooltipheader + ': ' + cLabel + '</span><hr>';
        if (d[1] != chartdata.range.highrange) {
            var nameval = chartdata.rangetype != undefined ? chartdata.rangetype : 'Range';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>' + nameval + ': ' + d[0] + '-' + d[1] + '</div>';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'> Count' + ': ' + d[2] + '</div>';
        }
        else {
            var nameval = chartdata.rangetype != undefined ? chartdata.rangetype : 'Range';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>' + nameval + ': >' + d[0] + '</div>';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'> Count' + ': ' + d[2] + '</div>';
        }
        div.html(htmlcontent)
       .style("left", function (d, i) {
           var asdfg = div[0][0];
           return xattr;
       })
                .style("top", function (d, i) {
                    if (topval == true)
                        return yattr.replace('px', '') / 1 - this.offsetHeight + 'px';
                    else
                        return yattr;
                    topval = false;
                });
    })
      .on("mouseout", function (d, i) {
          this.style.opacity = 0.5;
          div.transition()
                .duration(0)
                .style("opacity", 0);
      })
      .style("opacity", function (d, i) {
          return 0.5;
      })
      .attr("x", function (d) { return x(cLabel) + x.rangeBand() / 4; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function (d) {
          return Y0();

      })
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', function (d, i) {
          if (d[0] == 0 && d[1] == 0)
              return Y0();
          else
              return Y(d[1]);
      })
      .attr('height', function (d, i) {
          if (d[0] == 0 && d[1] == 0)
              return Math.abs(Y0() - Y(d[0]));
          else
              return Math.abs(Y(d[1]) - Y(d[0]));
      });
            };
            function drawrect(cType, cData, valuetype) {

                svg.selectAll(".column")
      .data(cData)
    .enter().append("rect")
    .attr('class', function (d, i) {
        if (cType == 'Column2D') {
            if (d.category != undefined && d.category != '')
                return 'Column' + d.category.replace(/[^a-zA-Z0-9]/g, "");
            else
                return 'Column' + d.label.replace(/[^a-zA-Z0-9]/g, "");
        }
        else
            return 'Column' + valuetype + ' Column' + i;

    })
    .attr('data-visibility', true)
    .on("mouseover", function (d, i) {
        if (cType == 'Column2D')
            this.style.opacity = 1;
        else
            d3.selectAll(chartId + ' .Column' + i).style('opacity', 1);
        div.transition()
                .duration(0)
                .style("opacity", .9);
        if (cType == 'Column2D')
            d3.selectAll('.' + chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "")).style("display", "block");
        else
            d3.selectAll('.' + chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "") + valuetype).style("display", "block");
        //var xattr = ((this.getAttribute('x') / 1) + (this.getAttribute('width') / 1) + margin.left / 2) + 'px';
        var bodyRect = document.body.getBoundingClientRect();
        var elemRect = this.getBoundingClientRect();
        var elemRectWidth = elemRect.right - elemRect.left;
        var xattr = (elemRect.left - bodyRect.left - margin.left / 2 + 18) + 'px';
        var topval = false;
        if (checkposcount + checkzerocount == chartdata.data.length && cType == 'Column2D') {

            var yattrval = (elemRect.top - bodyRect.top);
            if (d.value < domainmaxcol / 2) {
                var yattr = yattrval + 'px';
                topval = true;
            }

            else
                var yattr = yattrval + 25 + 'px';
        }
        else if (checknegcount + checkzerocount == chartdata.data.length && cType == 'Column2D') {
            var yattrval = (elemRect.bottom - bodyRect.top);
            if (Math.abs(d.value) > domainmaxcol / 2) {
                var yattr = yattrval + 'px';
                topval = true;
            }

            else
                var yattr = yattrval + 25 + 'px';
        }

        else {
            topval = false;
            if (cType == 'Column2D') {
                if (Y(d.value) > Y0()) {
                    var yattrval = (elemRect.bottom - bodyRect.top);
                    var yattr = yattrval + 'px';
                    topval = true;
                }
                else {
                    var yattrval = (elemRect.top - bodyRect.top);
                    var yattr = yattrval + 25 + 'px';
                }
            }
            else {
                topval = false;
                if (valuetype == 'low')
                    value = d.lowvalue;
                else
                    value = d.highvalue;
                if (Y(value) > Y0()) {
                    topval = true;
                    var yattrval = (elemRect.bottom - bodyRect.top);
                    var yattr = yattrval + 'px';
                }
                else {
                    var yattrval = (elemRect.top - bodyRect.top);
                    var yattr = yattrval + 25 + 'px';
                }

            }



        }

        // var yattr = (bodyRect.top-document.getElementById('barchart12').getBoundingClientRect().top + (this.getAttribute('x') / 1))+ 'px';
        if (cType == 'DoubleColumn2D') {
            var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Date' + ': ' + d.label + '</span><hr>';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>High Value' + ': ' + chartdata.data[i].highvalue + '</div>';
            htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>Low Value' + ': ' + chartdata.data[i].lowvalue + '</div>';
            div.html(htmlcontent)
       .style("left", function (d, i) {
           var asdfg = div[0][0];
           return (xattr.replace('px', '') / 1 + this.getAttribute('width') / 2) + 'px';
       })
                .style("top", function (d, i) {
                    if (topval == true)
                        return yattr.replace('px', '') / 1 - this.offsetHeight + 'px';
                    else
                        return yattr;
                    topval = false;
                });

        }
        else if (d.tooltip != undefined && d.tooltip != '') {
            var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Date' + ': ' + d.label + '</span><hr>';
            var newcontent = '';
            for (i = 0; i < d.tooltip.length; i++) {
                newcontent = newcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>' + d.tooltip[i][0] + ': ' + d.tooltip[i][1] + '</div>';
            }
            htmlcontent = htmlcontent + newcontent;




            div.html(htmlcontent)
       .style("left", function (d, i) {
           var asdfg = div[0][0];
           if (xattr.replace('px', '') / 1 < window.innerWidth / 2)
               return (xattr.replace('px', '') / 1 + elemRectWidth / 2 - 15) + 'px';
           else
               return (xattr.replace('px', '') / 1 - div[0][0].offsetWidth + elemRectWidth / 2 + 5) + 'px';
       })
                .style("top", function (d, i) {
                    if (topval == true)
                        return yattr.replace('px', '') / 1 - this.offsetHeight - 5 + 'px';
                    else
                        return yattr;
                    topval = false;
                });
        }
        else {
            if (d.category != undefined && d.category != '') {
                var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Date' + ': ' + d.label + '</span><hr>';
                htmlcontent = htmlcontent + '<div style=\'text-transform:uppercase;font-size:12px\'>' + d.category + ': ' + d.value + '</div>';
                div.html(htmlcontent)
       .style("left", function (d, i) {
           var asdfg = div[0][0];
           return (xattr.replace('px', '') / 1 + this.getAttribute('width') / 2) + 'px';
       })
                .style("top", function (d, i) {
                    if (topval == true)
                        return yattr.replace('px', '') / 1 - this.offsetHeight - 5 + 'px';
                    else
                        return yattr;
                    topval = false;
                });
            }

            else {
                div.html(chartdata.data[i].label + ': ' + chartdata.data[i].value)
       .style("left", function (d, i) {
           var asdfg = div[0][0];
           return (xattr.replace('px', '') / 1 + this.getAttribute('width') / 2) + 'px';
       })
                .style("top", function (d, i) {
                    if (topval == true)
                        return yattr.replace('px', '') / 1 - this.offsetHeight - 5 + 'px';
                    else
                        return yattr;
                    topval = false;
                });

            }

        }

    })
        .on("mouseout", function (d, i) {
            if (cType == 'Column2D')
                this.style.opacity = 0.5;
            else
                d3.selectAll(chartId + ' .Column' + i).style('opacity', 0.5);
            if (cType == 'Column2D')
                d3.selectAll('.' + chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "")).style("display", "none");
            else
                d3.selectAll('.' + chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "") + valuetype).style("display", "none");
            div.transition()
                .duration(0)
                .style("opacity", 0);
        })
      .attr("fill", function (d, i) {
          if (chartdata.colormap != undefined && cType == 'Column2D') {
              for (i = 0; i < chartdata.colormap.length; i++) {
                  if (chartdata.colormap[i].name == d.category) {
                      return chartdata.colormap[i].value;
                      break;
                  }

              }
          }
          else {
              if (cType == 'Column2D') {
                  if (chartdata.chart.pallattecolorsingle == false || chartdata.chart.pallattecolorsingle == undefined || chartdata.chart.pallattecolorsingle == '') {
                      if (chartdata.chart.singlecolorgradient == false || chartdata.chart.singlecolorgradient == undefined || chartdata.chart.singlecolorgradient == '')
                          return chartdata.chart.pallattecolor[i];
                      else {
                          var index = domarr.indexOf(d.value)
                          return colorsinglepallete(index);
                      }

                  }

                  else {
                      return chartdata.chart.pallattecolor[0];

                  }


              }
              else {
                  if (valuetype == 'high')
                      return chartdata.chart.pallattecolor[0];
                  else
                      return chartdata.chart.pallattecolor[1];
              }

          }

      })
      .style("opacity", 0.5)
      .attr("x", function (d) {
          return x(d.label);
      })
      .attr("width", x.rangeBand())
      .attr("y", function (d) {
          if (cType == 'Column2D') {
              if (checkposcount + checkzerocount == chartdata.data.length)
                  return height;
              else if (checknegcount + checkzerocount == chartdata.data.length)
                  return 25;
              else
                  return height + domainminval;
          }
          else
              return height + domainminval;

      })
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', function (d) {
          if (cType == 'Column2D') {
              if (checkposcount + checkzerocount == chartdata.data.length)
                  return y(d.value);
              else if (checknegcount + checkzerocount == chartdata.data.length)
                  return 25;
              else
                  return d.value < 0 ? Y0() : Y(d.value);
          }
          else {
              if (valuetype == 'low')
                  return d.lowvalue < 0 ? Y0() : Y(d.lowvalue);
              else
                  return d.highvalue < 0 ? Y0() : Y(d.highvalue);
          }

      })
      .attr('height', function (d) {
          if (cType == 'Column2D') {
              if (checkposcount + checkzerocount == chartdata.data.length)
                  return height - y(d.value);
              else if (checknegcount + checkzerocount == chartdata.data.length) {
                  if (d.value != 0)
                      return y(Math.abs(d.value)) - 25;
                  else
                      return 0;
              }
              else
                  return Math.abs(Y(d.value) - Y0());
          }
          else {
              if (valuetype == 'low')
                  return Math.abs(Y(d.lowvalue) - Y0());
              else
                  return Math.abs(Y(d.highvalue) - Y0());
          }

      });

            };

            function drawcirclepath(cType, cData, valuetype) {
                var columncirlce = svg.selectAll('.columncirlce')
     .data(cData)
    .enter().append('circle')
    .attr("class", function (d) {
        if (cType == 'Column2D')
            return chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "")
        else
            return chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "") + valuetype;
    })
    .attr("fill", "none")
        .attr("cx", function (d)
        { return x(d.label) + x.rangeBand() / 2; })
     .attr("cy", function (d) {
         if (cType == 'Column2D') {
             if (checkposcount + checkzerocount == chartdata.data.length)
                 return y(d.value);
             else if (checknegcount + checkzerocount == chartdata.data.length)
                 return y(Math.abs(d.value));
             else
                 return Y(d.value);
         }
         else {
             if (valuetype == 'low')
                 valuecur = d.lowvalue;
             else
                 valuecur = d.highvalue;
             return Y(valuecur);
         }

     })
     .attr("r", 5)
     .attr("style", "display:none");

                var columnpath = svg.selectAll('.columnpath')
     .data(cData)
    .enter().append('path')
    .attr("class", function (d) {
        if (cType == 'Column2D')
            return chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "")
        else
            return chartId.replace('#', '') + d.label.replace(/[^a-zA-Z0-9]/g, "") + valuetype;
    })
    .attr("d", function (d) {
        var xatt = x(d.label) + x.rangeBand() / 2;
        var yatt = 0;
        if (cType == 'Column2D') {
            if (checkposcount + checkzerocount == chartdata.data.length) {
                yatt = y(d.value);
                if (d.value < domainmaxcol / 2)
                    var yattnext = yatt - 20;
                if (d.value > domainmaxcol / 2)
                    var yattnext = yatt + 20;
                return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
            }
            else if (checknegcount + checkzerocount == chartdata.data.length) {
                if (d.value != 0)
                    yatt = y(Math.abs(d.value));
                else
                    yatt = 25;
                if (Math.abs(d.value) > domainmaxcol / 2) {
                    var yattnext = yatt - 20;
                    return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
                }

                if (d.value < domainmaxcol / 2) {
                    var yattnext = yatt + 20;
                    return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
                }

            }
            else {
                if (Y(d.value) > Y0()) {
                    var yatt = Y(d.value);
                    var yattnext = Y(d.value) - 20;
                    return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
                }

                else {
                    var yatt = Y(d.value);
                    var yattnext = Y(d.value) + 20;
                    return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
                }

            }
        }
        else {
            if (valuetype == 'low')
                valuecur = d.lowvalue;
            else
                valuecur = d.highvalue;
            if (Y(valuecur) > Y0()) {
                var yatt = Y(valuecur);
                var yattnext = Y(valuecur) - 20;
                return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
            }

            else {
                var yatt = Y(valuecur);
                var yattnext = Y(valuecur) + 20;
                return 'M' + xatt + ' ' + yatt + 'L' + xatt + ' ' + yattnext;
            }
        }


    })
    .attr("style", "stroke:rgb(128, 128, 128);fill:none;stroke-width:2;display:none");
            };


            if (chartType == 'Column2D') {
                drawrect('Column2D', chartdata.data, 'none');
                drawcirclepath('Column2D', chartdata.data, 'none');
            }
            else if (chartType == 'DoubleColumn2D') {
                drawrect('DoubleColumn2D', chartdata.data, 'high');
                drawcirclepath('DoubleColumn2D', chartdata.data, 'high');
                drawrect('DoubleColumn2D', chartdata.data, 'low');
                drawcirclepath('DoubleColumn2D', chartdata.data, 'low');
            }
            else if (chartType == 'StackedColumn2D') {
                drawstackbar('StackedColumn2D', dataGroup)
            }
            else {
                for (i = 0; i < chartdata.data.length; i++) {
                    drawrangerect('ColumnRange2D', chartdata.data[i].values, chartdata.data[i].label, chartdata.data[i].values[1, 0]);
                }

            }




            if (chartdata.chart.tickinterval != undefined && chartdata.chart.tickinterval > 0) {
                d3.select(chartId).selectAll(".xtick .tick text").style("display", function (d, i) {
                    chartlength = chartdata.data.length - 1;
                    ticklength = chartdata.chart.tickinterval - 1;
                    if (i == 0)
                        return "block"
                    if (i == chartlength)
                        return "block"
                    else {
                        if (i % ticklength == 0 && (i < (chartlength - ticklength)))
                            return "block"
                        else
                            return "none"
                    }
                });
            }
            d3.selectAll(chartId + ' path.domain').style('opacity', function (d, i) {
                if (i != 0)
                    this.setAttribute('d', '')
            });
            d3.selectAll(chartId + ' .xtick .tick line').style('display', 'none');
            if (chartType != 'StackedColumn2D')
                d3.selectAll(chartId + ' .exportgrid .tick text').attr('dx', '3').attr('dy', '12').style('text-anchor', 'start');
            else
                d3.selectAll(chartId + ' .exportgrid .tick text').attr('dx', '0').attr('x', '0').attr('dy', '12').style('text-anchor', 'start');
            if (checknegcount + checkzerocount != chartdata.data.length) {
                d3.select(chartId + ' .exportgrid .tick text').style('display', 'none');
                d3.select(chartId + ' .exportgrid .tick line').style('display', 'none');
            }
            else {
                d3.selection.prototype.last = function () {
                    var last = this.size() - 1;
                    return d3.select(this[0][last]);
                };
                d3.selectAll(chartId + ' .exportgrid .tick text').last().style('display', 'none');
                d3.selectAll(chartId + ' .exportgrid .tick line').last().style('display', 'none');
            }

            d3.selectAll(chartId + ' .exportgrid .tick line').attr('x2', function () {
                return this.getAttribute('x2') / 1 + 70;
            });
            /*  d3.selectAll(chartId + ' .domain').attr('d', function (d) {
            var asdfg = d3.selectAll(chartId + ' .domain')[0][0].getAttribute('d');
            return asdfg.substring(0, asdfg.lastIndexOf('V'));

            });*/
            d3.selectAll(chartId + ' .domain').attr('d', function () {
                if (chartType != 'StackedColumn2D' && chartType != 'ColumnRange2D') {
                    var dval = this.getAttribute('d');
                    // var first = dval.substring(0, dval.lastIndexOf('H') + 1);
                    var first = 'M0,';
                    var first2 = dval.substring(dval.lastIndexOf(',') + 1, dval.lastIndexOf('H') + 1);
                    var last = dval.substring(dval.lastIndexOf('V'), dval.length);
                    var middle = dval.substring(dval.lastIndexOf('H') + 1, dval.lastIndexOf('V')) / 1 + 20;
                    var finalfull = first + first2 + middle + last;
                    return finalfull.substring(0, finalfull.lastIndexOf('V'));
                }
                else {
                    var dval = this.getAttribute('d');
                    var first = dval.substring(0, dval.lastIndexOf('H') + 1);
                    var last = dval.substring(dval.lastIndexOf('V'), dval.length);
                    var middle = dval.substring(dval.lastIndexOf('H') + 1, dval.lastIndexOf('V')) / 1 + 70;
                    var finalfull = first + middle + last;
                    return finalfull.substring(0, finalfull.lastIndexOf('V'));
                }
            });
            if (chartdata.chart.showlegend) {
                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup')
            .attr('transform', function (d) {
                if (chartType == 'ColumnRange2D') {
                    return "translate(0,15)";
                }
            });
                legendgroup.append('g')
            .append('rect')
            .attr('width', '85')
            .attr('height', chartdata.colormap.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 5)
            .attr('y', 12.5)
            .attr('stroke', 'lightgrey');
                var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
                legend.append('rect')
        .attr('x', width)
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
        .attr('x', width + 12)
        .attr('y', function (d, i) { return ((i + 1) * 15) + 9; })
        .text(function (d) { return d.name.toUpperCase(); })
         .style('text-transform', 'uppercase')
         .style('opacity', 0.4)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
        .on("click", function (d, i) {
            var graphselect = 'Column' + d.name.replace(/[^a-zA-Z0-9]/g, "");
            this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
            if (d3.selectAll(chartId + ' .' + graphselect).style('display') == 'inline') {
                d3.selectAll(chartId + ' .' + graphselect).attr("data-visibility", "false");
                d3.selectAll(chartId + ' .' + graphselect).style('display', 'none');
            }

            else {
                this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                d3.selectAll(chartId + ' .' + graphselect).attr("data-visibility", "true");
                d3.selectAll(chartId + ' .' + graphselect).style('display', 'inline');
            }

        })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = 1;
         })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              this.style.opacity = 0.4;
          });

            };
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