/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var bar2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {

            var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.data);
       
        if (chartdata.chart.dynamicheight != undefined && chartdata.chart.dynamicheight == true) {
            if (dataGroup[0].values.length < 6)
                d3.select(chartId).style('height', '300px');
            else
                d3.select(chartId).style('height', 50 * dataGroup[0].values.length + 'px');
        }

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
        var topval = 30;
        var color = d3.scale.category20c();
        var margin = { top: topval, right: 12, bottom: bottommargin, left: 12 };
        var chartcontent = d3.select(chartId);
        var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
        var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
        var styleborder = "fill: none; stroke: lightgrey;  shape-rendering: crispEdges;font:12px sans-serif";
        var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
        var categorylength = dataGroup.length;
        var labellength = dataGroup[0].values.length;
        var series = dataGroup.map(function (d) {
            return d.key;
        });
        var dataGroup = dataGroup.map(function (d) {
            return d.values.map(function (o, i) {
                // Structure it so that your numeric
                // axis (the stacked amount) is y
                return {
                    y: o.value,
                    x: o.label,
                    z: o.category
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
                    z: d.z
                };
            });
        });
        domainmax = d3.max(dataGroup, function (group) {
            return d3.max(group, function (d) {
                return d.x + d.x0;
            });
        })
        xScale1 = d3.scale.linear()
        .domain([0, domainmax])
        .range([0, width -25])
        var labels = dataGroup[0].map(function (d) {
            return d.y;
        });
        yScale1 = d3.scale.ordinal()
        .domain(labels)
        .rangeRoundBands([25, height], 0.1);
        function xAxis5() {
            return d3.svg.axis()
        .scale(xScale1)
        .orient("bottom")
        }
        function yAxis1() {
            return d3.svg.axis()
        .scale(yScale1)
        .orient("left")
        }
        var color = d3.scale.linear()
    .domain([0, categorylength])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
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
        .attr('class','captiontext')
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption.toUpperCase());

         if (chartdata.chart.hiddencaption != undefined) {
                if (chartdata.chart.hiddencaption.length != 0)
                { 
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
        .text( chartdata.chart.hiddencaption.toUpperCase());
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
                if (chartdata.chart.subcaption.length != 0)
                { 
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
        function Y0() {
            return y(0);
        }
        function Y(d) {
            return y(d);
        };
         if (chartdata.chart.slant) {
            if (chartdata.chart.slantdegree != undefined)
                rotatevalue = "rotate(-" + chartdata.chart.slantdegree + ")";
            else
                rotatevalue = "rotate(-" + 65 + ")";
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
        else {
            svg.append("g")
      .attr("style", styleborder)
      .attr("class", "xtick")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis5().innerTickSize(-height + 25)
    .outerTickSize(0)
    .tickPadding(10));
        }
        var groups = svg.selectAll('.bargroups')
        .data(dataGroup)
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
            return xScale1(d.x0);
        })
        .attr('y', function (d, i) {
            return yScale1(d.y);
        })
        .attr('height', function (d) {
            return yScale1.rangeBand() / 2;
        })
        .attr('class', function (d) {
            return 'barstack' + d.z.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 0.9)
           .on("mouseover", function (d, i) {
               this.style.cursor = 'pointer';
               this.style.opacity = 1;
               div.transition()
                .duration(100)
                .style("opacity", .9);

               var xattr = bodyRect = elemRect = yattr = 0;
               var bodyRect = document.body.getBoundingClientRect();
               var elemRect = this.getBoundingClientRect();
               if (elemRect.right > window.innerWidth / 2)
                   var xattr = (elemRect.right - bodyRect.left - div[0][0].offsetWidth) + 'px';
               else
                   var xattr = (elemRect.right - bodyRect.left + 20) + 'px';
               var yattr = (elemRect.top - bodyRect.top) + 'px';
               //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
               var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.z + ': ' + d.x + '</span>';
               div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);
           })
                    .on("mouseout", function (d, i) {
                        this.style.cursor = 'pointer';
                        this.style.opacity = 0.9;
                        div.transition()
                .duration(100)
                .style("opacity", 0);
                    })
                      .attr('width', 0)
               .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
        .attr('width', function (d) {
            return xScale1(d.x);
        });
       
        svg.append("g")
  .attr("class", "grid exportgrid")
      .call(yAxis1())
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);

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

        d3.selectAll(chartId + ' .exportgrid .tick text').attr('x', 0).attr('dx', '3').attr('dy', '12').style('text-anchor', 'start').text(function (d) { return d.toUpperCase(); });


        d3.selectAll(chartId + ' .exportgrid .tick line').attr('x2', 0);
        /*  d3.selectAll(chartId + ' .domain').attr('d', function (d) {
        var asdfg = d3.selectAll(chartId + ' .domain')[0][0].getAttribute('d');
        return asdfg.substring(0, asdfg.lastIndexOf('V'));

        });*/
        d3.select(chartId + ' .domain').attr('d', function () {
            /* var dval = this.getAttribute('d');
            var first = dval.substring(0, dval.lastIndexOf('H') + 1);
            var last = dval.substring(dval.lastIndexOf('V'), dval.length);
            var middle = dval.substring(dval.lastIndexOf('H') + 1, dval.lastIndexOf('V')) / 1 + 70;*/
            return '';
        });
        if (chartdata.chart.showlegend) {
            var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
            legendgroup.append('g')
            .append('rect')
            .attr('width','110')
            .attr('height',chartdata.colormap.length*15)
            .attr('fill','rgb(255, 255, 255)')
            .attr('x',width -30)
            .attr('y',12.5)
            .attr('stroke','lightgrey');

            var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
            legend.append('rect')
        .attr('x', width -25)
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
        .attr('x', width -25 + 12)
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
        .on("click", function (d, i) {
            var graphselect = 'barstack' + d.name.replace(/[^a-zA-Z0-9]/g, "");
            this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.8;
            if (d3.selectAll('.' + graphselect).style('display') == 'inline') {
                d3.selectAll('.' + graphselect).attr("data-visibility", "false");
                d3.selectAll('.' + graphselect).style('display', 'none');
            }

            else {
                this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                d3.selectAll('.' + graphselect).attr("data-visibility", "true");
                d3.selectAll('.' + graphselect).style('display', 'inline');
            }

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

