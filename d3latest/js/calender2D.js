var calender2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            var chartcontent = d3.select(chartId);
            var margin = { top: 20, right: 12, bottom: 20, left: 12 };
            var width = chartcontent[0][0].offsetWidth - 100;
            var height = chartcontent[0][0].offsetHeight;
            var no_months_in_a_row;
            if (chartcontent[0][0].offsetWidth < 350) {
                d3.select(chartId).style('height', '500px');
                height = 500;
                cellSize = 10; // cell size
                no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
            }

            else if (chartcontent[0][0].offsetWidth < 500) {

                cellSize = 15; // cell size
                no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                if (no_months_in_a_row == 2) {
                    d3.select(chartId).style('height', '600px');
                    height = 600;
                }
                else {
                    d3.select(chartId).style('height', '500px');
                    height = 500;
                }


            }
            else if (chartcontent[0][0].offsetWidth < 800) {

                cellSize = 20; // cell size
                no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                if (no_months_in_a_row == 3) {
                    d3.select(chartId).style('height', '650px');
                    height = 650;
                }
                else {
                    d3.select(chartId).style('height', '500px');
                    height = 500;
                }
            }
            else if (chartcontent[0][0].offsetWidth < 1200) {

                cellSize = 20; // cell size
                no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                if (no_months_in_a_row == 4) {
                    d3.select(chartId).style('height', '750px');
                    height = 750;
                }
                if (no_months_in_a_row == 5) {
                    d3.select(chartId).style('height', '750px');
                    height = 750;
                }
                else {
                    d3.select(chartId).style('height', '500px');
                    height = 500;
                }
            }
            else {
                cellSize = 25; // cell size
                no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                if (no_months_in_a_row == 12) {
                    d3.select(chartId).style('height', '250px');
                    height = 250;
                }
                else {
                    d3.select(chartId).style('height', '400px');
                    height = 400;
                }
            }




            var shift_up = cellSize * 5;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");

            var day = d3.time.format("%w"), // day of the week
        day_of_month = d3.time.format("%e") // day of the month
            day_of_year = d3.time.format("%j")
            week = d3.time.format("%U"), // week number of the year
        month = d3.time.format("%m"), // month number
        year = d3.time.format("%Y"),
        percent = d3.format(".1%"),
        format = d3.time.format("%Y-%m-%d");
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
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
            var svg = d3.select(chartId).selectAll("svg")
        .data(d3.range(chartdata.calenderyear[0], chartdata.calenderyear[1]))
      .enter().append("svg")
       .attr('width', '100%')
					.attr('height', '100%')
                       .attr('viewBox', '0 0 ' + (width + 100) + ' ' + (height))
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr("class", "RdYlGn")
      .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');

            svg.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr('class', 'captiontext')
        .attr("text-anchor", "start")
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption.toUpperCase());
            var rect = svg.selectAll(".day")
        .data(function (d) {
            return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        })
      .enter().append("rect")
        .attr("class", function (d) {
            var monthclass = d.toDateString();
            return 'day ' + monthclass.split(' ')[1];
        })
         .attr('data-visibility', true)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d) {
            var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
            return day(d) * cellSize + month_padding;
        })
        .attr("y", function (d) {
            var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
            var row_level = Math.ceil(month(d) / (no_months_in_a_row));
            return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize / 2 - shift_up;
        })
        .datum(format);

            var month_titles = svg.selectAll(".month-title")  // Jan, Feb, Mar and the whatnot
          .data(function (d) {
              return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
          })
        .enter().append("text")
          .text(function (d, i) {
              var asd = d.toDateString()
              return asd.split(' ')[1];
          })
          .attr("x", function (d, i) {
              var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
              return month_padding + (cellSize * 7) / 2;
          })
          .attr("y", function (d, i) {
              var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
              var row_level = Math.ceil(month(d) / (no_months_in_a_row));
              return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize - shift_up;
          })
          .attr("class", "month-title")
          .attr("text-anchor", "middle")
          .attr("d", function (d, i) {
              var asd = d.toDateString()
              return asd.split(' ')[1];
          });

            for (j = 0; j < chartdata.data.length; j++) {
                d3.selectAll(chartId + ' .' + chartdata.data[j].month)
      .text(function (d, i) {
          return d + ' : ' + chartdata.data[j].values[i];
      })
      .style('fill', function (d, i) {
          var lessval = chartdata.data[j].max / 5;
          if (chartdata.data[j].values[i] != 0) {
              if (chartdata.data[j].values[i] < lessval)
                  return chartdata.colormap[0].value;
              else if (chartdata.data[j].values[i] < 2 * lessval)
                  return chartdata.colormap[1].value;
              else if (chartdata.data[j].values[i] < 3 * lessval)
                  return chartdata.colormap[2].value;
              else if (chartdata.data[j].values[i] < 4 * lessval)
                  return chartdata.colormap[3].value;
              else
                  return chartdata.colormap[4].value;
          }
          else
              return 'none';
      })
      .style('opacity', '0.5')
      .attr('class', function (d, i) {
          var lessval = chartdata.data[j].max / 5;
          if (chartdata.data[j].values[i] != 0) {
              if (chartdata.data[j].values[i] < lessval)
                  return chartType + chartdata.colormap[0].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 2 * lessval)
                  return chartType + chartdata.colormap[1].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 3 * lessval)
                  return chartType + chartdata.colormap[2].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 4 * lessval)
                  return chartType + chartdata.colormap[3].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else
                  return chartType + chartdata.colormap[4].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
          }
          else
              return 'day ' + chartdata.data[j].month;
      }
      )
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
          var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + this.innerHTML + '</span>';
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
                                .style('opacity', 0)
              .transition()
      .delay(function (d, i) { return i * 100; })
      .duration(400)
      .style('opacity', 0.5); ;
            }

            if (chartdata.chart.showlegend) {

                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                legendgroup.append('g')
            .append('rect')
            .attr('width', '85')
            .attr('height', chartdata.colormap.length * 15)
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', width - 5)
            .attr('y', 22.5)
            .attr('stroke', 'lightgrey');

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
            if (d3.selectAll('.' + barselect).style('fill') != 'none') {
                d3.selectAll('.' + barselect).attr("data-visibility", "false");
                d3.selectAll('.' + barselect).style('fill', 'none');
            }

            else {
                this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                d3.selectAll('.' + barselect).attr("data-visibility", "true");
                d3.selectAll('.' + barselect).style('fill', d.value);
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
        }

        else {
            var bottommargin = 50;
            var margin = { top: 50, right: 20, bottom: bottommargin, left: 50 };
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth;
            var height = chartcontent[0][0].offsetHeight;
            if (d3.select(chartId).select('svg')[0][0] != null)
                d3.select(chartId).select('svg').remove();
            var svg = d3.select(chartId).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', '0 0 ' + (width) + ' ' + (height))
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