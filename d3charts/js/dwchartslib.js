function redrawchart(chart,id,data) {
     
        var savelegends = d3.selectAll(id+' path[data-visibilitypath = \'false\']')[0];
    if (savelegends.length == 0)
        d3charts(chart, id, data);
    else {
        var saveleg = [];
        for (i = 0; i < savelegends.length; i++) {
            saveleg.push(savelegends[i].getAttribute('class').split(' ')[0]);
        };  
            d3charts(chart, id, data);
        for (i = 0; i < saveleg.length; i++) {
            d3.selectAll(id+' .' + saveleg[i]).style('display', 'none').attr('data-visibilitypath', 'false');
        };        
    }
}

window.onresize = function (event) {

    d3charts("Line2D", "#linechart", linedata);
    redrawchart("MultiLine2D","#Multiline", Multilinedata);
       d3charts("Column2D", "#column", columndata);
};

var linedata = {
    "chart": {
        "caption": "Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
          "tickinterval":5,
        "pallattecolor":["#008ee4","red"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data":  [
        {

            "label": "01-08",
            "value": 56
        },
        {
            "label": "02-08",
            "value": 23
        },
        {
            "label": "03-08",
            "value": 87

        }
        ,
        {
            "label": "04-08",
            "value": 10
        }
        ,
        {
            "label": "05-08",
            "value": 67
        }
        ,
        {
            "label": "06-08",
            "value": 50
        }
        ,
        {
            "label": "07-08",
            "value": 66
        }
        ,
        {
            "label": "08-08",
            "value": 0
        },
        {
            "label": "09-08",
            "value": 98
        }
        ,
        {
            "label": "10-08",
            "value": 55
        }
        ,
        {
            "label": "11-08",
            "value": 88
        }
        ,
        {
            "label": "12-08",
            "value": 44
        } ,
        {
            "label": "13-08",
            "value": 55
        } ,
        {
            "label": "14-08",
            "value": 89
        },
        {
            "label": "15-08",
            "value": 23
        },
        {
            "label": "16-08",
            "value": 33
        },
        {
            "label": "17-08",
            "value": 0
        },
        {
            "label": "18-08",
            "value": 0

        }
        ,
        {
            "label": "19-08",
            "value": 11
        }
        ,
        {
            "label": "20-08",
            "value": 45
        }
        ,
        {
            "label": "21-08",
            "value": 76
        }
        ,
        {
            "label": "22-08",
            "value": 77
        }
        ,
        {
            "label": "23-08",
            "value": 5
        },
        {
            "label": "24-08",
            "value": 0
        }
        ,
        {
            "label": "25-08",
            "value": 80
        }
        ,
        {
            "label": "26-08",
            "value": 3
        }
        ,
        {
            "label": "27-08",
            "value": 12
        } ,
        {
            "label": "28-08",
            "value": 6
        } ,
        {
            "label": "29-08",
            "value": 89

        },
        {
            "label": "30-08",
            "value": 23

        }


        

    ]
}
    d3charts("Line2D", "#linechart", linedata);

    var Multilinedata = {
    "chart": {
        "caption": "Multi Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "tickinterval":5,
        "tooltipheader":"Date",
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","red","red"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data":  [
        {
             "category": "Snapdeal",
            "label": "01-08",
            "value": 56
        },
        { 
            "category": "Snapdeal",
            "label": "02-08",
            "value": 23
        },
        {
    
            "category": "Snapdeal",
            "label": "03-08",
            "value": 87

        }
        ,
        {
            "category": "Snapdeal",
            "label": "04-08",
            "value": 10
        }
        ,
        {
            "category": "Snapdeal",
            "label": "05-08",
            "value": 67
        }
        ,
        {
            "category": "Snapdeal",
            "label": "06-08",
            "value": 50
        }
        ,
        {
            "category": "Snapdeal",
            "label": "07-08",
            "value": 66
        }
        ,
        {
            "category": "Snapdeal",
            "label": "08-08",
            "value": 0
        },
        {
            "category": "Snapdeal",
            "label": "09-08",
            "value": 98
        }
        ,
        {
            "category": "Snapdeal",
            "label": "10-08",
            "value": 55
        }
        ,
        {
            "category": "Snapdeal",
            "label": "11-08",
            "value": 88
        }
        ,
        {
            "category": "Snapdeal",
            "label": "12-08",
            "value": 44
        } ,
        {
            "category": "Snapdeal",
            "label": "13-08",
            "value": 55
        } ,
        {
            "category": "Snapdeal",
            "label": "14-08",
            "value": 89
        },
        {
            "category": "Snapdeal",
            "label": "15-08",
            "value": 23
        },
        {
            "category": "Snapdeal",
            "label": "16-08",
            "value": 33
        },
        {
            "category": "Snapdeal",
            "label": "17-08",
            "value": 0
        },
        {
            "category": "Snapdeal",
            "label": "18-08",
            "value": 0

        }
        ,
        {
            "category": "Snapdeal",
            "label": "19-08",
            "value": 11
        }
        ,
        {
            "category": "Snapdeal",
            "label": "20-08",
            "value": 45
        }
        ,
        {
            "category": "Snapdeal",
            "label": "21-08",
            "value": 76
        }
        ,
        {
            "category": "Snapdeal",
            "label": "22-08",
            "value": 77
        }
        ,
        {
            "category": "Snapdeal",
            "label": "23-08",
            "value": 5
        },
        {
            "category": "Snapdeal",
            "label": "24-08",
            "value": 0
        }
        ,
        {
            "category": "Snapdeal",
            "label": "25-08",
            "value": 80
        }
        ,
        {
            "category": "Snapdeal",
            "label": "26-08",
            "value": 3
        }
        ,
        {
            "category": "Snapdeal",
            "label": "27-08",
            "value": 12
        } ,
        {
            "category": "Snapdeal",
            "label": "28-08",
            "value": 6
        } ,
        {
            "category": "Snapdeal",
            "label": "29-08",
            "value": 89

        },
        {
            "category": "Snapdeal",
            "label": "30-08",
            "value": 23

        }, {
             "category": "Paytm",
            "label": "01-08",
            "value": 46
        },
        { 
            "category": "Paytm",
            "label": "02-08",
            "value": 27
        },
        {
            "category": "Paytm",
            "category": "Paytm",
            "label": "03-08",
            "value": 34

        }
        ,
        {
            "category": "Paytm",
            "label": "04-08",
            "value": 90
        }
        ,
        {
            "category": "Paytm",
            "label": "05-08",
            "value": 55
        }
        ,
        {
            "category": "Paytm",
            "label": "06-08",
            "value": 33
        }
        ,
        {
            "category": "Paytm",
            "label": "07-08",
            "value": 87
        }
        ,
        {
            "category": "Paytm",
            "label": "08-08",
            "value": 34
        },
        {
            "category": "Paytm",
            "label": "09-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "10-08",
            "value": 11
        }
        ,
        {
            "category": "Paytm",
            "label": "11-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "12-08",
            "value": 0
        } ,
        {
            "category": "Paytm",
            "label": "13-08",
            "value": 77
        } ,
        {
            "category": "Paytm",
            "label": "14-08",
            "value": 33
        },
        {
            "category": "Paytm",
            "label": "15-08",
            "value": 22
        },
        {
            "category": "Paytm",
            "label": "16-08",
            "value": 77
        },
        {
            "category": "Paytm",
            "label": "17-08",
            "value": 0
        },
        {
            "category": "Paytm",
            "label": "18-08",
            "value": 22

        }
        ,
        {
            "category": "Paytm",
            "label": "19-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "20-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "21-08",
            "value": 77
        }
        ,
        {
            "category": "Paytm",
            "label": "22-08",
            "value": 55
        }
        ,
        {
            "category": "Paytm",
            "label": "23-08",
            "value": 15
        },
        {
            "category": "Paytm",
            "label": "24-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "25-08",
            "value": 44
        }
        ,
        {
            "category": "Paytm",
            "label": "26-08",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "27-08",
            "value": 4
        } ,
        {
            "category": "Paytm",
            "label": "28-08",
            "value": 76
        } ,
        {
            "category": "Paytm",
            "label": "29-08",
            "value": 22

        },
        {
            "category": "Paytm",
            "label": "30-08",
            "value": 66

        }, {
             "category": "Flipkart",
            "label": "01-08",
            "value": 22
        },
        { 
            "category": "Flipkart",
            "label": "02-08",
            "value": 33
        },
        {
            "category": "Flipkart",
            "label": "03-08",
            "value": 44

        }
        ,
        {
            "category": "Flipkart",
            "label": "04-08",
            "value": 55
        }
        ,
        {
            "category": "Flipkart",
            "label": "05-08",
            "value": 44
        }
        ,
        {
            "category": "Flipkart",
            "label": "06-08",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "07-08",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "08-08",
            "value": 88
        },
        {
            "category": "Flipkart",
            "label": "09-08",
            "value": 77
        }
        ,
        {
            "category": "Flipkart",
            "label": "10-08",
            "value": 77
        }
        ,
        {
            "category": "Flipkart",
            "label": "11-08",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "12-08",
            "value": 66
        } ,
        {
            "category": "Flipkart",
            "label": "13-08",
            "value": 55
        } ,
        {
            "category": "Flipkart",
            "label": "14-08",
            "value": 44
        },
        {
            "category": "Flipkart",
            "label": "15-08",
            "value": 76
        },
        {
            "category": "Flipkart",
            "label": "16-08",
            "value": 34
        },
        {
            "category": "Flipkart",
            "label": "17-08",
            "value": 0
        },
        {
            "category": "Flipkart",
            "label": "18-08",
            "value": 0

        }
        ,
        {
            "category": "Flipkart",
            "label": "19-08",
            "value": 33
        }
        ,
        {
            "category": "Flipkart",
            "label": "20-08",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "21-08",
            "value": 22
        }
        ,
        {
            "category": "Flipkart",
            "label": "22-08",
            "value": 11
        }
        ,
        {
            "category": "Flipkart",
            "label": "23-08",
            "value": 44
        },
        {
            "category": "Flipkart",
            "label": "24-08",
            "value": 66
        }
        ,
        {
            "category": "Flipkart",
            "label": "25-08",
            "value": 43
        }
        ,
        {
            "category": "Flipkart",
            "label": "26-08",
            "value": 78
        }
        ,
        {
            "category": "Flipkart",
            "label": "27-08",
            "value": 4
        } ,
        {
            "category": "Flipkart",
            "label": "28-08",
            "value": 2
        } ,
        {
            "category": "Flipkart",
            "label": "29-08",
            "value": 33

        },
        {
            "category": "Flipkart",
            "label": "30-08",
            "value": 95

        }


        

    ]
}


d3charts("MultiLine2D","#Multiline", Multilinedata);

var columndata = {
    "chart": {
        "caption": "Column Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "twoxaxis":false,
        "tickinterval":5,
        "slantdegree":"65",
        "pallattecolor":["#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C"
        ,"#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "01-08",
            "value": 56,
            "tooltext":"Snapdeal"
        },
        {
            "label": "02-08",
            "value": 23,
            "tooltext":"Flipkart"
        },
        {
            "label": "03-08",
            "value": 87,
            "tooltext":"Amazon"

        }
        ,
        {
            "label": "04-08",
            "value": 10,
            "tooltext":"Paytm"
        }
        ,
        {
            "label": "05-08",
            "value": 67,
            "tooltext":"Shopclues"
        }
        ,
        {
            "label": "06-08",
            "value": 50,
            "tooltext":"Jabong"
        }
        ,
        {
            "label": "07-08",
            "value": 66,
            "tooltext":"Myntra"
        }
        ,
        {
            "label": "08-08",
            "value": 12,
            "tooltext":"Trends"
        },
        {
            "label": "09-08",
            "value": 98,
            "tooltext":"Mocha"
        }
        ,
        {
            "label": "10-08",
            "value": 55,
            "tooltext":"Waves"
        }
        ,
        {
            "label": "11-08",
            "value": 88,
            "tooltext":"Snapdeal"
        }
        ,
        {
            "label": "12-08",
            "value": 44,
            "tooltext":"Flipkart"
        } ,
        {
            "label": "13-08",
            "value": 55,
            "tooltext":"Jabong"
        } ,
        {
            "label": "14-08",
            "value": 89,
            "tooltext":"Myntra"
        },
        {
            "label": "15-08",
            "value": 23,
            "tooltext":"Paytm"
        },
        {
            "label": "16-08",
            "value": 33,
            "tooltext":"Snapdeal"
        },
        {
            "label": "17-08",
            "value": 66,
            "tooltext":"Flipkart"
        },
        {
            "label": "18-08",
            "value": 76,
            "tooltext":"Amazon"

        }
        ,
        {
            "label": "19-08",
            "value": 11,
            "tooltext":"Paytm"
        }
        ,
        {
            "label": "20-08",
            "value": 45,
            "tooltext":"Shopclues"
        }
        ,
        {
            "label": "21-08",
            "value": 76,
            "tooltext":"Jabong"
        }
        ,
        {
            "label": "22-08",
            "value": 77,
            "tooltext":"Myntra"
        }
        ,
        {
            "label": "23-08",
            "value": 5,
            "tooltext":"Trends"
        },
        {
            "label": "24-08",
            "value": 0,
            "tooltext":"Mocha"
        }
        ,
        {
            "label": "25-08",
            "value": 80,
            "tooltext":"Waves"
        }
        ,
        {
            "label": "26-08",
            "value": 34,
            "tooltext":"Snapdeal"
        }
        ,
        {
            "label": "27-08",
            "value": 12,
            "tooltext":"Flipkart"
        } ,
        {
            "label": "28-08",
            "value": 6,
            "tooltext":"Jabong"
        } ,
        {
            "label": "29-08",
            "value": 89,
            "tooltext":"Myntra"
        },
        {
            "label": "30-08",
            "value": 23,
            "tooltext":"Paytm"
        }


        

    ]
}
d3charts("Column2D","#column", columndata);