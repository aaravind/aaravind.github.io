/**
 * D3 Chart - Line2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var currentchartdata;
var line2D = function (chartType, chartId, chartdata) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            function tickspace(datacur) {

                if (chartdata.chart.tickinterval != undefined && chartdata.chart.tickinterval > 1) {
                    d3.select(chartId).selectAll(".xtick .tick text").style("display", function (d, i) {
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
            function drawCircle(cType, cData, color, id) {

                var circletext = svg.selectAll('circletext')
     .data(cData)
    .enter().append('g')
    .attr('class', 'circletext ' + cType + id.replace(/[^a-zA-Z0-9]/g, ""));
                circletext.append('circle')
    .attr("class", function (d) { return cType + d.label })
    .style("fill", function (d, i) { return d.value == 0 ? "none" : color; })
    .style("opacity", '0.3')
       .on("mousedown", function (d, i) {
           if (chartdata.click != undefined && chartdata.click != '')
               chartdata.click(d);
       })

    .on("mouseover", function (d, i) {
        if (chartType.search('Multi') == -1) {
            this.style.opacity = 1;
            div.transition()
                .duration(0)
                .style("opacity", .9);
            var xattr = bodyRect = elemRect = yattr = 0;
            // var xattr = ((this.getAttribute('cx') / 1) + (this.getAttribute('width') / 1) + margin.left / 2) + 'px';
            var bodyRect = document.body.getBoundingClientRect();
            var elemRect = this.getBoundingClientRect();
            //  var yattr = (elemRect.top - bodyRect.top- margin.top/2) + 'px';


            var xattr = (elemRect.left - bodyRect.left - margin.left / 2 + 10) + 'px';
            if (d.value > domainmax / 2)
                var yattr = (elemRect.top - bodyRect.top - margin.top + 25) + 'px';
            else
                var yattr = (elemRect.top - bodyRect.top - margin.top - 20) + 'px';
            /*var currentdivattr = document.getElementById(chartId.replace("#", "")).offsetTop + height / 2;
            var currentcirclepos = document.getElementById(chartId.replace("#", "")).offsetTop + (this.getAttribute('cy') / 1);
            if (currentcirclepos > currentdivattr)
            var yattr = (currentcirclepos - 45) + 'px';
            else
            var yattr = (currentcirclepos + 7) + 'px';
            // var yattr = document.getElementById(chartId.replace("#", "")).offsetTop + (this.getAttribute('cy') / 1 + 7) + 'px';*/

            div.html(this.nextSibling.textContent)
            .style('color', this.nextSibling.style.fill)
       .style("left", xattr)
                .style("top", yattr)
                 .style("margin-top", "35px");

        }

    })
        .on("mouseout", function (d, i) {
            if (chartType.search('Multi') == -1) {
                this.style.opacity = 0.3;
                div.transition()
                .duration(0)
                .style("opacity", 0);
            }
        })
    .attr("cx", function (d)
    { return x(d.label) + x.rangeBand() / 2; })
     .attr("cy", function (d) { return y(d.value); })
     .attr("r", 5);


                circletext.append('text')
    .attr("dx", function (d)
    { return x(d.label) + x.rangeBand() / 2 + 10; })
     .attr("dy", function (d) { return y(d.value) - 5; })
      .attr("class", function (d) { return cType + d.label.replace(/[^a-zA-Z0-9]/g, "") })
	    .text(function (d) {
                        symbol = '';
                        if(chartdata.chart.suffixsymbol != undefined)
            {
                if(chartdata.chart.suffixsymbol != '')
                {
                    symbol = chartdata.chart.suffixsymbol;
                } 
                else
                    symbol = '';
            }

	        if (chartType == 'Line2D' || chartType == 'Scatter2D' || chartType == 'StepLine2D' || chartType == 'Curve2D') {
	            if (d.value != 0)
	                return d.label + ' : ' + d3.format(',')(d.value.toFixed(2) / 1) + symbol;
	            else
	                return d.label + ' : ' + 'N/A';
	        }

	        else {
	            if (d.value != 0)
	                return d.category + ' : ' + d3.format(',')(d.value.toFixed(2) / 1) + symbol;
	            else
	                return d.category + ' : ' + 'N/A';
	        }
	    })
        .attr('style', function (d) {
            var colorval = color;
            return 'display:none;z-index:9999999;fill:' + colorval + ';font-size:15px'
        });

                if (chartType == 'MultiLine2D' || chartType == 'MultiArea2D' || chartType == 'MultiScatter2D' || chartType == 'MultiStepLine2D' || chartType == 'MultiStepArea2D' || chartType == 'MultiCurve2D' || chartType == 'MultiCurveArea2D') {

                    if (chartdata.chart.slant) {
                        if (chartdata.chart.slantdegree != undefined)
                            rotatevalue = "rotate(-" + chartdata.chart.slantdegree + ")";
                        else
                            rotatevalue = "rotate(-" + 65 + ")";
                        svg.append("g")
      .attr("style", styleborder)
      .attr("transform", "translate(0," + (height + 20) + ")")
      .attr("class", "grid xgrid xtick")
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
      .attr("transform", "translate(0," + (height + 20) + ")")
       .attr("class", "grid xgrid xtick")
      .call(xAxis()
        .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
            );

                    }
                    d3.select(chartId + ' path.domain').attr('d', '');
                }

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
                 d3.selectAll(chartId + ' .linerect .' + cType + d.replace(/[^a-zA-Z0-9]/g, ""))
        .attr("width", 1)
         .style('opacity', 1);

                 d3.selectAll('.' + cType + d.replace(/[^a-zA-Z0-9]/g, ""))
                 //.attr("r", 8)
        .transition()
         .duration(0)
         .style('opacity', 1);

                 var alltext = d3.selectAll('text' + '.' + cType + d.replace(/[^a-zA-Z0-9]/g, ""));
                 if (chartType.search('Multi') == -1)
                     var htmlcontent = '';
                 else {
                     if (chartdata.chart.tooltipheader == undefined || chartdata.chart.tooltipheader == '')
                         var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Node: ' + d + '</span><hr>';
                     else
                         var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + chartdata.chart.tooltipheader + ': ' + d + '</span><hr>';
                 }

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
                  d3.selectAll(chartId + ' .linerect .' + cType + d.replace(/[^a-zA-Z0-9]/g, ""))
        .attr("width", 0)
         .style('opacity', 1);
                  d3.selectAll('.' + cType + d.replace(/[^a-zA-Z0-9]/g, ""))
              .style('opacity', 0.3)
                  //.attr("r", 5)
          .transition()
         .duration(0);
                  div.transition()
                .duration(100)
                .style("opacity", 0);
              }
          });


            };
            function drawlinepath(cType, cData, id) {
                var linerect = svg.selectAll('linerect')
     .data(cData)
    .enter().append('g')
    .attr('class', 'linerect');
                linerect.append('rect')
    .attr("class", function (d) { return cType + d.label.replace(/[^a-zA-Z0-9]/g, "") })
    .style("fill", "grey")
    .attr("width", 0)
     .attr("height", height - 25)
     .attr("x", function (d)
     { return x(d.label) + x.rangeBand() / 2; })
     .attr("y", 45);
     
     for(i=0;i<chartdata.data.length;i++){
            if(chartdata.data[i].value < 0){
                 
                 var linerect = svg.selectAll('linetickeach')
     .data(cData)
    .enter().append('g')
    .attr('class', 'linetickeach');
                linerect.append('rect')
    .attr("class", function (d) { return cType + d.label.replace(/[^a-zA-Z0-9]/g, "") })
    .style("fill", "lightgrey")
    .attr("width", 1)
     .attr("height", 5)
     .attr("x", function (d)
     { return x(d.label) + x.rangeBand() / 2; })
     .attr("y", height+20);


            }
        }
            }
            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select1.property('selectedIndex'),
        data = options1[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        var multitrue = chartType.search("Multi") != -1 ? true : false;
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, chartType, '.' + data, multitrue);
                        else
                            exportfile(chartId, chartdata, chartdata.export.filename, '.' + data, multitrue);
                    }

                }
                if (chartdata.export.showexport == true) {
                    if (chartType.search('Multi') != -1)
                        var selecttopval = '35px';
                    else
                        var selecttopval = '22px';
                    var select1 = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:' + selecttopval + ';height:18px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px'),
    options1 = select1.selectAll('option').data(chartdata.export.format); // Data join

                    // Enter selection
                    options1.enter().append("option").text(function (d) {
                        return d;
                    });


                }
            }
              
              if (chartdata.multichart != undefined && d3.select(chartId + ' .selectcharttype')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data1 = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if(data1.source == false){
                      d3charts(data1.type,chartId, chartdata);
                      d3.select(window).on("resize.one", function() {
                       redrawchart(data1.type,chartId, chartdata);
                        });
                  }
                  else{
                           var dataGroup = d3.nest()
                            .key(function (d) {
                                return d.category;
                            })
                            .entries(chartdata.data);

                             for(var i = 0; i < dataGroup.length; i++){
        if(dataGroup[i].hasOwnProperty("key")){
            dataGroup[i]["category"] = dataGroup[i]["key"];
            delete dataGroup[i]["key"];
        }

        if(dataGroup[i].hasOwnProperty("values")){ //added missing closing parenthesis
            dataGroup[i]["data"] = dataGroup[i]["values"];
            delete dataGroup[i]["values"];
        }
    }
                                var changeddata = JSON.parse(JSON.stringify(chartdata));;
                            changeddata.data = dataGroup;
                       d3charts(data1.type,chartId, changeddata);
                       d3.select(window).on("resize.two", function() {
                       redrawchart(data1.type,chartId, changeddata);
                        });
}

                  }

                    }

                
                if (chartdata.multichart.show == true && d3.select(chartId + ' .selectchart')[0][0] == null) {
                        var selecttopval = '35px';
                    var select = d3.select(chartId).append("select").attr('class','selectchart').on("change", change).attr('style', 'float:right;position:relative;top:' + selecttopval + ';height:18px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px;margin-right:10px'),
    options = select.selectAll('option').data(chartdata.multichart.format); // Data join

                    // Enter selection
                    options.enter().append("option").text(function (d) {
                        return d.name;
                    })
                    .attr('data-chart',function(d){
                        return d.type;
                    })
                    .attr('data-source',function(d){
                        return d.source;
                    });


                }
            }

            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var bottommargin = chartdata.chart.slant ? 50 : 40;
            var colorfunc = d3.scale.category20c();
            var margin = { top: 40, right: 12, bottom: (bottommargin + 20), left: 12 };
            var chartcontent = d3.select(chartId);
            var showlegendwidth = chartdata.chart.showlegend == true ? 30 : 0;
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right - showlegendwidth;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var showlegendwidth = chartdata.chart.showlegend == true ? 30 : 0;
            var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
            var viewboxval = chartType.search("Multi") != -1 ? 70 : 40;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif; background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
            var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
            var y = d3.scale.linear()
    .range([height, 25]);
            var xaxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5); //nothing
            function xAxis() {
                return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
            }
            function yaxis() { 
                return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
          .tickFormat(function (d) {
              var prefix = d3.formatPrefix(d);
              if(d3.formatPrefix(d).symbol == "m")
                return d;
            else
              return prefix.scale(d) + prefix.symbol;
          })
            }
            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + viewboxval) + ' ' + (height + margin.top + margin.bottom + 10)) // + 40 + showlegendwidth
        .attr('preserveAspectRatio', 'xMinYMin')
        .append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")");
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');
            svg.append("text")
        .attr("x", 0)
        .attr("y", function () {
            if (chartType.search('Multi') != -1)
                return 35;
            else
                return 23;
        })
        .attr("text-anchor", "start")
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
         .attr('class', 'caption captiontext')
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
        .attr("y", function () {
            if (chartType.search('Multi') != -1)
                return 33;
            else
                return 20.5;
        })
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
            x.domain(chartdata.data.map(function (d) { return d.label; }));
            var domainmin = d3.min(chartdata.data, function (d) {
             if (d.value != 0 & d.value>= 0)
              return d.value - 0.25 * d.value;
          else
             return d.value + 0.25 * d.value;
               });
            var domainmax = d3.max(chartdata.data, function (d) {
                 if (d.value>= 0)
             return d.value + 0.3 * d.value; 
                 else
             return d.value - 0.3 * d.value;        
              });
            y.domain([domainmin, domainmax]);


            if (chartType == 'MultiLine2D' || chartType == 'MultiArea2D' || chartType == 'MultiScatter2D' || chartType == 'MultiStepLine2D' || chartType == 'MultiStepArea2D' || chartType == 'MultiCurve2D' || chartType == 'MultiCurveArea2D') {

                var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.data);
            };
            if (chartType != 'MultiLine2D' && chartType != 'MultiArea2D' && chartType != 'MultiScatter2D' && chartType != 'MultiStepLine2D' && chartType != 'MultiStepArea2D' && chartType != 'MultiCurve2D' && chartType != 'MultiCurveArea2D') {

                if (chartdata.chart.slant) {
                    if (chartdata.chart.slantdegree != undefined)
                        rotatevalue = "rotate(-" + chartdata.chart.slantdegree + ")";
                    else
                        rotatevalue = "rotate(-" + 65 + ")";
                    svg.append("g")
      .attr("style", styleborder)
      .attr("transform", "translate(0," + (height + 20) + ")")
      .attr("class", "grid xgrid xtick")
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
      .attr("transform", "translate(0," + (height + 20) + ")")
       .attr("class", "grid xgrid xtick")
      .call(xAxis()
        .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
            );

                }
            }

            svg.append("g")
  .attr("class", "gridy")
      .call(yaxis()
       .tickSize(-width, 0, 0)
            )

    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .text(chartdata.chart.yaxisname);

            d3.selectAll(chartId + " .grid .tick line").style("stroke-width", function (d, i) {
                if (i == 0)
                    return 2;
                else
                    return 1.2;
            }
    );
            var dottedlinearr = [];

            if (chartType == 'Line2D' || chartType == 'MultiLine2D' || chartType == 'StepLine2D' || chartType == 'MultiStepLine2D') {
                var valueline = d3.svg.line()
    .defined(function (d, i) {

        if (d.value == 0) {
            if (i == 0 && currentchartdata[i].value == 0) {
                xprev = x(currentchartdata[i].label) + x.rangeBand() / 2;
                if(domainmin >=0)
                yprev = y(domainmin);
                else
                 yprev = y(0);   
            }

            else {

                for (j = i; j > 0; j--) {

                    if (currentchartdata[j - 1].value != 0) {
                        xprev = x(currentchartdata[j - 1].label) + x.rangeBand() / 2;
                        yprev = y(currentchartdata[j - 1].value);
                        break;
                    }

                }

            }


            if (chartType == 'Line2D' || chartType == 'MultiLine2D') {
                if (i + 1 == currentchartdata.length && currentchartdata[i].value != 0) {
                    xnext = x(currentchartdata[i].label) + x.rangeBand() / 2;
                    ynext = y(currentchartdata[i - 1].value);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else if (i + 1 == currentchartdata.length && currentchartdata[i].value == 0) {
                    xnext = x(currentchartdata[i].label) + x.rangeBand() / 2;
                    if(domainmin >= 0)
                    ynext = y(domainmin);
                    else
                     ynext = y(0);   
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else {

                    for (j = i; j < currentchartdata.length - 1; j++) {
                        if (currentchartdata[j + 1].value != 0) {
                            xnext = x(currentchartdata[j + 1].label) + x.rangeBand() / 2;
                            ynext = y(currentchartdata[j + 1].value);
                            dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                            break;
                        }

                    }

                }

            }
            else {
                if (i == 0) {
                    xnext1 = x(currentchartdata[i + 1].label) + x.rangeBand() / 2;
                    xnext2 = x(currentchartdata[i + 1].label) + x.rangeBand() / 2;
                    ynext1 = y(domainmin);
                    ynext2 = y(domainmin);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext1 + ',' + ynext1 + 'L' + xnext2 + ',' + ynext2);
                }

                else {
                    var count = 0;
                    var yval;
                    for (j = i; j >= 0; j--) {
                        if (j == 0)
                            yval = y(domainmin);
                        else {
                            if (currentchartdata[j - 1].value != 0) {
                                yval = y(currentchartdata[j - 1].value);
                                break;
                            }
                        }

                    }
                    for (j = i; j <= currentchartdata.length; j++) {
                        if (j == currentchartdata.length - 1) {

                            xnext1 = x(currentchartdata[j].label) + x.rangeBand() / 2;
                            xnext2 = x(currentchartdata[j].label) + x.rangeBand() / 2;
                            ynext1 = yval;
                            ynext2 = yval;
                            dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext1 + ',' + ynext1 + 'L' + xnext2 + ',' + ynext2);
                            break;
                        }
                        else {
                            if (currentchartdata[j + 1].value != 0) {
                                xnext1 = x(currentchartdata[j + 1].label) + x.rangeBand() / 2;
                                xnext2 = x(currentchartdata[j + 1].label) + x.rangeBand() / 2;
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
        return x(d.label) + x.rangeBand() / 2;
    })
    .y(function (d) {
        return y(d.value);
    });
            }
            else {
                if (chartType == "Curve2D" || chartType == "MultiCurve2D") {
                    var valueline = d3.svg.line()
    .x(function (d) {
        return x(d.label) + x.rangeBand() / 2;
    })
    .y(function (d) {
        return y(d.value);
    });
                }
                else {
                    var valueline = d3.svg.line()
    .defined(function (d) {
        return d.value != 0;
    })
    .x(function (d) {
        return x(d.label) + x.rangeBand() / 2;
    })
    .y(function (d) {
        return y(d.value);
    });
                }



            }

            if (chartType == 'StepLine2D' || chartType == 'MultiStepLine2D') {
                valueline.interpolate('step-after');
            }
            if (chartType == 'Curve2D' || chartType == 'MultiCurve2D') {
                valueline.interpolate('cardinal');
            }

            if (chartType == 'Line2D' || chartType == 'StepLine2D' || chartType == 'Curve2D') {
                currentchartdata = chartdata.data;
                dottedlinearr = [];
                var color = chartdata.chart.pallattecolor[0];
                var path = svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(chartdata.data))
        .attr("style", 'stroke:' + color + ';fill:none;');
                for (i = 0; i < dottedlinearr.length; i++) {
                    svg.append("path")
        .attr("class", "line")
        .attr("d", dottedlinearr[i])
        .attr("style", 'stroke:' + color + ';fill:none;')
        .style("stroke-dasharray", ("3, 3"));
                }
                drawCircle(chartType, chartdata.data, color, chartType);
                var totalLength = path.node().getTotalLength();

                path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
                tickspace(chartdata.data);
            }

            else if (chartType == 'Scatter2D') {
                var color = chartdata.chart.pallattecolor[0];
                drawCircle('Scatter2D', chartdata.data, color, chartType);
                tickspace(chartdata.data);
            }

            else if (chartType == 'MultiScatter2D') {
                dataGroup.forEach(function (d, i) {
                    var j = i;
                    var color = chartdata.chart.pallattecolor[i];
                    var keyid = d.key;
                    var colorstyle = 'stroke:' + color + ';display:none';

                    var path = svg.append('path')
        .attr('d', valueline(d.values))
         .attr("class", chartType + keyid.replace(/[^a-zA-Z0-9]/g, "") + ' line')
          .attr("data-visibilitypath", "true")
           .attr("data-categorycolumn", d.key)
        .attr('style', colorstyle);
                    if (j == 0)
                        drawlinepath(chartType, d.values, d.key);
                    drawCircle('MultiScatter2D', d.values, color, d.key);


                });
                tickspace(dataGroup[0].values);
                if (chartdata.chart.showlegend) {
                    var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                    legendgroup.append('g')
            .append('rect')
            .attr('width', '85')
            .attr('height', dataGroup.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 5)
            .attr('y', 42.5)
            .attr('stroke', 'lightgrey');
                    var legend = legendgroup.selectAll('.legend')
        .data(dataGroup)
        .enter()
      .append('g')
        .attr('class', 'legend');
                    legend.append('rect')
        .attr('x', width)
        .attr('y', function (d, i) { return (i + 3) * 15; })
        .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', 0.7)
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i];
        });

                    legend.append('text')
        .attr('x', width + 12)
        .attr('y', function (d, i) { return ((i + 3) * 15) + 9; })
        .text(function (d) {
            if (d.key.length > 10)
                return d.key.substr(0, 10).toUpperCase() + '...';
            else
                return d.key.toUpperCase();
        })
        .style('text-transform', 'uppercase')
        .style('opacity', '0.4')
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i]
        })
         .on("click", function (d, i) {
             var graphselect = chartType + d.key.replace(/[^a-zA-Z0-9]/g, "");
             this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
             if (d3.selectAll('.circletext.' + graphselect).style('display') == 'inline') {
                 d3.selectAll('.' + graphselect).attr("data-visibilitypath", "false");
                 d3.selectAll('.circletext.' + graphselect).style('display', 'none');
             }

             else {
                 this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                 d3.selectAll('.' + graphselect).attr("data-visibilitypath", "true");
                 d3.selectAll('.circletext.' + graphselect).style('display', 'inline');
             }

         })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = '1';
         });

                }
            }

            else if (chartType == 'Area2D' || chartType == 'StepArea2D' || chartType == 'CurveArea2D') {
                var color = chartdata.chart.pallattecolor[0];
                var area = d3.svg.area()
    .x(function (d) {
        return x(d.label) + x.rangeBand() / 2;
    })
    .y0(height)
    .y1(function (d) {
        if (d.value != 0)
            return y(d.value);
        else
            return y(domainmin);
    });
                if (chartType == "StepArea2D") {
                    area.interpolate('step-after');
                }
                if (chartType == "CurveArea2D") {
                    area.interpolate('cardinal');
                }
                svg.append("path")
    .datum(chartdata.data)
        .attr("style", "stroke:transparent ;fill:" + color + ";opacity:.5")
        .attr("d", area);
                svg.selectAll('.xgrid').selectAll('line')
          .style("stroke-dasharray", ("3, 3"))
               .style("opacity", 0)
                .style("stroke-width", 8);
                tickspace(chartdata.data);
            }
            else if (chartType == 'MultiLine2D' || chartType == 'MultiStepLine2D' || chartType == 'MultiCurve2D') {
                dataGroup.forEach(function (d, i) {
                    var j = i;
                    dottedlinearr = [];
                    var color = chartdata.chart.pallattecolor[i];
                    var keyid = d.key;
                    var colorstyle = 'stroke:' + color + ';fill:none';
                    currentchartdata = d.values;
                    var path = svg.append('path')
        .attr('d', valueline(d.values))
         .attr("class", chartType + keyid.replace(/[^a-zA-Z0-9]/g, "") + ' line')
          .attr("data-visibilitypath", "true")
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
          .attr("data-visibilitypath", "true")
           .attr("data-categorycolumn", d.key)
        .attr("style", colorstyle)
        .style("stroke-dasharray", ("3, 3"));
                    }
                    if (j == 0)
                        drawlinepath(chartType, d.values, d.key);
                    drawCircle(chartType, d.values, color, d.key);

                });
                tickspace(dataGroup[0].values);
                if (chartdata.chart.showlegend) {
                    var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                    legendgroup.append('g')
            .append('rect')
            .attr('width', '85')
            .attr('height', dataGroup.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 5)
            .attr('y', 42.5)
            .attr('stroke', 'lightgrey');
                    var legend = legendgroup.selectAll('.legend')
        .data(dataGroup)
        .enter()
      .append('g')
        .attr('class', 'legend');
                    legend.append('rect')
        .attr('x', width)
        .attr('y', function (d, i) { return (i + 3) * 15; })
         .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', 0.7)
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i];
        });

                    legend.append('text')
        .attr('x', width + 12)
        .attr('y', function (d, i) { return ((i + 3) * 15) + 9; })
         .style('text-transform', 'uppercase')
        .style('font-size', '12px')
        .style('opacity', 0.4)
        .text(function (d) {
            if (d.key.length > 10)
                return d.key.substr(0, 10).toUpperCase() + '...';
            else
                return d.key.toUpperCase();
        })

        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i]
        })
        .on("click", function (d, i) {
            var graphselect = chartType + d.key.replace(/[^a-zA-Z0-9]/g, "");
            this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
            if (d3.selectAll('.' + graphselect).style('display') == 'inline') {
                d3.selectAll('.' + graphselect).style('display', 'none');
                d3.selectAll('.' + graphselect).attr("data-visibilitypath", "false");

            }

            else {
                this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                d3.selectAll('.' + graphselect).style('display', 'inline');
                d3.selectAll('.' + graphselect).attr("data-visibilitypath", "true");
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
                }
            }

            else {
                var area = d3.svg.area()
    .x(function (d) {
        return x(d.label) + x.rangeBand() / 2;
    })
    .y0(height)
    .y1(function (d) {
        if (d.value != 0)
            return y(d.value);
        else
            return y(domainmin);
    });
                if (chartType == "MultiStepArea2D")
                    area.interpolate('step-after');
                if (chartType == "MultiCurveArea2D")
                    area.interpolate('cardinal');
                dataGroup.forEach(function (d, i) {
                    var color = chartdata.chart.pallattecolor[i];
                    var colorstyle = 'stroke:' + color;
                    var keyid = d.key;
                    svg.append("path")
    .datum(d.values)
        .attr("style", "stroke:transparent;fill:" + color + ";opacity:0.5")
        .attr("d", area)
        .attr("data-visibilitypath", "true")
         .attr("data-categorycolumn", d.key)
        .attr("class", chartType + keyid.replace(/[^a-zA-Z0-9]/g, ""));
                    svg.selectAll('.xgrid').selectAll('line')
          .style("stroke-dasharray", ("3, 3"))
          .style("opacity", 0)
           .style("stroke-width", 8);

                });
                tickspace(dataGroup[0].values);
                if (chartdata.chart.showlegend) {
                    var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                    legendgroup.append('g')
            .append('rect')
            .attr('width', '85')
            .attr('height', dataGroup.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 5)
            .attr('y', 42.5)
            .attr('stroke', 'lightgrey');
                    var legend = legendgroup.selectAll('.legend')
        .data(dataGroup)
        .enter()
      .append('g')
        .attr('class', 'legend');
                    legend.append('rect')
        .attr('x', width)
        .attr('y', function (d, i) { return (i + 3) * 15; })
         .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', 0.7)
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i];
        });

                    legend.append('text')
        .attr('x', width + 12)
        .attr('y', function (d, i) { return ((i + 3) * 15) + 9; })
        .text(function (d) { return d.key; })
         .style('text-transform', 'uppercase')
         .style('opacity', 0.4)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return chartdata.chart.pallattecolor[i]
        })
         .on("click", function (d, i) {
             var graphselect = chartType + d.key.replace(/[^a-zA-Z0-9]/g, "");
             this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
             if (d3.selectAll('.' + graphselect).style('display') == 'inline') {
                 d3.selectAll('.' + graphselect).style('display', 'none');
                 d3.selectAll('.' + graphselect).attr("data-visibilitypath", "false");
             }

             else {
                 this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                 d3.selectAll('.' + graphselect).style('display', 'inline');
                 d3.selectAll('.' + graphselect).attr("data-visibilitypath", "true");
             }

         })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = 1;
         });

                }
            }



            if (chartType != 'MultiLine2D' && chartType != 'MultiArea2D' && chartType != 'MultiScatter2D' && chartType != 'MultiStepLine2D' && chartType != 'MultiStepArea2D' && chartType != 'MultiCurve2D' && chartType != 'MultiCurveArea2D') {
                d3.selectAll(chartId + ' path.domain').style('opacity', function (d, i) {
                    if (i != 0)
                        this.setAttribute('d', '')
                });
            }

            if (chartdata.chart.credits != undefined) {
                if (chartdata.chart.credits.text != undefined && chartdata.chart.credits.text != '') {
                    var credits = svg.selectAll('.credits')
            .data([1])
            .enter().append('g');
                    var positionwidth;
                    var imagewidth;
                    if (chartdata.chart.credits.imageurl != undefined && chartdata.chart.credits.imageurl != '' && showlegendwidth == 0) {
                        positionwidth = 0;
                        imagewidth = 10;
                    }
                    else if (chartdata.chart.credits.imageurl != undefined && chartdata.chart.credits.imageurl != '' && showlegendwidth != 0) {
                        positionwidth = 0;
                        imagewidth = 10;
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


                    /*var credits= d3.select(chartId).append('div').attr('style','font-size: 11px;float: right;margin-right: 10px;margin-top: -25px;');
                    credits.append('span').style('dispaly','inline-block')
                    .append('p').style('top','-15px').style('position','relative').style('display','inline-block').text('POWERED BY');
                    credits.append('span')
                    .style('display','inline-block')
                    .append('img')
                    .attr('style','width: 30px;height: 30px;top: -5px;position: relative;')
                    .attr('src','http://stage.priceweave.com/stylesheets/images/small-badge-grey-padding.png');*/
                }
            }
        }
        else {
            var bottommargin = chartdata.chart.slant ? 50 : 25;
            var margin = { top: 20, right: 20, bottom: bottommargin, left: 50 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var viewboxval = chartType.search("Multi") != -1 ? 70 : 40;
            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + viewboxval) + ' ' + (height + margin.top + margin.bottom + 10)) // + 40 + showlegendwidth
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
    d3.selectAll(chartId + ' .gridy .tick text').attr('dx', '3').attr('dy', '12').style("text-anchor", "start");
    d3.selection.prototype.last = function () {
        var last = this.size() - 1;
        return d3.select(this[0][last]);
    };
    var captiony = d3.selectAll(chartId + ' .caption')[0][0].getAttribute('y') / 1;
    var liney = d3.selectAll(chartId + ' .gridy .tick').last().attr('transform');
    var lineyval = liney.substring(liney.lastIndexOf(',') + 1, liney.lastIndexOf(')')) / 1;
    if (lineyval < captiony) {
        //d3.selectAll(chartId + ' .caption text').attr('y',captiony-10)
        d3.selectAll(chartId + ' .gridy .tick').last().attr("transform", "translate(" + 0 + "," + (captiony + 5) + ")");
        //d3.selectAll(chartId + ' .gridy .tick line').last().style('display', 'none');
    };

    d3.selectAll(chartId + ' .xtick .tick text').attr('data-widthpos', function (d, i) {
        var summatest;
        if (this.style.display != 'none') {
            var bodyRect = document.body.getBoundingClientRect();
            var elemRect = this.getBoundingClientRect();
            var thispos = elemRect.left - bodyRect.left;
            var elemwidth = this.offsetWidth;
            localstorewidth = thispos + elemwidth;
            return localstorewidth;
        }

    })
            .attr('data-currentpos', function (d, i) {
                if (this.style.display != 'none') {
                    var bodyRect = document.body.getBoundingClientRect();
                    var elemRect = this.getBoundingClientRect();
                    var thispos = elemRect.left - bodyRect.left;
                    return thispos;
                }

            });

    d3.selectAll(chartId + ' .xtick .tick text[data-widthpos]').text(function (d, i) {
        var nextelement = d3.selectAll(chartId + ' .xtick .tick text[data-widthpos]')[0][i + 1];
        if (nextelement != undefined) {
            nextwidth = nextelement.getAttribute('data-currentpos') / 1;
            currentwidth = this.getAttribute('data-widthpos') / 1;
            if (currentwidth > nextwidth && d.length > 10) {
                return d.substring(0, 15) + '...';
            }
            else {
                if (d.length > 20)
                    return d.substring(0, 20) + '...';
                else
                    return d;
            }
        }
        else {
            if (d.length > 15)
                return d.substring(0, 15) + '...';
            else
                return d;
        }
        var againsummatest;
    });

    if (chartType.search('Multi') != -1) {
        d3.selectAll(chartId + ' .gridy .tick line').attr('x2', function () {
            return this.getAttribute('x2') / 1 + 70;
        });
        d3.selectAll(chartId + ' .grid.xtick .domain').attr('d', function () {
            var dval = this.getAttribute('d');
            var first = dval.substring(0, dval.lastIndexOf('H') + 1);
            var last = dval.substring(dval.lastIndexOf('V'), dval.length);
            var middle = dval.substring(dval.lastIndexOf('H') + 1, dval.lastIndexOf('V')) / 1 + 70;
            return first + middle + last;
        });
        for(i=0;i<chartdata.data.length;i++){
            if(chartdata.data[i].value < 0){
                d3.selectAll(chartId + ' .gridy .tick line').style('stroke',function(d,i){
                    if(d == 0)
                    return '#999';
                })
                .style('opacity',function(d,i){
                    if(d == 0)
                    return 1;
                });
                d3.selectAll(chartId + ' path.domain').style('stroke','lightgrey')
                break;
            }
        }
    }
    else {
        d3.selectAll(chartId + ' .gridy .tick line').attr('x2', function () {
            return this.getAttribute('x2') / 1 + 40;
        });
        
        d3.selectAll(chartId + ' .grid.xtick .domain').attr('d', function () {
            var dval = this.getAttribute('d');
            var first = dval.substring(0, dval.lastIndexOf('H') + 1);
            var last = dval.substring(dval.lastIndexOf('V'), dval.length);
            var middle = dval.substring(dval.lastIndexOf('H') + 1, dval.lastIndexOf('V')) / 1 + 40;
            return first + middle + last;
        })
    }

}