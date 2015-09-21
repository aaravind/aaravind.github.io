var coldata = [];
var  optionarray = [];
var datacolumnarray = [];
var deskhiddendata = tabhiddendata = mobhiddendata =  urlcolumndata = imagecolumndata='' ;
function generatetable(chartid,apiurl,datanode,desktophidden,tabhidden,mobhidden)
{
    if (document.getElementById('deskhide').getElementsByTagName('option').length != 0) {
        deskhiddendata =  getSelectValues(document.getElementById('deskhide'));
         tabhiddendata =  getSelectValues(document.getElementById('tabhide'));
         mobhiddendata =  getSelectValues(document.getElementById('mobhide'));
           urlcolumndata =  getSelectValues(document.getElementById('urlcolumn'));
         imagecolumndata =  getSelectValues(document.getElementById('imagecolumn'));
    }
     var alloption = document.getElementById('deskhide').getElementsByTagName('option');
        optionarray = [];
         datacolumnarray = [];
        for (m = 0; m < alloption.length; m++)
        { 
         optionarray.push(alloption[m].getAttribute('value'));
          datacolumnarray.push(alloption[m].getAttribute('data-originalvalue'));
        }

        window.onresize = function () {


            if (document.getElementById(chartid.replace('#', '')).offsetWidth > 800) {
                for (l = 0; l < optionarray.length; l++)
                    d3.selectAll('.' + optionarray[l].replace(/[^a-zA-Z1-9]/g, "")).style('display', '');
                if ( tabhiddendata != undefined && deskhiddendata.length != 0)
                { 
                                for (l = 0; l < deskhiddendata.length; l++)
                    d3.selectAll('.' + deskhiddendata[l]).style('display', 'none');
                }
            }




                if (document.getElementById(chartid.replace('#', '')).offsetWidth > 350 && document.getElementById(chartid.replace('#', '')).offsetWidth < 800) {
                    for (l = 0; l < optionarray.length; l++)
                        d3.selectAll('.' + optionarray[l].replace(/[^a-zA-Z1-9]/g, "")).style('display', '');
                                    if (tabhiddendata != undefined && tabhiddendata.length != 0) {
                    for (l = 0; l < tabhiddendata.length; l++)
                        d3.selectAll('.' + tabhiddendata[l]).style('display', 'none');
                }
            }



                if (document.getElementById(chartid.replace('#', '')).offsetWidth < 350) {
                    for (l = 0; l < optionarray.length; l++)
                        d3.selectAll('.' + optionarray[l].replace(/[^a-zA-Z1-9]/g, "")).style('display', '');
                                    if (mobhiddendata != undefined && mobhiddendata.length != 0) {
                    for (l = 0; l < mobhiddendata.length; l++)
                        d3.selectAll('.' + mobhiddendata[l]).style('display', 'none');
                }
            }
        }
var url = apiurl;
var xmlhttp;
var urldata;
var apidata;
var columnarray = [];
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

function findcolumn(data) {
        columnarraytemp = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
            columnarraytemp.push(key);
        }
    }
    return columnarraytemp;
}
function drawtable(data)
{
    generatecolumn(columnarray);
   if (d3.select(chartid).select('table')[0][0] != null)
                d3.select(chartid).select('table').remove();
var tablecontent = d3.select(chartid).append('table').attr('class','table').style('width','100%').style('height','100%');
tablecontent.append('thead').append('tr')
   .selectAll('th')
   .data(columnarray).enter()
   .append('th')
   .attr('class', function (d) {
       return d.replace(/[^a-zA-Z1-9]/g, "");
   })
   //.style('width',100/columnarray.length + '%')
   .text(function(d){
       return d.toUpperCase();});

      var tbody =  tablecontent.append('tbody');
      var rows = tbody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

      var cells = rows.selectAll("td")
    .data(function (row) {
        var currentrow = [];
        var currentcolumn = findcolumn(row);
        for (i = 0; i < columnarray.length; i++) {
            for (j = 0; j < columnarray.length; j++) {
                if (columnarray[i] == currentcolumn[j]) {
                    var tempobj = {};
                    tempobj.label = row[currentcolumn[j]];
                     tempobj.titlelabel = currentcolumn[j];
                    if (urlcolumndata.indexOf(currentcolumn[j]) == -1 && imagecolumndata.indexOf(currentcolumn[j]) == -1)
                        tempobj.type = 'text';
                       if (urlcolumndata.indexOf(currentcolumn[j]) != -1 && imagecolumndata.indexOf(currentcolumn[j]) == -1)
                        tempobj.type = 'url';
                        if (urlcolumndata.indexOf(currentcolumn[j]) == -1 && imagecolumndata.indexOf(currentcolumn[j]) != -1)
                        tempobj.type = 'image';
                    currentrow.push(tempobj);
                    break;
                }
            }
            if (currentrow.length != i + 1) {
                var tempobj = {};
                tempobj.label = '';
                tempobj.type = 'text';
                currentrow.push(tempobj);
            }
        }
        return currentrow;
    })
    .enter()
    .append("td")
    .attr("class", function (d, i) { return columnarray[i].replace(/[^a-zA-Z1-9]/g, ""); });
    cells.filter(function (d) { return d.type == 'text'; })
    .text(function (d) {
        return d.label;
    })
    .attr('title', function (d) {
        return d.titlelabel + ':' + d.label;
    });


    cells
    .filter(function (d) { return d.type == 'url'; })
    .append("a")
    .attr('href', function (d) { return d.label })
    .attr('target','_blank')
       .text(function (d) {
           return d.label;
       })
        .attr('title', function (d) {
        return d.titlelabel + ':' + d.label;
    });
      //.style('width',100/columnarray.length + '%')

       cells
    .filter(function (d) { return d.type == 'image'; })
    .append("img")
    .attr('src', function (d) { return d.label })
    .attr('width', 25)
    .attr('height', 25)
     .attr('title', function (d) {
        return d.titlelabel + ':' + d.label;
    });
      //.style('width',100/columnarray.length + '%')
     


}
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          urldata = JSON.parse(xmlhttp.responseText);
          if (urldata != undefined) {

              apidata = urldata[datanode];
             columnarray = findcolumn(apidata[0]);
              drawtable(apidata);
              if (deskhiddendata != undefined && deskhiddendata.length != 0) {
                       if (document.getElementById(chartid.replace('#', '')).offsetWidth > 800) {
             
                      for (l = 0; l < deskhiddendata.length; l++)
                          d3.selectAll('.' + deskhiddendata[l]).style('display', 'none');

                  }
              }
                 


          }
      }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();
document.getElementById('deskhide').style.display = 'block';
document.getElementById('tabhide').style.display = 'block';
document.getElementById('mobhide').style.display = 'block';
document.getElementById('urlcolumn').style.display = 'block';
document.getElementById('imagecolumn').style.display = 'block';
}

function generatescript(tableid, url, datanode) {
    var scriptexport = document.createElement('script')
    scriptexport.src = 'http://aaravind.github.io/apitable/js/initialize.js';
    scriptexport.setAttribute('data-url', url);
    scriptexport.setAttribute('data-id', tableid);
    scriptexport.setAttribute('data-node', datanode);
    scriptexport.setAttribute('data-hidedesktop', deskhiddendata);
     scriptexport.setAttribute('data-hidetab', tabhiddendata);
      scriptexport.setAttribute('data-hidemob', mobhiddendata);
      scriptexport.setAttribute('data-column', datacolumnarray);
       scriptexport.setAttribute('async', 'async');
    document.getElementById('scriptext').innerHTML = scriptexport.outerHTML.toLocaleString();
}
function generatecolumn(column) { 
d3.select("#deskhide").selectAll('option').remove();
var desk = d3.select("#deskhide");
desk
   .selectAll('.checboxinput')
   .data(column).enter()
   .append('option')
.attr('value',function (d) { 
return d.replace(/[^a-zA-Z1-9]/g, ""); })
.attr('data-originalvalue',function (d) { 
return d; })
  .text(function (d) { 
return d.toUpperCase(); });
d3.select("#tabhide").selectAll('option').remove();
var tab = d3.select("#tabhide");
tab
   .selectAll('.checboxinput')
   .data(column).enter()
   .append('option')
.attr('value',function (d) { 
return d.replace(/[^a-zA-Z1-9]/g, ""); })
.attr('data-originalvalue',function (d) { 
return d; })
  .text(function (d) { 
return d.toUpperCase(); });
d3.select("#mobhide").selectAll('option').remove();
var mob = d3.select("#mobhide");
mob
   .selectAll('.checboxinput')
   .data(column).enter()
   .append('option')
.attr('value',function (d) { 
return d.replace(/[^a-zA-Z1-9]/g, ""); })
.attr('data-originalvalue',function (d) { 
return d; })
  .text(function (d) { 
return d.toUpperCase(); });

var urlcolumn = d3.select("#urlcolumn");
urlcolumn
   .selectAll('.checboxinput')
   .data(column).enter()
   .append('option')
.attr('value',function (d) { 
return d.replace(/[^a-zA-Z1-9]/g, ""); })
.attr('data-originalvalue',function (d) { 
return d; })
  .text(function (d) { 
return d.toUpperCase(); });

var imagecolumn = d3.select("#imagecolumn");
imagecolumn
   .selectAll('.checboxinput')
   .data(column).enter()
   .append('option')
.attr('value',function (d) { 
return d.replace(/[^a-zA-Z1-9]/g, ""); })
.attr('data-originalvalue',function (d) { 
return d; })
  .text(function (d) { 
return d.toUpperCase(); });


   
}
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}