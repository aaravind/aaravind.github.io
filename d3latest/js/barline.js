var barline2D = function (chartId, chartdata, chartType) {
    if (chartdata.bardata != undefined && chartdata.linedata != undefined) {
        if (chartdata.bardata.length != 0 && chartdata.linedata.length != 0) {

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
            var margin = { top: 20, right: 12, bottom: 20, left: 12 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var barwidth = 0.25 * width;
            var linewidth = 0.75 * width;
            var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
            //X AND Y axis for Bar
            var y = d3.scale.linear()
    .range([height, 15]);
            function Y0() {
                return y(0);
            }
            function Y(d) {
                return y(d);
            }
            var x = d3.scale.ordinal()
    .rangeRoundBands([15, barwidth], .1);
            var xaxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
    .tickSize(0, 0, 0);
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
            // X for line
            var xline = d3.scale.ordinal()
    .rangeRoundBands([barwidth, width], .1);
            var xlineaxis = d3.svg.axis()
    .scale(xline)
    .orient("bottom")
    .ticks(5)
    .tickSize(-height, 0, 0);
            var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.linedata);
            xline.domain(chartdata.linedata.map(function (d) { return d.label; }));
            var dottedlinearr = [];


            var valueline = d3.svg.line()
    .defined(function (d, i) {

        if (d.value == 0) {
            if (i == 0 && currentchartdata[i].value == 0) {
                xprev = xline(currentchartdata[i].label) + xline.rangeBand() / 2;
                yprev = y(0);
            }

            else {

                for (j = i; j > 0; j--) {

                    if (currentchartdata[j - 1].value != 0) {
                        xprev = xline(currentchartdata[j - 1].label) + xline.rangeBand() / 2;
                        yprev = y(currentchartdata[j - 1].value);
                        break;
                    }

                }

            }


            if (chartType == 'Line2D' || chartType == 'BarLine2D') {
                if (i + 1 == currentchartdata.length && currentchartdata[i].value != 0) {
                    xnext = xline(currentchartdata[i].label) + xline.rangeBand() / 2;
                    ynext = y(currentchartdata[i - 1].value);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else if (i + 1 == currentchartdata.length && currentchartdata[i].value == 0) {
                    xnext = xline(currentchartdata[i].label) + xline.rangeBand() / 2;
                    ynext = y(0);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else {

                    for (j = i; j < currentchartdata.length - 1; j++) {
                        if (currentchartdata[j + 1].value != 0) {
                            xnext = xline(currentchartdata[j + 1].label) + xline.rangeBand() / 2;
                            ynext = y(currentchartdata[j + 1].value);
                            dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                            break;
                        }

                    }

                }

            }
            else {
                if (i == 0) {
                    xnext1 = xline(currentchartdata[i + 1].label) + xline.rangeBand() / 2;
                    xnext2 = xline(currentchartdata[i + 1].label) + xline.rangeBand() / 2;
                    ynext1 = y(0);
                    ynext2 = y(0);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext1 + ',' + ynext1 + 'L' + xnext2 + ',' + ynext2);
                }

                else {
                    var count = 0;
                    var yval;
                    for (j = i; j >= 0; j--) {
                        if (j == 0)
                            yval = y(0);
                        else {
                            if (currentchartdata[j - 1].value != 0) {
                                yval = y(currentchartdata[j - 1].value);
                                break;
                            }
                        }

                    }
                    for (j = i; j <= currentchartdata.length; j++) {
                        if (j == currentchartdata.length - 1) {

                            xnext1 = xline(currentchartdata[j].label) + xline.rangeBand() / 2;
                            xnext2 = xline(currentchartdata[j].label) + xline.rangeBand() / 2;
                            ynext1 = yval;
                            ynext2 = yval;
                            dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext1 + ',' + ynext1 + 'L' + xnext2 + ',' + ynext2);
                            break;
                        }
                        else {
                            if (currentchartdata[j + 1].value != 0) {
                                xnext1 = xline(currentchartdata[j + 1].label) + xline.rangeBand() / 2;
                                xnext2 = xline(currentchartdata[j + 1].label) + xline.rangeBand() / 2;
                                ynext1 = yval;
                                ynext2 = y(currentchartdata[j + 1].value);
                                dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext1 + ',' + ynext1 + 'L' + xnext2 + ',' + ynext2);
                                break;
                            }

                        }

                    }

                }
            }

            return false;
        }

        else
            return true;
    })
    .x(function (d) {
        return xline(d.label) + xline.rangeBand() / 2;
    })
    .y(function (d) {
        return y(d.value);
    });


            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + 70) + ' ' + (height + margin.top + margin.bottom + 10))
        .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');
            svg.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption.toUpperCase());
            var barmax = d3.max(chartdata.bardata, function (d) { return d.value });
            var linemax = d3.max(chartdata.linedata, function (d) { return d.value });
            var domainmaxcol = barmax > linemax ? barmax + 0.2 * barmax : linemax + 0.2 * linemax;
            y.domain([0, domainmaxcol]);
            x.domain(chartdata.bardata.map(function (d) { return d.label; }));
            svg.append("g")
  .attr("class", "grid exportgrid")
      .call(yaxis()
       .tickSize(-width, 0, 0)
            )
            svg.append("g")
      .attr("style", styleborder)
      .attr("class", "bartick xtick")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xaxis);
            svg.append("g")
      .attr("style", styleborder)
      .attr("class", "grid xgrid xtick")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xlineaxis);
            svg.selectAll(".column")
      .data(chartdata.bardata)
    .enter().append("rect")
    .attr('class', function (d, i) {
        return chartType + d.label;
    })
    .attr('data-visibility', true)
    .attr("fill", function (d, i) {
        if (chartdata.colormap == undefined || chartdata.colormap == '' || chartdata.colormap.length == 0)
            return 'blue';
        else {
            for (i = 0; i < chartdata.colormap.length; i++) {
                if (d.label == chartdata.colormap[i].name)
                    return chartdata.colormap[i].value;
            }
        }
    })
    .style("opacity", 0.5)
      .attr("x", function (d) { return x(d.label) + x.rangeBand() / 4; })
      .attr("width", x.rangeBand() / 2)
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
          var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ': ' + d.value + '</span>';
          var xattr = (elemRect.right - bodyRect.left + 10) + 'px';
          div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);
      })
            .on("mouseout", function (d, i) {
                this.style.cursor = 'pointer';
                this.style.opacity = 0.5;
                div.transition()
                .duration(100)
                .style("opacity", 0);
            })
      .attr("y", Y0())
      .attr("height", 0)
        .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr('y', function (d) { return d.value < 0 ? Y0() : Y(d.value); })
       .attr('height', function (d) { return Math.abs(Y(d.value) - Y0()); });
            d3.select(chartId + ' .domain').attr('d', '');

            function drawCircle(cType, cData, color, id) {

                var circletext = svg.selectAll('barlinecircle')
     .data(cData)
    .enter().append('g')
    .attr('class', 'barlinecircle ' + cType + id.replace(/[^a-zA-Z0-9]/g, ""));
                circletext.append('circle')
    .attr("class", function (d) { return cType + d.label })
    .style("fill", function (d, i) { return d.value == 0 ? "none" : color; })
    .style("opacity", '0.3')
    .attr("cx", function (d)
    { return xline(d.label) + xline.rangeBand() / 2; })
     .attr("cy", function (d) { return y(d.value); })
     .attr("r", 5);


                circletext.append('text')
    .attr("dx", function (d)
    { return xline(d.label) + xline.rangeBand() / 2 + 10; })
     .attr("dy", function (d) { return y(d.value) - 5; })
      .attr("class", function (d) { return cType + d.label.replace(/[^a-zA-Z0-9]/g, "") })
	    .text(function (d) {

	        if (d.value != 0)
	            return d.category + ' : ' + d.value;
	        else
	            return d.category + ' : ' + 'N/A';

	    })
        .attr('style', function (d) {
            var colorval = color;
            return 'display:none;z-index:9999999;fill:' + colorval + ';font-size:15px'
        });

                svg.selectAll(chartId + ' .xgrid').selectAll('line')
          .style("stroke-width", 20)
          .style("cursor", "pointer")
         .style("opacity", "0");
            };

            function drawlinepath(cType, cData, id) {
                var linerect = svg.selectAll('barlinerect')
     .data(cData)
    .enter().append('g')
    .attr('class', 'barlinerect');
                linerect.append('rect')
    .attr("class", function (d) { return cType + d.label.replace(/[^a-zA-Z0-9]/g, "") })
    .style("fill", "grey")
    .attr("width", 0)
     .attr("height", height - margin.bottom)
     .attr("x", function (d)
     { return xline(d.label) + xline.rangeBand() / 2; })
     .attr("y", 20)
            }


            dataGroup.forEach(function (d, i) {
                var j = i;
                dottedlinearr = [];
                var color;
                if (chartdata.colormap == undefined || chartdata.colormap == '' || chartdata.colormap.length == 0)
                    var color = chartdata.chart.pallattecolor[i];
                else {
                    for (i = 0; i < chartdata.colormap.length; i++) {
                        if (d.key == chartdata.colormap[i].name)
                            var color = chartdata.colormap[i].value;
                    }
                }

                var keyid = d.key;
                var colorstyle = 'stroke:' + color + ';fill:none';
                currentchartdata = d.values;
                var path = svg.append('path')
        .attr('d', valueline(d.values))
         .attr("class", chartType + keyid.replace(/[^a-zA-Z0-9]/g, "") + ' line')
          .attr("data-visibility", "true")
           .attr("data-categorycolumn", d.key)
        .attr('style', colorstyle);


                var totalLength = path.node().getTotalLength();

                path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);


                for (i = 0; i < dottedlinearr.length; i++) {
                    svg.append("path")
        .attr("class", "line")
        .attr("d", dottedlinearr[i])
          .attr("class", chartType + keyid.replace(/[^a-zA-Z0-9]/g, "") + ' line')
          .attr("data-visibility", "true")
           .attr("data-categorycolumn", d.key)
        .attr("style", colorstyle)
        .style("stroke-dasharray", ("3, 3"));
                }
                if (j == 0)
                    drawlinepath(chartType, d.values, d.key);
                drawCircle(chartType, d.values, color, d.key);

            });

            d3.selectAll(chartId + ' .exportgrid .tick text').attr('x', 0).attr('dx', '3').attr('dy', '12').style('text-anchor', 'start').text(function (d) { return d; });

            d3.selectAll(chartId + ' .domain').attr('d', function () {
                return '';
            });

            d3.selectAll(chartId + ' .bartick .tick text').text(function (d) { return d.toUpperCase(); });
            svg.selectAll(chartId + ' .xgrid').selectAll('line')
          .style("stroke-width", 20)
          .style("cursor", "pointer")
         .style("opacity", "0")
         .on('mouseover', function (d, i) {
             if (chartType != 'Line2D' && chartType != 'Curve2D' && chartType != 'Area2D' && chartType != 'StepLine2D' && chartType != 'Scatter2D') {
                 /* d3.select(this)
                 .attr('stroke', '#666')
                 .style("stroke-width", 1.2)
                 .style("opacity", "1");*/
                 d3.selectAll(chartId + ' .barlinerect .' + chartType + d.replace(/[^a-zA-Z0-9]/g, ""))
        .attr("width", 1)
         .style('opacity', 1);

                 d3.selectAll('.' + chartType + d.replace(/[^a-zA-Z0-9]/g, ""))
                 //.attr("r", 8)
        .transition()
         .duration(0)
         .style('opacity', 1);

                 var alltext = d3.selectAll('text' + '.' + chartType + d.replace(/[^a-zA-Z0-9]/g, ""));
                 if (chartdata.chart.tooltipheader == undefined || chartdata.chart.tooltipheader == '')
                     var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Node: ' + d + '</span><hr>';
                 else
                     var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + chartdata.chart.tooltipheader + ': ' + d + '</span><hr>';

                 if (this.getBoundingClientRect().left < window.innerWidth / 2) {
                     for (i = 0; i < alltext[0].length; i++)
                         htmlcontent = htmlcontent + '<div style=\'color:' + alltext[0][i].style.fill + ';text-transform:uppercase;font-size:12px\'>' + alltext[0][i].textContent + '</div>';
                     //   htmlcontent = htmlcontent + '<span style=\'float:left\'>' + '<div style=\'background:' + alltext[0][i].style.fill + ';color:black;border-radius:50%;width:10px;height:10px;margin-top:1px\'></div>' + '</span>' + '<span style=\'margin-left:10px;float:left\'>' + alltext[0][i].textContent + '</span>' + '<br>';             
                 }
                 else {
                     for (i = 0; i < alltext[0].length; i++)
                     //   htmlcontent = htmlcontent +'<div style=\'color:' + alltext[0][i].style.fill + '\'>'+ alltext[0][i].textContent +'</div>';
                         htmlcontent = htmlcontent + '<div style=\'color:' + alltext[0][i].style.fill + ';text-transform:uppercase;font-size:12px\'>' + alltext[0][i].textContent + '</div>';
                 }


                 div.transition()
                .duration(100)
                .style("opacity", .9);

                 var xattr = bodyRect = elemRect = yattr = 0;
                 var bodyRect = document.body.getBoundingClientRect();
                 var elemRect = this.getBoundingClientRect();
                 if (elemRect.left > window.innerWidth / 2)
                     var xattr = (elemRect.left - bodyRect.left - div[0][0].offsetWidth) + 'px';
                 else
                     var xattr = (elemRect.left - bodyRect.left + 20) + 'px';
                 var yattr = (elemRect.top - bodyRect.top + height / 2 - margin.top / 2 - margin.bottom / 2) + 'px';
                 //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
                 div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);
             }

         })
          .on('mouseout', function (d) {
              if (chartType != 'Line2D' && chartType != 'Curve2D' && chartType != 'Area2D' && chartType != 'StepLine2D') {
                  /*   d3.select(this)
                  .attr('stroke', '')
                  .style("stroke-width", 20)
                  .style("opacity", "0");*/
                  d3.selectAll(chartId + ' .barlinerect .' + chartType + d.replace(/[^a-zA-Z0-9]/g, ""))
        .attr("width", 0)
         .style('opacity', 1);
                  d3.selectAll('.' + chartType + d.replace(/[^a-zA-Z0-9]/g, ""))
              .style('opacity', 0.3)
                  //.attr("r", 5)
          .transition()
         .duration(0);
                  div.transition()
                .duration(100)
                .style("opacity", 0);
              }
          });
            function tickspace(datacur) {

                if (chartdata.chart.tickinterval != undefined && chartdata.chart.tickinterval > 1) {
                    d3.select(chartId).selectAll(".xgrid.xtick .tick text").style("display", function (d, i) {
                        chartlength = datacur.length - 1;
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
            }
            tickspace(dataGroup[0].values);
            if (chartdata.chart.showlegend) {

                  var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
            legendgroup.append('g')
            .append('rect')
            .attr('width','85')
            .attr('height',chartdata.colormap.length*15)
            .attr('fill','rgb(255, 255, 255)')
            .attr('x',width-5)
            .attr('y',22.5)
            .attr('stroke','lightgrey');

                var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
                legend.append('rect')
        .attr('x', width)
        .attr('y', function (d, i) { return (i + 1) * 15 + 10; })
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
        .attr('y', function (d, i) { return ((i + 1) * 15) + 9 + 10; })
        .text(function (d) {
            if (d.name.length > 10)
                return d.name.substr(0, 10).toUpperCase() + '...';
            else
                return d.name.toUpperCase();
        })
         .style('text-transform', 'uppercase')
         .style('opacity', 0.4)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
        .on("click", function (d, i) {
            var barselect = chartType + d.name.replace(/[^a-zA-Z0-9]/g, "");
            this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
            if (d3.selectAll('.' + barselect).style('display') == 'inline') {
                d3.selectAll('.' + barselect).attr("data-visibility", "false");
                d3.selectAll('.' + barselect).style('display', 'none');
            }

            else {
                this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                d3.selectAll('.' + barselect).attr("data-visibility", "true");
                d3.selectAll('.' + barselect).style('display', 'inline');
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
            d3.selectAll(chartId + ' .exportgrid .tick line').attr('x2', function (d) {
                return this.getAttribute('x2') / 1 + 70;
            })
        }
    }
}