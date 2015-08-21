var bubble2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            var color = d3.scale.linear()
    .domain([0, chartdata.data.length])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth;
            var height = chartcontent[0][0].offsetHeight;
            var diameter = height;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");

            function processData(obj) {
                var newDataSet = [];

                for (i = 0; i < obj.length; i++)
                    newDataSet.push({ name: obj[i].label, className: obj[i].label.toLowerCase(), size: obj[i].value });

                return { children: newDataSet };
            };
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
            var svg = d3.select(chartId).append('svg')
					.attr('width', '100%')
					.attr('height', '100%')
                       .attr('viewBox', '0 0 ' + (width) + ' ' + (height))
        .attr('preserveAspectRatio', 'xMinYMin');
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');
            svg.append("text")
        .attr("x", 12)
        .attr("y", 20)
        .attr("text-anchor", "start")
        .attr('class', 'captiontext')
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

            if (chartdata.chart.subcaption != undefined) {
                if (chartdata.chart.subcaption.length != 0) {
                    svg.append("text")
        .attr("x", function (d) {
            return d3.select(chartId + ' .captiontext').node().getBoundingClientRect().width + 10;
        })
        .attr("y", 17.5)
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
            var bubble = d3.layout.pack()
				.size([width, diameter])
				.value(function (d) {
				    return d.size;
				})
            .sort(function (a, b) {
                return -(a.size - b.size)
            })
				.padding(3);

            // generate data with calculated layout values
            var nodes = bubble.nodes(processData(chartdata.data))
						.filter(function (d) { return !d.children; }); // filter out the outer bubble

            var vis = svg.selectAll('.bubble')
					.data(nodes)
                    .enter()
      .append('g');


            vis.append('circle')
			.attr('transform', function (d) {
			    return 'translate(' + d.x + ',' + d.y + ')';
			})
			.attr('r', function (d) {
			    return d.r;
			})
			.attr('class', function (d) {
			    return d.className;
			})
            .attr('fill', function (d, i) {
                if (chartdata.chart.fillinside != 'none')
                    return color(i);
                else
                    return 'rgb(255,255,255)';
            })
            .attr("stroke", function (d, i) {
                if (chartdata.chart.fillinside == 'none')
                    return color(i);
            })
            .attr('stroke-width', function (d) {
                if (chartdata.chart.fillinside == 'none')
                    return 3;
            })
            .on("mouseover", function (d, i) {
                this.style.cursor = 'pointer';
                d3.selectAll(chartId + ' .' + d.className).style('opacity', 1);
                div.transition()
                .duration(100)
                .style("opacity", .9);

                var xattr = bodyRect = elemRect = yattr = 0;
                var bodyRect = document.body.getBoundingClientRect();
                var elemRect = this.getBoundingClientRect();
                var xattr = (elemRect.right - bodyRect.left) + 'px';
                var yattr = (elemRect.top - bodyRect.top) + 'px';
                //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
                var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.name + ': ' + d.value + '</span>';
                div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);


            })
                    .on("mouseout", function (d, i) {
                        this.style.cursor = 'pointer';
                        d3.selectAll(chartId + ' .' + d.className).style('opacity', 0.5)
                        div.transition()
                .duration(100)
                .style("opacity", 0);
                    })
                                .style('opacity', 0)
              .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .style('opacity', 0.5);

            if (chartdata.chart.fillinside == 'none') {

                vis.append('text')
        .attr('x', function (d, i) { return d.x; })
        .attr('y', function (d, i) { return d.y; })
         .attr('class', function (d) {
             return d.className;
         })
        .text(function (d) {
            if (d.value != 0)
                return d.value;
        })
        .style('text-transform', 'uppercase')
        .style('text-anchor', 'middle')
        .style('font-size', function (d) { return d.r / 2 + 'px' })
        .style('fill', function (d, i) {
            return color(i);
        })
            .on("mouseover", function (d, i) {
                this.style.cursor = 'pointer';
                d3.selectAll(chartId + ' .' + d.className).style('opacity', 1)
            })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              d3.selectAll(chartId + ' .' + d.className).style('opacity', 0.4)
          })
          .style('opacity', '0')
                .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .style('opacity', 0.4);
                vis.append('text')
        .attr('x', function (d, i) { return d.x; })
        .attr('y', function (d, i) { return d.y; })
        .attr('dy', function (d) { return d.r / 4; })
        .attr('class', function (d) {
            return d.className;
        })
        .text(function (d) {
            if (d.value != 0) {
                if (d.name.length < d.r / 4)
                    return d.name.toUpperCase();
                else
                    return d.name.substring(0, d.r / 4).toUpperCase() + '...';
            }

        })
        .style('text-transform', 'uppercase')
        .style('text-anchor', 'middle')
        .style('font-size', function (d) { return d.r / 4 + 'px' })
        .style('fill', function (d, i) {
            return color(i);
        })
            .on("mouseover", function (d, i) {
                this.style.cursor = 'pointer';
                d3.selectAll(chartId + ' .' + d.className).style('opacity', 1);
            })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              d3.selectAll(chartId + ' .' + d.className).style('opacity', 0.4);
          })
                  .style('opacity', '0')
                .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .style('opacity', 0.4);

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
           .attr("x", document.getElementById(chartId.replace('#', '')).offsetWidth - 20)
            .attr("y", height - 20)
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
            .attr('x', document.getElementById(chartId.replace('#', '')).offsetWidth - 30)
            .attr("y", height - 40)
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
            var margin = { top: 20, right: 12, bottom: 20, left: 12 };
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
