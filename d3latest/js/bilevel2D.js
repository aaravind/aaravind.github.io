var bilevel2D = function (chartId, chartdata, chartType) {
    if (chartdata.data != undefined) {
        if (chartdata.data.length != 0) {
            var hue = d3.scale.category20();


            var color = d3.scale.linear()
    .domain([0, chartdata.data.length])
    .range([chartdata.chart.pallattecolor[0], chartdata.chart.pallattecolor[1]]);
            var chartcontent = d3.select(chartId);
            var width = chartcontent[0][0].offsetWidth;
            var height = chartcontent[0][0].offsetHeight - 20;
            var diameter = Math.min(width, height) - 10;
            var radius = diameter / 2;
            var div = d3.select("body").append("div")
    .attr("style", " position: absolute;opacity:0;text-align: left;max-width: 200px;height: auto;padding: 8px 12px;font: 12px sans-serif;background: white;border: 1px solid lightgrey;border-radius: 3px;pointer-events: none;color:black");
            var luminance = d3.scale.sqrt()
    .domain([0, 1e6])
    .clamp(true)
    .range([90, 20]);
            var partition = d3.layout.partition()
    .sort(function (a, b) {
        return d3.ascending(a.label, b.label);
    })
    .size([2 * Math.PI, radius]);
            var arc = d3.svg.arc()
    .startAngle(function (d) { return d.x; })
    .endAngle(function (d) { return d.x + d.dx  - .01 / (d.depth + .5); })
    .innerRadius(function (d) { return radius / 3 * d.depth; })
    .outerRadius(function (d) { return radius / 3 * (d.depth + 1) - 1; });
            if (chartdata.export != undefined && d3.select(chartId + ' select')[0][0] == null) {
                function change() {
                    var selectedIndex = select.property('selectedIndex'),
        data = options[0][selectedIndex].__data__;
                    if (selectedIndex != 0) {
                        if (chartdata.export.filename == undefined || chartdata.export.filename == '')
                            exportfile(chartId, chartdata, 'Bilevel2D', '.' + data, false);
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
                       .attr('viewBox', '0 0 ' + (width) + ' ' + (height + 40))
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
            var dataGroup = d3.nest()
    .key(function (d) {
        return d.category;
    })
    .entries(chartdata.data);

            var summa = [];
            for (i = 0; i < dataGroup.length; i++) {
                tempobject = {};
                tempobject.label = dataGroup[i].key;
                tempobject.children = dataGroup[i].values;
                summa.push(tempobject);
            }
            var finaldata = [];
            var secondtemp = {};
            secondtemp.label = 'main';
            secondtemp.children = summa;
            finaldata.push(secondtemp);

            function drawpartion(root) {

                // Compute the initial layout on the entire tree to sum sizes.
                // Also compute the full name and fill color for each node,
                // and stash the children so they can be restored as we descend.
                partition
      .value(function (d) { return d.value; })
      .nodes(root)
      .forEach(function (d) {
          d._children = d.children;
          d.sum = d.value;
          d.key = key(d);
          d.fill = fill(d);
      });

                // Now redefine the value function to use the previously-computed sum.
                partition
      .children(function (d, depth) { return depth < 2 ? d._children : null; })
      .value(function (d) { return d.sum; });
                var insidedraw = svg.append('g')
      .attr('class', 'insidedraw')
      //.attr('width',width)
      //.attr('height',height)
      .attr('transform','translate('+(width/2)+ ' '+ (height/2  + 20) +')');
                var center = insidedraw.append("circle")
      .attr("r", radius / 3)
      .style('fill', 'white')
      .on("click", zoomOut)
                // .style('transform','translate('+(width/2 +'px')+ ','+ (height/2  + 20 + 'px') +')');

                center.append("title")
      .text("zoom out");

                var path = insidedraw.selectAll("path")
      .data(partition.nodes(root).slice(1))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function (d) { return d.fill; })
      .style('stroke', 'white')
      .style('opacity', function (d, i) {
          if (d.children != undefined)
              return 0.75;
          else
              return 0.5
      })
      .each(function (d) { this._current = updateArc(d); })
      .on("click", zoomIn)
        .on("mouseover", function (d, i) {
            this.style.cursor = 'pointer';
            this.style.opacity = 1;

            div.transition()
                .duration(100)
                .style("opacity", 1);

            var xattr = bodyRect = elemRect = yattr = 0;
            bodyRect = document.body.getBoundingClientRect();
            elemRect = this.getBoundingClientRect();
                xattr = (elemRect.left - bodyRect.left + div[0][0].offsetWidth) + 'px';
            yattr = (elemRect.top - bodyRect.top) + 'px';
            //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
            var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ': ' + d.value.toFixed(2) / 1 + '</span>';
            div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);


        })
         .on("mouseout", function (d, i) {
             this.style.cursor = 'pointer';
             if (d.children != undefined)
                 this.style.opacity = 0.75;
             else
                 this.style.opacity = 0.5;

             div.transition()
                .duration(100)
                .style("opacity", 0);

         })
                // .style('transform','translate('+(width/2 +'px')+ ','+ (height/2 + 20 + 'px') +')');

                function zoomIn(p) {
                    if (p.depth > 1) p = p.parent;
                    if (!p.children) return;
                    zoom(p, p);
                }

                function zoomOut(p) {
                    if (!p.parent) return;
                    zoom(p.parent, p);
                }

                // Zoom to the specified new root.
                function zoom(root, p) {
                    if (document.documentElement.__transition__) return;

                    // Rescale outside angles to match the new layout.
                    var enterArc,
        exitArc,
        outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

                    function insideArc(d) {
                        return p.key > d.key
          ? { depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
          ? { depth: d.depth - 1, x: 2 * Math.PI, dx: 0 }
          : { depth: 0, x: 0, dx: 2 * Math.PI };
                    }

                    function outsideArc(d) {
                        return { depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x) };
                    }

                    center.datum(root);

                    // When zooming in, arcs enter from the outside and exit to the inside.
                    // Entering outside arcs start from the old layout.
                    if (root === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);

                    path = path.data(partition.nodes(root).slice(1), function (d) { return d.key; });

                    // When zooming out, arcs enter from the inside and exit to the outside.
                    // Exiting outside arcs transition to the new layout.
                    if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

                    d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function () {
                        path.exit().transition()
          .style("fill-opacity", function (d) { return d.depth === 1 + (root === p) ? 1 : 0; })
          .attrTween("d", function (d) { return arcTween.call(this, exitArc(d)); })
          .remove();

                        path.enter().append("path")
          .style("fill-opacity", function (d) { return d.depth === 2 - (root === p) ? 1 : 0; })
          .style("fill", function (d) { return d.fill; })
          .style('stroke', 'white')
           .style('opacity', function (d, i) {
               if (d.children != undefined)
                   return 0.75;
               else
                   return 0.5
           })
          .on("click", zoomIn)
          .each(function (d) { this._current = enterArc(d); })
           .on("mouseover", function (d, i) {
               this.style.cursor = 'pointer';
               this.style.opacity = 1;

               div.transition()
                .duration(100)
                .style("opacity", 1);

               var xattr = bodyRect = elemRect = yattr = 0;
               bodyRect = document.body.getBoundingClientRect();
               elemRect = this.getBoundingClientRect();
       xattr = (elemRect.left - bodyRect.left + div[0][0].offsetWidth) + 'px';
               yattr = (elemRect.top - bodyRect.top) + 'px';
               //var xattr = (elemRect.left - bodyRect.left - elemRect.left/2) + 'px';
               var htmlcontent = '<span style=\"height:10px!important;text-transform:uppercase;font-size:12px\">' + d.label + ': ' + d.value.toFixed(2) / 1 + '</span>';
               div.html(htmlcontent)
       .style("left", xattr)
                .style("top", yattr);
           })
         .on("mouseout", function (d, i) {
             this.style.cursor = 'pointer';
             if (d.children != undefined)
                 this.style.opacity = 0.75;
             else
                 this.style.opacity = 0.5;

             div.transition()
                .duration(100)
                .style("opacity", 0);

         })
                        //.style('transform','translate('+(width/2 +'px')+ ','+ (height/2  + 20 + 'px') +')');

                        path.transition()
          .style("fill-opacity", 1)
          .attrTween("d", function (d) { return arcTween.call(this, updateArc(d)); });
                    });
                }
            }
            function key(d) {
                var k = [], p = d;
                while (p.depth) k.push(p.label), p = p.parent;
                return k.reverse().join(".");
            }

            function fill(d) {
                var p = d;
                while (p.depth > 1) p = p.parent;
                if (chartdata.colormap != undefined && chartdata.colormap != '') {
                    for (i = 0; i < chartdata.colormap.length; i++) {
                        if (p.label == chartdata.colormap[i].name) {
                            var c = d3.lab(chartdata.colormap[i].value);
                            c.l = luminance(d.sum);
                            return c;
                        }

                    }
                }
                else {
                    var c = d3.lab(hue(p.label));
                    c.l = luminance(d.sum);
                    return c;
                }

            }

            function arcTween(b) {
                var i = d3.interpolate(this._current, b);
                this._current = i(0);
                return function (t) {
                    return arc(i(t));
                };
            }

            function updateArc(d) {
                return { depth: d.depth, x: d.x, dx: d.dx};
            }
            drawpartion(finaldata[0]);

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
