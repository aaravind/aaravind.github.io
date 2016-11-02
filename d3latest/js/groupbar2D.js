/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var groupBar2D = function (chartId, chartdata, chartType) {
  var opacitymin = 0.7;
  var opacitymax = 1;
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {


            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'Groupbar', '.' + data, false);
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
            var color = d3.scale.ordinal()
    .range(chartdata.chart.pallattecolor);
            var margin = { top: topval, right: 12, bottom: bottommargin, left: 12 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            var styleborder = "fill: none; stroke: lightgrey;  shape-rendering: crispEdges;font:12px sans-serif";
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");


    var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

function yAxis() { 
                return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(4)
          .tickFormat(function (d) {
              var prefix = d3.formatPrefix(d);
              if(d3.formatPrefix(d).symbol == "m")
                return d;
            else
              return prefix.scale(d) + prefix.symbol;
          })
            };
 eachcolumn = [];
 execonce = false;
 chartdata.data.forEach(function(d){
  if(d.data.length != 0 && !execonce)
  {
    d.data.forEach(function(x){
      eachcolumn.push(x.label);
    })
    execonce =  true;
  }
 });
  //chartdata.data[0].data.forEach(function(d) {
  // eachcolumn.push(d.label);
 // });

  x0.domain(chartdata.data.map(function(d) { return d.category; }));
  x1.domain(eachcolumn).rangeRoundBands([0, x0.rangeBand()]);
  var minval =d3.min(chartdata.data, function(d) { return d3.min(d.data, function(d) { return d.value; }); });
  var minnow = minval < 0 ? minval : 0; 
  y.domain([minnow, d3.max(chartdata.data, function(d) { return d3.max(d.data, function(d) { return d.value; }); })]);

  if(chartdata.colormap == undefined)
  {
        chartdata.colormap = [];
        for(i=0;i<eachcolumn.length;i++){
            var tempobjcolor={};
            tempobjcolor.name = eachcolumn[i];
            tempobjcolor.value = chartdata.chart.pallattecolor[i];
             chartdata.colormap.push(tempobjcolor);
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
     var chartgroup =  svg.append("g")
     .attr("class", "chartgroup");
     chartgroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chartgroup.append("g")
      .attr("class", "y grid")
      .call(yAxis().tickSize(-width-75, 0, 0));

  var categ = chartgroup.selectAll(".categ")
      .data(chartdata.data)
    .enter().append("g")
      .attr("class", "categ")
      .attr("transform", function(d) { return "translate(" + x0(d.category) + ",0)"; });

  categ.selectAll("rect")
      .data(function(d) { 
        if(d.data.length == 0)
        {
          var temparr = [];
          var tempobj = {};
          eachcolumn.forEach(function(d){
            tempobj.label=d;
            tempobj.value = 0;
            temparr.push(tempobj);
          })
          return temparr;
        }
        else
        return d.data; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("class", function(d){
        return chartType+d.label.replace(/[^a-zA-Z0-9]/g, "");
      })
      .attr('data-visibility',"true")
      .attr("x", function(d) { return x1(d.label); })
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
             var htmlcontent = '';
             if (d.tool == '') {
                 var htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ':' + d3.format(',')(d.value.toFixed(2) / 1) +'</span><br>';
             }

             else {
              if(chartdata.chart.tooltipcontenttitle == undefined || chartdata.chart.tooltipcontenttitle == '')
                  var htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ':' + d3.format(',')(d.value.toFixed(2) / 1) +'</span><br>';
              else{
                var tooltiphead = (chartdata.chart.tooltipheader != undefined && chartdata.chart.tooltipheader != '') ? (chartdata.chart.tooltipheader + ' : ') : ''; 
                var htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + tooltiphead + d.label + '<hr>' +  chartdata.chart.tooltipcontenttitle + ' : '+ d3.format(',')(d.value.toFixed(2) / 1) +'</span><br>';
                  }
             }
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
                this.style.opacity = opacitymin;
                div.transition()
                .duration(100)
                .style("opacity", 0);
            })
      .attr('height', 0)
                               .attr('y', function (d, i) {
                                   return y(0);
                               })
               .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .attr("y", function(d) { 
        if(d.value<0) 
        return y(0);
        else
        return y(d.value); })
      .attr("height", function(d) { 
        if(d.value < 0)
        return y(d.value) -y(0);
        else
        return y(0) - y(d.value); })

      .style("fill", function(d) { 
            if (chartdata.colormap != undefined && chartdata.colormap != '') {
                for (i = 0; i < chartdata.colormap.length; i++) {
                    if (d.label == chartdata.colormap[i].name)
                        return chartdata.colormap[i].value;
                }
            }
            else
                return color(d.label);
            })
      .style("opacity",opacitymin);

   d3.selectAll(chartId + ' .y path.domain').attr('d', '');
   d3.selectAll(chartId + ' .grid .tick text').attr('transform', 'translate(5,10)').style('text-anchor','start');
   d3.selectAll(chartId + ' .chartgroup').attr('transform', 'translate(0,20)');

  d3.selectAll(chartId + ' .x.axis .tick line').attr('y2',0);
  d3.select(chartId + ' .y.grid .tick line').attr('x2',0)
  d3.selectAll(chartId + ' .x.axis .domain').attr('d','M0,0V0H'+(width+70)+'V0');


   if (chartdata.chart.showlegend) {
                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                legendgroup.append('g')
            .append('rect')
            .attr('width', '110')
            .attr('height', chartdata.colormap.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 30)
            .attr('y', 12.5)
            .attr('stroke', 'lightgrey');

                var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
                legend.append('rect')
        .attr('x', width - 25)
        .attr('y', function (d, i) { return (i + 1) * 15; })
         .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', opacitymin)
        .style('fill', function (d, i) {
            return d.value;
        });

                legend.append('text')
        .attr('x', width - 25 + 12)
        .attr('y', function (d, i) { return ((i + 1) * 15) + 9; })
        .text(function (d) {
            if (d.name.length > 20)
                return d.name.substr(0, 20).toUpperCase() + '...';
            else
                return d.name.toUpperCase();
        })
         .style('text-transform', 'uppercase')
         .style('opacity', opacitymin)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
        .on("click", function (d, i) {
             var graphselect = chartType + d.name.replace(/[^a-zA-Z0-9]/g, "");
             this.parentNode.getElementsByTagName('rect')[0].style.opacity = opacitymin;
             if (d3.selectAll(chartId +' .' + graphselect).style('display') == 'inline') {
                 d3.selectAll(chartId +' .' + graphselect).style('display', 'none');
                 d3.selectAll(chartId +' .' + graphselect).attr("data-visibility", "false");
             }

             else {
                 this.parentNode.getElementsByTagName('rect')[0].style.opacity = opacitymax;
                 d3.selectAll(chartId +' .' + graphselect).style('display', 'inline');
                 d3.selectAll(chartId +' .' + graphselect).attr("data-visibility", "true");
             }

         })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = opacitymax;
         })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              this.style.opacity = opacitymin;
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

