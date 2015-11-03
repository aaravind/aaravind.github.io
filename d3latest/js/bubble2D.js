var bubble2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            var enabletrue = false;
            d3.select(chartId + ' .prevbut').remove();
            d3.select(chartId + ' .nextbut').remove();
            var tempheight = d3.select(chartId).style('height');
            if (d3.select(chartId).select('table')[0][0] != null) {
                d3.select(chartId).select('table').remove();
                d3.select(chartId).style('height', chartdata.tableshow.divheight);
                enabletrue = true;
            }
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
                function generatetabledisplay() {
                    if (d3.select(chartId).select('table')[0][0] != null) {
                        d3.select(chartId).select('table').remove();
                        d3.select(chartId).style('height', chartdata.tableshow.divheight);
                        d3.select(chartId + ' .prevbut').remove();
                        d3.select(chartId + ' .nextbut').remove();
                    }

                    else {
                        var start = 0;
                        var end = chartdata.tableshow.noofrows;
                        var inc = chartdata.tableshow.noofrows;
                        drawtablenow(start, end, inc);
                    }



                    function drawtablenow(start, end, inc) {

                        if (d3.select(chartId).select('table')[0][0] != null) {
                            d3.select(chartId).select('table').remove();
                            d3.select(chartId).style('height', chartdata.tableshow.divheight);
                            d3.select(chartId + ' .prevbut').remove();
                            d3.select(chartId + ' .nextbut').remove();
                        }
                        var curstart = start;
                        var curend = end;
                        /* function nextgen(nstart,nend,ninc) {
                        var tempnextprev = nend;
                        var tempnextnext = nend + ninc <= chartdata.data.length ? nend + ninc : chartdata.data.length;
                        drawtablenow(tempnextprev, tempnextnext, ninc);
                        };
                        function prevgen(pstart,pend,pinc) {
                        var tempprevprev = pend - pinc >= 0 ? pend - pinc : 0;
                        var tempprevnext = pend;
                        drawtablenow(tempprevprev, tempprevnext, pinc);
                        };*/

                        var prevbut = d3.select(chartId).append("button").on("click", function () {
                            var tempprevprev = start - inc >= 0 ? start - inc : 0;
                            var tempprevnext = start < inc ? inc : start;
                            drawtablenow(tempprevprev, tempprevnext, inc);

                        }).attr('style', 'height:20px;border: 0px;margin-right:5px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px;margin-left:' + ((width / 2) - 20) + 'px').text('<').attr('class', 'prevbut');

                        var nextbut = d3.select(chartId).append("button").on("click", function () {
                            var tempnextprev = end < chartdata.data.length ? end : chartdata.data.length - inc;
                            var tempnextnext = end + inc <= chartdata.data.length ? end + inc : chartdata.data.length;
                            drawtablenow(tempnextprev, tempnextnext, inc);

                        }).attr('style', 'height:20px;border: 0px;margin-right:5px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px').text('>').attr('class', 'nextbut');

                        var table = d3.select(chartId).append('table').style('border', '1px solid #dde4e6').style('border-collapse', 'collapse');
                        var thead = table.append('thead')
                        var tbody = table.append('tbody')
                        var columns = ['label', 'value'];
                        thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
      .style('text-align', 'left')
      .style('padding', '4px 2px')
      .style('border', '1px solid #dde4e6')
	    .text(function (d) { return d.toUpperCase() })

                        var rows = tbody.selectAll('tr')
	    .data(chartdata.data)
	    .enter()
	  .append('tr')
      .filter(function (d, i) {
          if (i >= curstart && i < curend)
              return true;
      })
      .style('background', function (d, i) {
          if (i % 2 == 0)
              return '#ecf0f1';
          else
              return 'white';
      })

                        var cells = rows.selectAll('td')
	    .data(function (row, i) {
	        return columns.map(function (column) {
	            return { column: column, value: row[column] }
	        })

	    })
      .enter()
    .append('td')
    .style('text-align', 'left')
    .style('padding', '4px 2px')
    .style('max-width', '150px')
    .style('overflow', 'hidden')
    .style('text-overflow', 'ellipsis')
    .style('white-space', 'nowrap')
     .style('border', '1px solid #dde4e6')
      .text(function (d, i) {
          return d.value
      });

                        d3.select(chartId).style('height', 'auto');
                        table.style('margin-left', ((width / 2) - table[0][0].offsetWidth / 2) + 'px');
                        //  d3.select(chartId + ' .prevbut').style('margin-left', ((width / 2) + table[0][0].offsetWidth / 2) + 'px');
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

                if (chartdata.tableshow.show == true) {
                    var databutton = d3.select(chartId).append("button").on("click", generatetabledisplay).attr('style', 'float:right;position:relative;top:35px ;height:20px;border: 0px;margin-right:5px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px').text('Data');



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
               return d3.select(chartId + ' .hiddencaptiontext').node().getBoundingClientRect().width + 15;
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
            return d3.select(chartId + ' .captiontext').node().getBoundingClientRect().width + 15;
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
                var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.name + ': ' + d3.format(',')(d.value.toFixed(2) / 1) + '</span>';
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
             .on("mousedown", function (d, i) {
                 if (chartdata.click != undefined && chartdata.click != '')
                     chartdata.click(d);
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
            if (enabletrue) {
                generatetabledisplay();
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
