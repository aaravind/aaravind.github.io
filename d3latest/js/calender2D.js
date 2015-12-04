var calender2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            var chartcontent = d3.select(chartId);
            if (chartcontent[0][0].offsetWidth < 800 && chartType == 'CalenderSingleView2D') {
                chartType = 'CalenderMultiView2D';
            }
            var margin = { top: 20, right: 12, bottom: 20, left: 12 };
            if (chartType != 'WeekHour2D')
                var width = chartcontent[0][0].offsetWidth - 100;
            else
                var width = chartcontent[0][0].offsetWidth - 5;
            var height = chartcontent[0][0].offsetHeight;
            var no_months_in_a_row;
            if (chartType == 'CalenderMultiView2D') {
                if (chartcontent[0][0].offsetWidth < 350) {
                    d3.select(chartId).style('height', '500px');
                    height = 500;
                    cellSize = 10 - 0.5; // cell size
                    no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                }

                else if (chartcontent[0][0].offsetWidth < 600) {

                    cellSize = 15 - 0.5; // cell size
                    no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                    if (no_months_in_a_row == 2) {
                        d3.select(chartId).style('height', cellSize * 42 + 100 + 'px');
                        height = cellSize * 42 + 100;
                    }
                    else {
                        d3.select(chartId).style('height', cellSize * 28 + 100 + 'px');
                        height = cellSize * 28 + 100;
                    }


                }
                else if (chartcontent[0][0].offsetWidth < 800) {

                    cellSize = 20 - 0.5; // cell size
                    no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                    if (no_months_in_a_row == 3) {
                        d3.select(chartId).style('height', cellSize * 28 + 100 + 'px');
                        height = cellSize * 28 + 100;
                    }
                    else {
                        d3.select(chartId).style('height', cellSize * 21 + 100 + 'px');
                        height = cellSize * 21 + 100;
                    }
                }
                else if (chartcontent[0][0].offsetWidth < 1000) {

                    cellSize = 20 - 0.5; // cell size
                    no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                    if (no_months_in_a_row == 4) {
                        d3.select(chartId).style('height', '500px');
                        height = 500;
                    }
                    if (no_months_in_a_row == 5) {
                        d3.select(chartId).style('height', '500px');
                        height = 500;
                    }
                    if (no_months_in_a_row == 6) {
                        d3.select(chartId).style('height', '450px');
                        height = 450;
                    }

                }
                else {
                    cellSize = 25 - 0.5; // cell size
                    no_months_in_a_row = Math.floor(width / (cellSize * 7 + 10));
                    if (no_months_in_a_row == 12) {
                        d3.select(chartId).style('height', '250px');
                        height = 250;
                    }
                    if (no_months_in_a_row == 5) {
                        d3.select(chartId).style('height', '600px');
                        height = 600;
                    }
                    else {
                        d3.select(chartId).style('height', '450px');
                        height = 450;
                    }
                }

            }
            else if (chartType == 'WeekHour2D') {
                var gridSize = Math.floor(width / 24) - 0.7,
          buckets = 9,
          hourcolors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
          weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          hourtimes = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
                d3.select(chartId).style('height', gridSize * 7 + 100 + 'px');
                height = gridSize * 7 + 100;
                cellSize = (chartcontent[0][0].offsetWidth / 60) - 0.5;

            }
            else {
                cellSize = (chartcontent[0][0].offsetWidth / 60) - 0.5;
                d3.select(chartId).style('height', cellSize * 7 + 100 + 'px');
                height = cellSize * 7 + 100;


            }



            var shift_up = cellSize * 5;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black;z-index:999999");

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
                            exportfile(chartId, chartdata, chartType, '.' + data, false);
                        else
                            exportfile(chartId, chartdata, chartdata.export.filename, '.' + data, false);
                    }
                }
                if (chartdata.export.showexport == true) {
                    if(chartType == 'WeekHour2D')
                             var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:15px ;height:20px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px'),
    options = select.selectAll('option').data(chartdata.export.format); // Data join
    else
                    var select = d3.select(chartId).append("select").on("change", change).attr('style', 'float:right;position:relative;top:35px ;height:20px;border: 0px;margin:0px;background-color: #ecf0f1;box-shadow: 0px 1px 2px #cccccc;font-size:11px'),
    options = select.selectAll('option').data(chartdata.export.format); // Data join

                    // Enter selection
                    options.enter().append("option").text(function (d) {
                        return d;
                    });


                }
            }
            if (chartType != 'WeekHour2D') {
                var svg = d3.select(chartId).selectAll("svg")
        .data(d3.range(chartdata.calenderyear[0], chartdata.calenderyear[1]))
      .enter().append("svg")
       .attr('width', '100%')
					.attr('height', '100%')
                       .attr('viewBox', '0 0 ' + (width + 100) + ' ' + (height))
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr("class", 'calenderclass' + "RdYlGn")
      .append("g")
         .attr("transform", function (d) {
             /*if (chartcontent[0][0].offsetWidth < 450)
             return "translate(" + (chartcontent[0][0].offsetWidth - 40) + "," + margin.top + ") " + " rotate(90)";
             else*/
             return "translate(" + margin.left + "," + margin.top + ") ";
         });
            }
            else {

                var svg = d3.select(chartId)
         .append("svg")
       .attr('width', '100%')
					.attr('height', '100%')
                       .attr('viewBox',function (d) {
                           if (chartType == 'WeekHour2D')
                               return '0 0 ' + (width + 15) + ' ' + (height);
                           else
                               return '0 0 ' + (width + 100) + ' ' + (height);
                       })
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr("class", 'calenderclass' + "RdYlGn")
      .append("g")
         .attr("transform", function (d) {
             /*if (chartcontent[0][0].offsetWidth < 450)
             return "translate(" + (chartcontent[0][0].offsetWidth - 40) + "," + margin.top + ") " + " rotate(90)";
             else*/
             return "translate(" + margin.left + "," + (10) + ") ";
         });

            }
            d3.select(chartId + ' svg').insert('rect', ':first-child').attr('width', '100%').attr('height', '100%').attr('x', '0').attr('y', '0').style('fill', 'white');

            svg.append("text")
        .attr("x", 0)
        .attr("y", function (d) {
            if (chartType != 'WeekHour2D')
                return 10;
            else
                return 5;
        })
        .attr('class', 'captiontext')
        .attr("text-anchor", "start")
        .style("font-size", "18px")
        .style("text-decoration", "none")
         .style("text-transform", "uppercase")
         .style("font-weight", "bold")
        .style("fill", chartdata.chart.captionColor)
        .text(chartdata.chart.caption.toUpperCase());
            if (chartType != 'WeekHour2D') {

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
            if (chartType == 'CalenderMultiView2D') {
                var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
                return day(d) * cellSize + month_padding;
            }
            else {
                return d3.time.weekOfYear(d) * cellSize;
            }

        })
        .attr("y", function (d) {
            if (chartType == 'CalenderMultiView2D') {
                var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
                var row_level = Math.ceil(month(d) / (no_months_in_a_row));
                return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize / 2 - shift_up;
            }
            else {
                return d.getDay() * cellSize + (cellSize * 2);
            }
        })
        .attr('transform', function (d) {
            if (chartType == 'CalenderSingleView2D')
                return 'translate(20,0)';
            else
                return '';
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

              if (chartType == 'CalenderMultiView2D') {
                  var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
                  return month_padding + (cellSize * 7) / 2;
              }
              else {
                  return d3.time.weekOfYear(d) * cellSize;
              }
          })
          .attr("y", function (d, i) {

              if (chartType == 'CalenderMultiView2D') {
                  var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
                  var row_level = Math.ceil(month(d) / (no_months_in_a_row));
                  return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize - shift_up;
              }
              else {
                  return cellSize * 1.5;
              }

          })
          .attr("class", "month-title")
          .attr("text-anchor", function (d) {
              if (chartType == 'CalenderMultiView2D')
                  return "middle";
              else
                  return "start";
          })
          .attr("d", function (d, i) {
              var asd = d.toDateString()
              return asd.split(' ')[1];
          })
           .attr('transform', function (d) {
               if (chartType == 'CalenderSingleView2D') {
                   /*  if (chartcontent[0][0].offsetWidth < 450) {
                   return 'translate(20,0)';
                   }
                   else*/
                   return 'translate(20,5)';
               }

               else
                   return '';
           });
                if (chartType == 'CalenderSingleView2D') {

                    svg.selectAll(".weekdays")
    .data(['S', 'M', 'T', 'W', 'T', 'F', 'S'])
  .enter().append("text")
    .attr("class", "weekdays")
    .attr('x', 0)
    .attr('y', function (d, i) {
        return cellSize * (i + 3) - cellSize / 4;
    })
    .text(function (d) {
        return d;
    });

                }
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
                  return 'calenderclass' + chartdata.colormap[0].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 2 * lessval)
                  return 'calenderclass' + chartdata.colormap[1].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 3 * lessval)
                  return 'calenderclass' + chartdata.colormap[2].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else if (chartdata.data[j].values[i] < 4 * lessval)
                  return 'calenderclass' + chartdata.colormap[3].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
              else
                  return 'calenderclass' + chartdata.colormap[4].name.replace(/[^a-zA-Z0-9]/g, "") + ' day ' + chartdata.data[j].month;
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
              var xattr = (elemRect.left - bodyRect.left - div[0][0].offsetWidth) + 'px';
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

            }

            else {
                //weekhour chart goes here
                if (chartdata.chart.valuerank) {
                    var colorweek = d3.scale.linear()
    .domain([chartdata.chart.lowrank, chartdata.chart.maxrank])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
                }
                if (chartdata.chart.weekstartdate != undefined && chartdata.chart.weekstartdate != '') {
                    weekhourarray = [];
                    for (i = 0; i < 7; i++) {
                        var newdatecur1 = new Date(chartdata.chart.weekstartdate);
                        var datetempcur1 = newdatecur1;
                        datetempcur1.setDate(datetempcur1.getDate() + i);
                        var weekdayfind = datetempcur1.toDateString();
                        weekdayfind = weekdayfind.substring(0, 2);
                        weekhourarray.push(weekdayfind);
                    }

                }
                else if (chartdata.chart.weekarray != undefined && chartdata.chart.weekarray.length != 0)
                    var weekhourarray = chartdata.chart.weekarray;
                else
                    var weekhourarray = weekdays;
                var dayLabels = svg.selectAll(".dayLabel")
          .data(weekhourarray)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) {
                return ((i) * gridSize) + 30 + gridSize / 2;
            })
            .style("text-anchor", "end")
             .style('display', function (d, i) {
                 if (chartcontent[0][0].offsetWidth < 800) {

                     if (i % 3 == 0 || i == 0)
                         return "block"
                     else
                         return "none"


                 }
                 else {
                     return "block";
                 }
             }
            )
            .attr("transform", "translate(10,0)")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

                var timeLabels = svg.selectAll(".timeLabel")
          .data(hourtimes)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", function (d, i) { return (i * gridSize) + gridSize / 2; })
            .attr("y", 25)
            .style("text-anchor", function (d) {
                if (chartcontent[0][0].offsetWidth < 800)
                    return "middle";
                else
                    return "end";
            })
            .style('display', function (d, i) {
                if (chartcontent[0][0].offsetWidth < 800) {

                    if (i % 4 == 0 || i == 0 || i == 23)
                        return "block"
                    else
                        return "none"


                }
                else {
                    return "block";
                }
            }
            )
            .attr("transform", "translate(" + gridSize / 2 + ", 0)")
            .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

                var cards = svg.selectAll(".hour")
                .data(chartdata.data);

                cards.append("title");

                cards.enter().append("rect")
                .attr("x", function (d) { return ((d.hour - 1) * gridSize) + 15; })
                .attr("y", function (d) { return ((d.day - 1) * gridSize) + 30; })
                .attr("class", function (d) {
                    if (chartdata.chart.valuerank != undefined && chartdata.chart.valuerank != true)
                        return "hourclass" + d.category.replace(/[^a-zA-Z0-9]/g, "") + " hour bordered";
                    else
                        return "hourclass rank" + d.value + " hour bordered";
                })
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr('data-visibility', 'true')
                .style("opacity", '0.8')
                .style("stroke", 'lightgray')
                .style("stroke-width", '1px')
                .style("fill", function (d, i) {
                    if (chartdata.chart.valuerank == undefined || chartdata.chart.valuerank == false) {
                        if (chartdata.colormap != undefined && chartdata.colormap != '') {
                            for (i = 0; i < chartdata.colormap.length; i++) {
                                if (d.category == chartdata.colormap[i].name)
                                    return chartdata.colormap[i].value;
                            }
                        }
                        else
                            return 'black';
                    }
                    else {
                        if (d.value == 0)
                            return 'lightgrey';
                        else
                            return colorweek(d.value);
                    }

                })
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
                    if (chartdata.chart.valuerank != undefined && chartdata.chart.valuerank != true)
                        var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.category + ' : ' + d.value + '</span><br>';
                    else {
                        var htmlcontent = '';
                        if (d.value != 0) {
                            if (chartdata.chart.weekstartdate != undefined && chartdata.chart.weekstartdate != '') {
                                var newdatecur = new Date(chartdata.chart.weekstartdate);
                                var datetempcur = newdatecur;

                                datetempcur.setDate(datetempcur.getDate() + d.day - 1);
                                var montrial = datetempcur.getMonth() + 1;
                                dateformated = (datetempcur.getDate().toString().length == 1 ? ('0' + datetempcur.getDate()) : datetempcur.getDate()) + '-' + (montrial.toString().length == 1 ? ('0' + montrial) : montrial) + '-' + datetempcur.getFullYear();
                                htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + 'Date' + ' : ' + dateformated + '</span><br><hr>';
                            }
                            htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + 'Rank' + ' : ' + d.value + '</span><br>';
                        }
                        else {
                            if (chartdata.chart.weekstartdate != undefined && chartdata.chart.weekstartdate != '') {
                                var newdatecur = new Date(chartdata.chart.weekstartdate);
                                var datetempcur = newdatecur;

                                datetempcur.setDate(datetempcur.getDate() + d.day - 1);
                                var montrial = datetempcur.getMonth() + 1;
                                dateformated = (datetempcur.getDate().toString().length == 1 ? ('0' + datetempcur.getDate()) : datetempcur.getDate()) + '-' + (montrial.toString().length == 1 ? ('0' + montrial) : montrial) + '-' + datetempcur.getFullYear();

                                htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + 'Date' + ' : ' + dateformated + '</span><br><hr>';
                            }
                            var htmlcontent = htmlcontent + '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + 'Rank' + ' : ' + 'N/A' + '</span><br>';
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
                    this.style.opacity = 0.8;
                    div.transition()
                .duration(100)
                .style("opacity", 0);
                });


                cards.select("title").text(function (d) { return d.value; });





            }
            if (chartdata.chart.showlegend) {

                var legendgroup = svg.selectAll(chartId + ' .legendgroup').data([0]).enter()
            .append('g')
            .attr('class', 'legendgroup');
                legendgroup.append('g')
            .append('rect')
            .attr('width', function (d) {
                if (chartType != 'WeekHour2D')
                    return '85';
                else
                    return '153';
            })
            .attr('height', function (d) {
                if (chartType != 'WeekHour2D')
                    return chartdata.colormap.length * 15;
                else
                    return '21';


            })
            .attr('fill', 'rgb(255, 255, 255)')
            .attr('x', function (d) {
                if (chartType != 'WeekHour2D')
                    return width - 5;
                else
                    return 15.5;
            })
            .attr('y', function (d) {
                if (chartType != 'WeekHour2D')
                    return 22.5;
                else
                    return gridSize * 7 + 32.5;
            })
            .attr('stroke', 'lightgrey');

                var legend = legendgroup.selectAll('.legend')
        .data(chartdata.colormap)
        .enter()
      .append('g')
        .attr('class', 'legend');
                legend.append('rect')
        .attr('x', function (d, i) {
            if (chartType != 'WeekHour2D')
                return width;
            else {
                if (i == 0)
                    return 22.5;
                else
                    return (i + 1) * 50 - 22.5;
            }

        })
        .attr('y', function (d, i) {

            if (chartType != 'WeekHour2D')
                return (i + 1) * 15 + 10;
            else
                return (1) * 15 + 12.5 + (gridSize * 7 + 10);
        })
         .attr('rx', 20)
        .attr('ry', 20)
        .attr('width', 10)
        .attr('height', 10)
        .style('opacity', function (d) {
            if (chartType != 'WeekHour2D')
                return 0.7;
            else
                return 0.8;


        })
        .style('fill', function (d, i) {
            return d.value;
        });

                legend.append('text')
        .attr('x', function (d, i) {
            if (chartType != 'WeekHour2D')
                return width + 12;
            else {
                if (i == 0)
                    return 37.5;
                else
                    return (i + 1) * 50 - 8.5;
            }

        })
        .attr('y', function (d, i) {

            if (chartType != 'WeekHour2D')
                return ((i + 1) * 15) + 9 + 10;
            else
                return ((1) * 15) + 9 + 12.5 + (gridSize * 7 + 10);

        })
        .text(function (d) {
            if (d.name.length > 10)
                return d.name.substr(0, 10).toUpperCase() + '...';
            else
                return d.name.toUpperCase();
        })
         .style('text-transform', 'uppercase')
         .style('opacity', function (d) {
             if (chartType != 'WeekHour2D')
                 return 0.4;
             else
                 return 0.8;


         })
        .style('font-size', '12px')
        .style('fill', function (d, i) {
            return d.value;
        })
        .on("click", function (d, i) {
            if (chartType != 'WeekHour2D') {
                if (chartType != 'WeekHour2D') {
                    var barselect = 'calenderclass' + d.name.replace(/[^a-zA-Z0-9]/g, "");
                    this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.4;
                }

                else {
                    var barselect = 'hourclass' + d.name.replace(/[^a-zA-Z0-9]/g, "");
                    this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.8;
                }


                if (d3.selectAll('.' + barselect).style('fill') != 'none') {
                    d3.selectAll('.' + barselect).attr("data-visibility", "false");
                    d3.selectAll('.' + barselect).style('fill', 'none');
                }

                else {
                    this.parentNode.getElementsByTagName('rect')[0].style.opacity = 0.7;
                    d3.selectAll('.' + barselect).attr("data-visibility", "true");
                    d3.selectAll('.' + barselect).style('fill', d.value);
                }
            }


        })
         .on("mouseover", function (d, i) {
             this.style.cursor = 'pointer';
             this.style.opacity = 1;
         })
          .on("mouseout", function (d, i) {
              this.style.cursor = 'pointer';
              if (chartType != 'WeekHour2D') {
                  this.style.opacity = 0.4;
              }
              else {
                  this.style.opacity = 0.8;
              }
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
           .attr("x", function (d) {
               if (chartType != 'WeekHour2D') {
                   return document.getElementById(chartId.replace('#', '')).offsetWidth - positionwidth - 70;
               }
               else
                   return document.getElementById(chartId.replace('#', '')).offsetWidth - positionwidth - 60;
           })
            .attr("y", function (d) {
                if (chartType != 'WeekHour2D') {
                    return height + margin.bottom - 58;
                }
                else
                    return height + margin.bottom - 58 - 15;
            })
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
            .attr('x',function (d) {
               if (chartType != 'WeekHour2D') {
                   return document.getElementById(chartId.replace('#', '')).offsetWidth - imagewidth - 70;
               }
               else
                   return document.getElementById(chartId.replace('#', '')).offsetWidth - imagewidth - 60;
           })
            .attr("y", function (d) {
                if (chartType != 'WeekHour2D') {
                    return height + margin.bottom - 75;
                }
                else
                    return height + margin.bottom - 75 - 15;
            })
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