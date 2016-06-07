/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var customverticalbar2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {


            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'topbrands', '.' + data, false);
                        else
                            exportfile(chartId, chartdata, chartdata.export.filename, '.' + data, false);
                    }
                }
                if (chartdata.export.showexport == true) {
                    var chartcontentexp = d3.select(chartId);
                    var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float: right;position: relative;top: 45px;height: 27px;border: 0px;color: #727272;border: 1px solid lightgray;border-radius: 5px;outline: 0;margin: 0px;text-transform: uppercase;padding: 5px;font-size: 12px;-webkit-appearance: none;-moz-appearance: none;appearance: none;');
    var options = select.selectAll('option').data(chartdata.export.format); // Data join

                    // Enter selection
                    options.enter().append("option").text(function (d) {
                        return d;
                    });


                }
            }
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var bottommargin = chartdata.chart.slant ? 100 : 20;
            var topval = 30;
            var color = d3.scale.ordinal()
    .range(chartdata.chart.pallattecolor);
            var margin = { top: topval, right: 12, bottom: bottommargin, left: 12 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var styleborder = "fill: none; stroke: lightgrey;  shape-rendering: crispEdges;font:12px sans-serif";
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");



             if(chartcontent[0][0].offsetWidth < 480)
             {
                d3.select(chartId + ' select').style('float','left').style('top',(chartcontent[0][0].offsetHeight - margin.bottom)+'px').style('margin-left','12px');
                heighttemp = height + 70; 
             }
             else{
                 d3.select(chartId + ' select').style('float','right').style('top','45px').style('margin-left',0);
                 heighttemp = height; 
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
                       xScale1 = d3.scale.linear()
        .domain([0, 100])
        .range([0, width+70]);
           var labels = chartdata.data.map(function (d) {
                return d.label;
            });
                         yScale1 = d3.scale.ordinal()
        .domain(labels)
        .rangeRoundBands([25, heighttemp], 0.1);
                    function yAxis1() {
                return d3.svg.axis()
        .scale(yScale1)
        .orient("left")
            }

        var color = d3.scale.linear()
    .domain([0, 1])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
    
    var rectsnext = svg.selectAll('.customrectnext')
        .data(chartdata.data)
        .enter()
        .append('rect')
        .attr('x', function (d,i) {
            return 0;
        })
        .attr('y', function (d, i) {
            return yScale1(d.label.toString()) + 10 + yScale1.rangeBand() / 2;
        })
        .attr('height', function (d) {
            return yScale1.rangeBand() / 5;
        })
        .attr('class', function (d) {
            return 'custombarnext' + d.label.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 1)
        .attr('rx', 10)
                .attr('width', function (d,i) { 
                        return xScale1(100);
        })
        .attr('fill',function(d){
            return '#e8ecef';
        });
       

      var rects = svg.selectAll('.customrect')
        .data(chartdata.data)
        .enter()
        .append('rect')
        .attr('x', function (d,i) {
            return 0;
        })
        .attr('y', function (d, i) {
            return yScale1(d.label.toString()) +  10 + yScale1.rangeBand() / 2;
        })
        .attr('height', function (d) {
            return yScale1.rangeBand() / 5;
        })
        .attr('class', function (d) {
            return 'custombar' + d.label.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 1)
        .attr('rx', 10)
                .attr('width', function (d,i) {
                        return xScale1(d.value);
        })
        .attr('fill',function(d,i){
            return chartdata.chart.pallattecolor[i];
        })
        .on("mouseover", function (d, i) {
               this.style.cursor = 'pointer';
               this.style.opacity = 1;
               div.transition()
                .duration(100)
                .style("opacity", 1);

               var xattr = bodyRect = elemRect = yattr = 0;
               var bodyRect = document.body.getBoundingClientRect();
               var elemRect = this.getBoundingClientRect();
               if (elemRect.right > window.innerWidth / 2)
                   var xattr = (elemRect.right - bodyRect.left - div[0][0].offsetWidth) + 'px';
               else
                   var xattr = (elemRect.right - bodyRect.left + 20) + 'px';
               var yattr = (elemRect.top - bodyRect.top) + 'px';
               //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
               var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ': ' + d3.format(',')(d.value.toFixed(2) / 1) + '%</span>';
               div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);
           })
                    .on("mouseout", function (d, i) {
                        this.style.cursor = 'pointer';
                        div.transition()
                .duration(100)
                .style("opacity", 0);
                    });

        var rectstext = svg.selectAll('.customrecttext')
        .data(chartdata.data)
        .enter()
        .append('text')
        .attr('x', function (d,i) {
            return 50;
        })
        .attr('y', function (d, i) {
            return yScale1(d.label.toString()) + yScale1.rangeBand() / 10;
        })
        .attr('height', function (d) {
            return yScale1.rangeBand() / 2;
        })
        .attr('class', function (d) {
            return 'custombartext' + d.label.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 1)
                .attr('width', function (d,i) {
            return xScale1(d.value);
        })
        .attr('fill',function(d){
            return '#727272';
        })
        .style("text-anchor", "middle")
       .text(function(d) { return d.value+'%'; })
       .attr('dx','5')
       .attr('dy','12.5')
       .style('font-size','1.5em');
          
        var rectslabeltext = svg.selectAll('.customrectlabeltext')
        .data(chartdata.data)
        .enter()
        .append('text')
        .attr('x', function (d,i) {
            return 0;
        })
        .attr('y', function (d, i) {
            return yScale1(d.label.toString())+yScale1.rangeBand() / 3;
        })
        .attr('height', function (d) {
            return yScale1.rangeBand() / 2;
        })
        .attr('class', function (d) {
            return 'custombarlabeltext' + d.label.replace(/[^a-zA-Z0-9]/g, "");
        })
        .attr('data-visibility', true)
        .style('opacity', 1)
        .attr('fill',function(d){
            return '#727272';
        })
        .style("text-anchor", "start")
       .text(function(d) { return d.label.toString().toUpperCase(); })
       .attr('dx','35')
       .attr('dy','12.5')
       .style('font-size','0.9em');  
        

        var shapes = svg.selectAll('.triangle')
        .data(chartdata.data)
        .enter();
        shapes.append('path')
        .filter(function(d){ return d.type.toString().toUpperCase() == 'UP'; })
    .attr("transform", function(d) { 
        return "translate(" + 12 + "," + (yScale1(d.label.toString())+yScale1.rangeBand() / 4) + ")"; 
    })
    .attr("d", d3.svg.symbol().type("triangle-up"))
    .style('fill',function(d){
        if(d.denomination.toString().toUpperCase() == 'PLUS')
            return '#b8e986'
        else
            return '#ff3b53'
    })
    .style('stroke-width',0);
    shapes.append('path')
        .filter(function(d){ return d.type.toString().toUpperCase() == 'DOWN'; })
    .attr("transform", function(d) { 
        return "translate(" + 12 + "," + (yScale1(d.label.toString())+yScale1.rangeBand() / 4) + ")"; 
    })
    .attr("d", d3.svg.symbol().type("triangle-down"))
    .style('fill',function(d){
        if(d.denomination.toString().toUpperCase() == 'PLUS')
            return '#b8e986'
        else
            return '#ff3b53'
    })
    .style('stroke-width',0);


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

