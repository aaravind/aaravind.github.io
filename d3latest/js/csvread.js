var app = app || {};

app.readcsv = function(filename){
	this.filename = filename;
}

app.hextorgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
app.readcsv.prototype.dataformation = function (xaxes,yaxes,zaxes){
		var asd;
        d3.csv(this.filename, function(d) {
	var weekarray = [];
	 var week_obj = d3.map(d, function(d){
      return d[xaxes];
    });
	 var z =0;
	   week_obj.forEach(function(k,v,i){
      weekarray[z] = k;
      z++;
    });
  var dataGroup = d3.nest()
                            .key(function (d) {
                                return d[zaxes];
                            })
                            .entries(d);
     this.finalarray = {};
     this.finalarray.unique_x = weekarray;
     this.finalarray.source_each = dataGroup;  
       asd = this.finalarray;
});
return function(){return asd;};
    };

app.readcsv.prototype.filtersource = function(source,column,column_against,data){
     var filteredsource = data.source_each.filter(function(d){return d.key == source});

     for(i=0;i<filteredsource[0].values.length;i++){
     	var tempval = ((filteredsource[0].values[i][column] / filteredsource[0].values[i][column_against]) * 100)/1;
     	if(!isNaN(tempval))
     	filteredsource[0].values[i].column_percent = tempval;
        else
        filteredsource[0].values[i].column_percent = 0.0;	
     }
filteredsource[0].values = filteredsource[0].values.filter(function(d){return d[app.yaxis] != 'Total'});  
     var weekdata = d3.nest()
                            .key(function (d) {
                                return d[app.xaxis];
                            })
                             .rollup(function(v) { return {
							    total_col: d3.sum(v, function(d) { return d[column]; }),
							    total_col_agn: d3.sum(v, function(d) { return d[column_against]; })
							  }; })
                            .entries(filteredsource[0].values);
                       
     var final_before = weekdata.map( function(each){ 
            var temp = {};
            temp[app.yaxis] = 'Total';
             temp[app.xaxis] = each.key;
            temp[column] = each.values.total_col;
            temp[column_against] = each.values.total_col_agn;
            temp['column_percent'] = (each.values.total_col/each.values.total_col_agn) * 100;
            filteredsource[0].values.push(temp);
      });                      
                   return d3.nest()
                            .key(function (d) {
                                return d[app.yaxis];
                            })
                            .entries(filteredsource[0].values);

}

app.readcsv.prototype.drawchart = function(chartdata,chartId,title){

var bottommargin = 40;
            var colorfunc = d3.scale.category20c();
            var margin = { top: 40, right: 12, bottom: (bottommargin + 20), left: 12 };
            var chartcontent = d3.select(chartId);
            // var showlegendwidth = chartdata.chart.showlegend == true ? 30 : 0;
            var width = chartcontent[0][0].offsetWidth - margin.left - margin.right - 0;
            var height = chartcontent[0][0].offsetHeight - margin.bottom - margin.top;
            // var showlegendwidth = chartdata.chart.showlegend == true ? 30 : 0;
            var styleborder = "fill: none; stroke: #000;  shape-rendering: crispEdges;font:12px sans-serif";
            var viewboxval = 40;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif; background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");

            var labelsx = currentformed.unique_x;

            var labelsy = chartdata.map(function (d) {
                return d.key;
            });
                       xScale1 = d3.scale.ordinal()
        .domain(labelsx)
        .rangeRoundBands([200, width - 100], 0.1);
            yScale1 = d3.scale.ordinal()
        .domain(labelsy)
        .rangeRoundBands([50, height], 0.1);

            function xAxis1() {
                return d3.svg.axis() // zxc
        .scale(xScale1)
        .orient("bottom")
            }
            function yAxis1() {
                return d3.svg.axis()
        .scale(yScale1)
        .orient("left")
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
        .attr("y", 23)
        .attr("text-anchor", "start")
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
         .attr('class', 'caption captiontext')
        .style("fill", 'black')
        .text(title);

        svg.append("g")
        .attr("class", "xaxi")
      .attr("style", styleborder)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1().innerTickSize(-height + 25)
    .outerTickSize(0)
    .tickPadding(10))
      .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return 0
            });

            svg.append("g")
  .attr("class", "grid exportgrid")
      .call(yAxis1());
d3.selectAll(chartId + ' .exportgrid .tick text').attr('x', 0).attr('dx', '3').attr('dy', yScale1.rangeBand()/4).style('text-anchor', 'start').text(function (d) { return d.toUpperCase(); });
d3.selectAll(chartId + ' .domain').attr('d', function () {
                return '';
            });
d3.selectAll(chartId + ' .xaxi .tick text').attr('dx', 0).attr('x',xScale1.rangeBand()/2).attr('y',-height+40).style('text-anchor','middle').html(function(d,i) {
	     if(d.split('/').length != 1)
         return '<tspan>'+d.split('/')[0]+'</tspan>'+ '<tspan dy=14 x='+ xScale1.rangeBand()/2+'>'+d.split('/')[1]+'</tspan>';
          else
          	return d;
       });
var groups = svg.selectAll('.bargroups')
        .data(chartdata)
        .enter()
        .append('g');

var rectstext = groups.selectAll('rect')
        .data(function (d) {
            return d.values;
        })
        .enter()
        .append('g');
rectstext.append('rect')
        .attr('x', function (d) {
            return xScale1(d[app.xaxis])+xScale1.rangeBand()/2;
        })
        .attr('y', function (d, i) {
            return yScale1(d[app.yaxis]);
        })
        .attr('height', function (d) {
            return yScale1.rangeBand();
        })
        .attr('data-visibility', true)
                .attr('width', function (d) {
            return xScale1.rangeBand() + xScale1.rangeBand()/10;
        })
                .style('fill', function(d){
                	return 'rgba('+app.rgb.r+', '+app.rgb.g+', '+app.rgb.b+','+ d.column_percent/100+')'
                });
    rectstext.append('text').attr('x', function (d) {
            return xScale1(d[app.xaxis])+xScale1.rangeBand();
        })
        .attr('y', function (d, i) {
            return yScale1(d[app.yaxis]) + yScale1.rangeBand() * 0.7;
        }).text(function(d){
        	return d['column_percent'].toFixed(1) + '%';
        })
        .style('text-anchor','middle'); 

}



  function drawgraph(chartid,title,xaxis,yaxis,zaxis,source,brand_col,brand_agn,width,height){
    d3.select('.loader').style('display','block');
  	app.xaxis = xaxis;
  	app.yaxis = yaxis;
  	app.zaxis = zaxis;
  	app.rgb = app.hextorgb(d3.select("#colorfill")[0][0].value);
  	 var csvdata = new app.readcsv(app.dataURL);
  	  var formeddata = csvdata.dataformation(xaxis,yaxis,zaxis);
  	            if (d3.select(chartid).select('svg')[0][0] != null)
                d3.select(chartid).select('svg').remove();
  	d3.select(chartid).style('width',width+'px').style('height',height+'px');
  	  currentformed = '';
 var currenttime = setInterval(function(){ 
 	if(formeddata() != undefined){
      currentformed = formeddata();
      clearInterval(currenttime);
       app.readcsv.prototype.finaldatacat = csvdata.filtersource(source,brand_col,brand_agn,currentformed);
       csvdata.drawchart(csvdata.finaldatacat,chartid,title,currentformed);
        d3.select('.loader').style('display','none');
       document.getElementById('csvchart').scrollIntoView();

  }

 }, 2000);
  }
  function inititatedraw(charti){
drawgraph(charti,d3.select("#title")[0][0].value,d3.select("#xaxis")[0][0].value,d3.select("#yaxis")[0][0].value,d3.select("#zaxis")[0][0].value,d3.select("#source")[0][0].value,d3.select("#brand_col")[0][0].value,d3.select("#brand_agn")[0][0].value,d3.select("#width")[0][0].value,d3.select("#height")[0][0].value);
}

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      app.dataURL = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  };

