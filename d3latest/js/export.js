/**
 * D3 charts Export png/jpeg/pdf
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var EXPORT_WIDTH = 1000;
var asd, data;
function exportfile(chartid,chartdata,filename,format,charttype)
{
    chartdataval = chartdata.data;
    d3.selectAll(chartid +" path.domain").attr("style", "stroke: lightgrey;stroke-width: 1.2;fill: none");
    d3.selectAll(chartid+' .tick text').style('stroke-width', 0.7).style('font-weight', 200).style('font-family','Source Sans Pro,Trebuchet MS,Helvetica Neue, Helvetica,Lucida Grande,Arial,Verdana,sans-serif');
        d3.selectAll(chartid+' .legend text').style('font-family','Source Sans Pro,Trebuchet MS,Helvetica Neue, Helvetica,Lucida Grande,Arial,Verdana,sans-serif');
         d3.selectAll(chartid+' .credits text').style('font-family','Source Sans Pro,Trebuchet MS,Helvetica Neue, Helvetica,Lucida Grande,Arial,Verdana,sans-serif');
  d3.selectAll(chartid +" .exportgrid .tick line").attr("style", "stroke-width: 1.2;stroke: lightgrey;opacity: 0.7;fill: none;shape-rendering: crispEdges;font:12px sans-serif;");
    d3.selectAll(chartid +" .gridy .tick line").attr("style", "stroke-width: 1.2;stroke: lightgrey;opacity: 0.7;fill: none;shape-rendering: crispEdges;font:12px sans-serif;");

    var chart = document.getElementById(chartid.replace('#',''));
     

    document.getElementById(chartid.replace('#','')).setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
   /* var width = "1800px";
    var height = "500px";*/
   
     asd = chart.getElementsByTagName('svg')[0];
     var prevwidth = asd.getAttribute('width');
     var prevheight = asd.getAttribute('height')
     var width = asd.getAttribute('viewBox').split(' ')[2]+'px';
     var height = asd.getAttribute('viewBox').split(' ')[3] + 'px';
    asd.setAttribute('width', width);
    asd.setAttribute('height', height);


        var canvas = document.createElement('canvas');
    canvas.height = width;
    canvas.width = height;

    

 data = new XMLSerializer().serializeToString(asd);
 // canvg(canvas, data);

  canvg(canvas, data, { renderCallback: function () {
var img = canvas.toDataURL("image/png");
    download(canvas,chartdataval,filename,format,charttype,chartid);

}});
     asd.setAttribute('width', prevwidth);
    asd.setAttribute('height', prevheight);

}

function download(canvas,chartdataval,filename,format,charttype,chartid) {
    /*  if (format == '.pdf')
    { 
  
      var canvas1 = document.createElement('canvas');
    canvas1.height = "600px";
    canvas1.width = "1800px";
     canvg(canvas1, data);
     url = canvas1.toDataURL('image/png');

  var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';  /// set white fill style
ctx.fillRect(0, 0, canvas.width, canvas.height);
setTimeout(function () {
    base_image = new Image();
  base_image.src = url;
  base_image.width = "1800px";
  base_image.height = "600px";
     }, 0);
 
     setTimeout(function () {
  ctx.drawImage(base_image, 0, 0);
     }, 500);

     if (!charttype) {
         var columns = [
    { title: "CATEGORY", key: "label" },
    { title: "VALUE", key: "value" }
];
     }
     else {
         var filterarray = [];
          var chartfinalvisible = d3.selectAll(chartid + " path[data-visibilitypath]")[0];
              for (i = 0; i < chartfinalvisible.length; i++)
         {
             if (chartfinalvisible[i].getAttribute('data-visibilitypath') == "false")
             {
                 filterarray.push(chartfinalvisible[i].getAttribute('data-categorycolumn'));
             };
         }

          if(filterarray.length != 0)
     { 
     for(i=0;i<filterarray.length ; i++)
     {
           chartdataval = chartdataval.filter(function( obj ) {
    return obj.category !== filterarray[i];
     });
   
     }
     }

                    var columns = [
    { title: "CATEGORY", key: "category" },
    { title: "TYPE", key: "label" },
     { title: "VALUE", key: "value" }
];
};
  

         setTimeout(function () {
                   var doc = new jsPDF('p', 'pt');
     doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 20, 550, 300);
       doc.autoTable(columns, chartdataval, {
             startY: 330
       });
      doc.save(filename + '.pdf');
     }, 1000);  

   
    }
    else  */
  download_in_ie(canvas, filename,format) || download_with_link(canvas, filename,format);
    
 /* var content = canvas.toDataURL('image/jpeg');
  var doc = new jsPDF();
                doc.addImage(content, 'JPEG', 15, 40, 180, 160);
                 doc.save('sample-file.pdf')
               var docurl =  doc.output("datauristring");
    var a = document.createElement('a')
    a.download = "asd.pdf"
    a.href = docurl
    document.body.appendChild(a);
    a.click();
    a.remove();*/
}
  
// Works in IE10 and newer
function download_in_ie(canvas, filename,format) {
    return(navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob(canvas.msToBlob(), filename+format));
}

// Works in Chrome and FF. Safari just opens image in current window, since .download attribute is not supported
function download_with_link(canvas, filename,format) {
    var a = document.createElement('a')
    a.download = filename + format;
    a.href = canvas.toDataURL("image/png")
    document.body.appendChild(a);
    a.click();
    a.remove();
}