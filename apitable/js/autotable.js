
function generatetable(chartid,apiurl,datanode)
{
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
            columnarray.push(key);
        }
    }
    return size;
};

function findcolumn(data) {
        var Columnlength = Object.size(data[0]);
    var column = columnarray;
}
function drawtable(data)
{ 
   if (d3.select(chartid).select('table')[0][0] != null)
                d3.select(chartid).select('table').remove();
var tablecontent = d3.select(chartid).append('table').attr('class','table').style('width','100%').style('height','100%');
tablecontent.append('thead').append('tr')
   .selectAll('th')
   .data(columnarray).enter()
   .append('th')
   .attr('class', function (d) {
       return d;
   })
   .style('width',100/columnarray.length + '%')
   .text(function(d){
       return d.toUpperCase();});

      var tbody =  tablecontent.append('tbody');
      var rows = tbody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .attr("class", function(d, i) { return columnarray[i]; });

      var cells = rows.selectAll("td")
    .data(function (row) {
        var currentrow = [];
        for (i = 0; i < Object.size(row); i++) {
            currentrow.push(row[columnarray[i]])
        }
        return currentrow;
    })
    .enter()
    .append("td")
    .text(function (d) {
        return d;
    })
     .style('width',100/columnarray.length + '%')
      .attr("class", function(d, i) { return columnarray[i]; });

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
              findcolumn(apidata);
              drawtable(apidata);
          }
      }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();
}
