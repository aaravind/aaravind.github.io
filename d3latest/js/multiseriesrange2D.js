/**
 * D3 Chart - Column2D Graph
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var multiSeriesRange2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {


            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'MultiSeries', '.' + data, false);
                        else
                            exportfile(chartId, chartdata, chartdata.export.filename, '.' + data, false);
                    }
                }
if (chartdata.export.showexport == true) {
                    var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:22px ;height:20px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px'),
    options = select.selectAll('option').data(chartdata.export.format); // Data join

                    // Enter selection
                    options.enter().append("option").text(function (d) {
                        return d;
                    });


                }
            }
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
              var currentchartdata;
            var bottommargin = chartdata.chart.slant ? 100 : 50;
            var topval = 30;
            var color = d3.scale.category10();
            var chartcontent = d3.select(chartId);
            var margin = { top: topval, right: 12, bottom: 100, left: 12 };
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;

            var margin2 = {top: height+50, right: 12, bottom: 20, left: 12};
            var height2 = chartcontent[0][0].offsetHeight - margin2.top - margin2.bottom; 
            var styleborder = "fill: none; stroke: lightgrey;  shape-rendering: crispEdges;font:12px sans-serif";
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");


            

var parseDate = d3.time.format("%Y%m%d%H%M").parse;
var parsenext = d3.time.format("%Y%m%d%H%M");
var parsenext2 = d3.time.format("%d-%m-%Y %H:%M")
 
var x = d3.time.scale().range([30, width-30]),
    x2 = d3.time.scale().range([30, width-30]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);
 if(chartdata.colormap == undefined)
  {
        chartdata.colormap = [];
        for(i=0;i<chartdata.data.length;i++){
            var tempobjcolor={};
            tempobjcolor.name = chartdata.data[i].category;
            tempobjcolor.value = chartdata.chart.pallattecolor[i];
             chartdata.colormap.push(tempobjcolor);
        }
  }
  function xAxis() {
                return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%d-%m-%Y / %H:%M"))
        .ticks(5)
            }

var xAxis2 = d3.svg.axis().scale(x2).orient("bottom").tickFormat(d3.time.format("%d-%m-%Y / %H:%M")).ticks(5);

          function yaxis() { 
                return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
          .tickFormat(function (d) {
              var prefix = d3.formatPrefix(d);
              return prefix.scale(d) + prefix.symbol;
          })
            };
 
var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush1);
 
 var dottedlinearr = [];
 var dottedlinearr2 = [];
var line = d3.svg.line()
    .defined(function(d,i) { 
             if (d.value == 0) {

            if (i == 0 && currentchartdata[i].value == 0) {
                xprev = x(currentchartdata[i].label);
                yprev = y(domainleast);
            }

            else {

                for (j = i; j > 0; j--) {

                    if (currentchartdata[j - 1].value != 0) {
                        xprev = x(currentchartdata[j - 1].label);
                        yprev = y(currentchartdata[j - 1].value);
                        break;
                    }

                }

            }

                            if (i + 1 == currentchartdata.length && currentchartdata[i].value != 0) {
                    xnext = x(currentchartdata[i].label);
                    ynext = y(currentchartdata[i - 1].value);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else if (i + 1 == currentchartdata.length && currentchartdata[i].value == 0) {
                    xnext = x(currentchartdata[i].label);
                    ynext = y(domainleast);
                    dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else {

                    for (j = i; j < currentchartdata.length - 1; j++) {
                        if (currentchartdata[j + 1].value != 0) {
                            xnext = x(currentchartdata[j + 1].label);
                            ynext = y(currentchartdata[j + 1].value);
                            dottedlinearr.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                            break;
                        }

                    }

                }
                return false;
             }
             else
            return true;
          })
    .interpolate("cubic")
    .x(function(d) { return x(d.label); })
    .y(function(d) { return y(d.value); });
 
var line2 = d3.svg.line()
    .defined(function(d,i) { 
             if (d.value == 0) {

            if (i == 0 && currentchartdata[i].value == 0) {
                xprev = x2(currentchartdata[i].label);
                yprev = y2(0);
            }

            else {

                for (j = i; j > 0; j--) {

                    if (currentchartdata[j - 1].value != 0) {
                        xprev = x2(currentchartdata[j - 1].label);
                        yprev = y2(currentchartdata[j - 1].value);
                        break;
                    }

                }

            }

                            if (i + 1 == currentchartdata.length && currentchartdata[i].value != 0) {
                    xnext = x2(currentchartdata[i].label);
                    ynext = y2(currentchartdata[i - 1].value);
                    dottedlinearr2.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else if (i + 1 == currentchartdata.length && currentchartdata[i].value == 0) {
                    xnext = x2(currentchartdata[i].label);
                    ynext = y2(0);
                    dottedlinearr2.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                }
                else {

                    for (j = i; j < currentchartdata.length - 1; j++) {
                        if (currentchartdata[j + 1].value != 0) {
                            xnext = x2(currentchartdata[j + 1].label);
                            ynext = y2(currentchartdata[j + 1].value);
                            dottedlinearr2.push('M' + xprev + ',' + yprev + 'L' + xnext + ',' + ynext);
                            break;
                        }

                    }

                }
                return false;
             }
             else
            return true;
          })
    .interpolate("cubic")
    .x(function(d) {return x2(d.label); })
    .y(function(d) {return y2(d.value); });


            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right + 70) + ' ' + (height + margin.top + margin.bottom + 10))
        .attr('preserveAspectRatio', 'xMinYMin');
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');

            svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
 
var focus = svg.append("g")
  .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");
      
var context = svg.append("g")
  .attr("transform", "translate(" + (margin2.left) + "," + margin2.top + ")");

   chartdata.data.forEach(function(d) {
    d.data.forEach(function(f){
      if(f.label.search != undefined)
      f.label = parseDate(f.label);
    })
    });
    var domainleast = d3.min(chartdata.data, function(c) { return d3.min(c.data, function(v) { return v.value; }); });
    x.domain(d3.extent(chartdata.data[0].data, function(d) { return d.label; }));
    y.domain([d3.min(chartdata.data, function(c) { return d3.min(c.data, function(v) { return v.value; }); }),
              d3.max(chartdata.data, function(c) { return d3.max(c.data, function(v) { return v.value; }); }) ]);
    x2.domain(x.domain());
    y2.domain(y.domain());
    
    var focuslineGroups = focus.selectAll("g")
        .data(chartdata.data)
      .enter().append("g");
      
    var focuslines = focuslineGroups.append("path")
        .attr("class",function(d,i){ return chartType + chartdata.data[i].category + " linegroup" })
        .attr("d", function(d,i) { 
          currentchartdata = d.data;
          dottedlinearr = [];
            var linedata = line(d.data);
                    for (i = 0; i < dottedlinearr.length; i++) {
                        focus.append("path")
        .attr("class", "dotted"+d.category + ' '+ chartType + d.category)
        .attr("d", dottedlinearr[i])
          .attr("data-visibilitypath", "true")
           .attr("data-categorycolumn", d.category)
        .attr("style", function(){
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == d.category)
              return 'stroke:' + chartdata.colormap[k].value + ';fill:none'
          }
        })
        .style("stroke-dasharray", ("3, 3"));
                    }
          return linedata; })
        .style("stroke", function(d){
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == d.category)
              return chartdata.colormap[k].value
          }
        })
        .attr("data-visibilitypath", "true")
        .style('fill','none')
        .attr("clip-path", "url(#clip)");
    
     var totalLength = focuslines.node().getTotalLength();

                    focuslines
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);     


    focus.append("g")
        .attr("class", "grid x axis xgrid")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis())

        .selectAll(chartId +' .x .tick text') // select all the x tick texts
          .call(function(t){                
            t.each(function(d){ // for each one
              var self = d3.select(this);
              var s = self.text().split('/');  // get the text and split it
              self.text(''); // clear it out
              self.append("tspan") // insert two tspans
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[0]);
              self.append("tspan")
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[1]);
            });
        });
 
    focus.append("g")
        .attr("class", "gridy y axis")
        .call(yaxis()
       .tickSize(-width-70, 0, 0));
        d3.select(chartId + ' .y.axis path.domain').attr('d', '');
        d3.selectAll(chartId + ' .gridy .tick text').attr('x', '0').attr('y', '10').style('text-anchor','start');
    var contextlineGroups = context.selectAll("g")
        .data(chartdata.data)
      .enter().append("g");
    
    var contextLines = contextlineGroups.append("path")
        .attr("class", function(d,i){ return  chartType + chartdata.data[i].category + " line"})
        .attr("d", function(d,i) { 
          currentchartdata = d.data;
          dottedlinearr2 = [];
            var linedata2 = line2(d.data);
                    for (i = 0; i < dottedlinearr2.length; i++) {
                        context.append("path")
        .attr("class", "linegroup")
        .attr("d", dottedlinearr2[i])
          .attr("class", 'dotted' + d.category + ' line' + ' ' + chartType + d.category)
          .attr("data-visibilitypath", "true")
           .attr("data-categorycolumn", d.category)
        .attr("style",function(){
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == d.category)
              return 'stroke:' + chartdata.colormap[k].value + ';fill:none'
          }
        })
        .style("stroke-dasharray", ("3, 3"));
                    }
          return linedata2; })
        .style("stroke",  function(d){
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == d.category)
              return chartdata.colormap[k].value
          }
        })
        .attr("data-visibilitypath", "true")
        .style('fill','none')
        .attr("clip-path", "url(#clip)");


    context.append("g")
        .attr("class", "grid x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2)
        .selectAll(chartId +' .x .tick text') // select all the x tick texts
          .call(function(t){                
            t.each(function(d){ // for each one
              var self = d3.select(this);
              var s = self.text().split('/');  // get the text and split it
              self.text(''); // clear it out
              self.append("tspan") // insert two tspans
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[0]);
              self.append("tspan")
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[1]);
            });
        });
 
    context.append("g")
        .attr("class", "x brush")
        .call(brush)
      .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7)
        .style('fill','lightgrey')
        .style('opacity','0.8');
  d3.selectAll(chartId + ' .grid .tick text').attr('y',5);
        function brush1() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.selectAll("path.linegroup").attr("d",  function(d,i) {
    currentchartdata = d.data;
          dottedlinearr = [];
            var linedata = line(d.data);
                    for (i = 0; i < dottedlinearr.length; i++) {
                        focus.selectAll("path.dotted"+d.category)
        .attr("d", dottedlinearr[i]);
                    }
          return linedata;

  });

       var totalLength = focus.selectAll("path.linegroup").node().getTotalLength();

                    focus.selectAll("path.linegroup")
      .attr("stroke-dasharray", 0)
      .attr("stroke-dashoffset", 0);  

  focus.selectAll('circle')
                .attr("cx", function (d)
    { return x(d.label)})
     .attr("cy", function (d) { return y(d.value); })
     .attr("r", 5);

     focus.selectAll('rect')
     .attr("x", function (d)
     { return x(d.label)});

  focus.select(".x.axis").call(xAxis())
  .selectAll(chartId +' .x .tick text') // select all the x tick texts
          .call(function(t){                
            t.each(function(d){ // for each one
              var self = d3.select(this);
              var s = self.text().split('/');  // get the text and split it
              self.text(''); // clear it out
              self.append("tspan") // insert two tspans
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[0]);
              self.append("tspan")
                .attr("x", 0)
                .attr("dy",".8em")
                .text(s[1]);
            });
        });
  focus.select(".y.axis").call(yaxis()
       .tickSize(-width-70, 0, 0));

  d3.select(chartId + ' .y.axis path.domain').attr('d', '');
  d3.selectAll(chartId + ' .gridy .tick text').attr('x', '0').attr('y', '10').style('text-anchor','start');
  d3.select(chartId + ' .gridy .tick line').attr('x2',0)
  d3.selectAll(chartId + ' .xgrid .tick text').attr('y',2);
  d3.selectAll(chartId + ' .xgrid .tick line').attr('y2',0);
  d3.selectAll(chartId + ' .xgrid .domain').attr('d','M0,0V0H'+(width+70)+'V0');
}
  for(i=0;i<chartdata.data.length;i++){

 var circletext = focus.selectAll('circletext'+i)
     .data(chartdata.data[i].data)
    .enter().append('g')
    .attr('class', 'rangegroup'+chartdata.data[i].category);
   circletext.append('circle')
    .attr("class", function (d) { return chartType + chartdata.data[i].category +' rangecircle'+chartdata.data[i].category})
    .style("fill", function (d, j) { 
      if(d.value == 0)
        return 'none';
      else{
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == chartdata.data[i].category)
              return chartdata.colormap[k].value;
          }
      }
    })
    .style("opacity", '0.3')
    .attr("data-visibilitypath", "true")
    .attr("cx", function (d)
    { return x(d.label)})
     .attr("cy", function (d) { return y(d.value); })
     .attr("r", 5);
  

  circletext.append('text')
    .attr("dx", function (d)
    { return x(d.label)})
     .attr("dy", function (d) { return y(d.value); })
      .attr("class", function (d) { return 'rangecircletext'+parsenext(d.label) })
      .text(function (d,j) {
              if (d.value != 0)
                  return chartdata.data[i].category + ' : ' + d3.format(',')(d.value.toFixed(2) / 1);
              else
                  return chartdata.data[i].category + ' : ' + 'N/A';
      })
        .attr('style', function (d,j) {
            var colorval = '';
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == chartdata.data[i].category)
              colorval= chartdata.colormap[k].value;
          }
            return 'display:none;z-index:9999999;fill:' + colorval + ';font-size:15px'
        });


   var circletext2 = context.selectAll('circletext2'+i)
     .data(chartdata.data[i].data)
    .enter().append('g')
    .attr('class', 'circletextsumma2'+i);
   circletext2.append('circle')
    .attr("class", function (d) { return chartType + chartdata.data[i].category +' circletextsumma2'+i + d.label})
    .style("fill", function (d, j) { 
      if(d.value == 0)
        return 'none';
      else{
          for(k=0;k<chartdata.colormap.length;k++){
            if(chartdata.colormap[k].name == chartdata.data[i].category)
              return chartdata.colormap[k].value;
          }
      }
    })
    .style("opacity", '0.3')
    .attr("data-visibilitypath", "true")
    .attr("cx", function (d)
    { return x2(d.label)})
     .attr("cy", function (d) { return y2(d.value); })
     .attr("r", 3);

  }

                  var linerect = focus.selectAll('rangerect')
     .data(chartdata.data[0].data)
    .enter().append('g')
    .attr('class', 'rangerect');
                linerect.append('rect')
    .attr("class", function (d) { return 'rangerectline' + parsenext(d.label) })
    .style("fill", "grey")
    .attr("width", 0)
     .attr("height", height)
     .attr("x", function (d)
     { return x(d.label)});

     var linerect = focus.selectAll('rangerecthide')
     .data(chartdata.data[0].data)
    .enter().append('g')
    .attr('class', 'rangerecthide');
                linerect.append('rect')
    .attr("class", function (d) { return 'rangerectlinehide' + parsenext(d.label) })
    .style("fill", "grey")
    .attr("width", 20)
    .style('opacity',0)
    .on('mouseover', function (d, i) {
      d3.select('.rangerectline'+ parsenext(d.label) ).style('width',1);
        var alltext = d3.selectAll(chartId + ' text' + '.' + 'rangecircletext' + parsenext(d.label));
         var htmlcontent = '';
         var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">Node: ' + parsenext2(d.label) + '</span><hr>';
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
             
    })
    .on("mouseout", function (d, i) {
       d3.select('.rangerectline'+ parsenext(d.label) ).style('width',0);
        div.transition()
                .duration(100)
                .style("opacity", 0);
    })
     .attr("height", height)
     .attr("x", function (d)
     { return x(d.label)});


            if (chartdata.chart.twoxaxis == true)
                ytop = 15 - (margin.top / 1);
            else
                ytop = 5 - (margin.top / 2);
            svg.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .attr('class', 'captiontext')
        .attr("transform", "translate(12,10)")
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
            d3.selectAll(chartId + ' .xgrid .tick text').attr('y',2);
  d3.selectAll(chartId + ' .xgrid .tick line').attr('y2',0);
  d3.select(chartId + ' .gridy .tick line').attr('x2',0)
d3.selectAll(chartId + ' .xgrid .domain').attr('d','M0,0V0H'+(width+70)+'V0');
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
        
   if (chartdata.chart.showlegend) {
                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup')
            .attr('transform','translate(12,20)');
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
        .style('opacity', 0.7)
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
         .style('opacity', 0.8)
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
        .on("click", function (d, i) {
             var graphselect = chartType + d.name.replace(/[^a-zA-Z0-9]/g, "");
             this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
             if (d3.selectAll(chartId +' .' + graphselect).style('display') == 'inline') {
                 d3.selectAll(chartId +' .' + graphselect).style('display', 'none');
                 d3.selectAll(chartId +' .' + graphselect).attr("data-visibilitypath", "false");
             }

             else {
                 this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                 d3.selectAll(chartId +' .' + graphselect).style('display', 'inline');
                 d3.selectAll(chartId +' .' + graphselect).attr("data-visibilitypath", "true");
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
           .attr("x", document.getElementById(chartId.replace('#', '')).offsetWidth - positionwidth + 20)
            .attr("y", height + margin.bottom + 35)
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
            .attr('x', document.getElementById(chartId.replace('#', '')).offsetWidth - imagewidth +20)
            .attr("y", height + margin.bottom+15)
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

