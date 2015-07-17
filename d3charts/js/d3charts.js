/**
 * D3 Chart - Chart Data
 * Copyright (c) 2015 Aravind Arivarasan, https://github.com/aaravind/d3charts
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
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

    d3charts("Line2D", "#barchart", barchart);
    d3charts("Bar2D", "#barchart11", barchart11);
    d3charts("Column2D", "#barchart12", barchart12);
    d3charts("Pie2D", "#barchart3", barchart3);
    d3charts("Doughnut2D", "#barchart4", barchart4);
    d3charts("SemiPie2D", "#barchart5", barchart5);
    d3charts("SemiDoughnut2D", "#barchart6", barchart6);
    redrawchart("MultiLine2D", "#barchart7", barchart7);
    d3charts("Area2D", "#barchart2", barchart2);
    redrawchart("MultiArea2D", "#barchart8", barchart8);
    d3charts("Scatter2D", "#barchart9", barchart9);
    redrawchart("MultiScatter2D", "#barchart10", barchart10);
    d3charts("StepLine2D", "#barchart14", barchart14);
    redrawchart("MultiStepLine2D", "#barchart13", barchart13);
    redrawchart("MultiStepArea2D", "#barchart15", barchart15);
    d3charts("StepArea2D", "#barchart16", barchart16);
    d3charts("Curve2D", "#barchart17", barchart17);
    d3charts("CurveArea2D", "#barchart18", barchart18);
    redrawchart("MultiCurve2D", "#barchart19", barchart19);
    redrawchart("MultiCurveArea2D", "#barchart20", barchart20);
    d3charts("Availability2D", "#barchart21", barchart21);
    d3charts("Gauge2D", "#barchart22", barchart22);

};

var barchart = {
    "chart": {
        "caption": "Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"45",
        "tickinterval":5,
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "01-08",
            "value": 0
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
            "value": 12
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
            "value": 0
        },
        {
            "label": "17-08",
            "value": 66
        },
        {
            "label": "18-08",
            "value": 76

        }
        ,
        {
            "label": "19-08",
            "value": 0
        }
        ,
        {
            "label": "20-08",
            "value": 0
        }
        ,
        {
            "label": "21-08",
            "value": 0
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
            "value": 34
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
            "value": 0

        }


        

    ]
}
d3charts("Line2D","#barchart", barchart);

var barchart11 = {
    "chart": {
        "caption": "Bar Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "OverPriced",
            "value": 100
        },
        {
            "label": "EquallyPriced",
            "value": 1000
        },
        {
            "label": "UnderPriced",
            "value": 10
        }
        ,
        {
            "label": "UnderPriced5",
            "value": 1000000
        }
        ,
        {
            "label": "UnderPriced6",
            "value": 0
        }

    ]
}
d3charts("Bar2D","#barchart11", barchart11);

var barchart12 = {
    "chart": {
        "caption": "Column Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "twoxaxis":false,
        "tickinterval":5,
        "slantdegree":"65",
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
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
d3charts("Column2D","#barchart12", barchart12);

var barchart3 = {
    "chart": {
        "caption": "Pie Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":false,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
     "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },

    "data": [
        {
            "label": "Over Priced",
            "value": 1000
        },
        {
            "label": "Equally Priced",
            "value": 2000
        },
        {
            "label": "Under Priced",
            "value": 1340
        }
        

    ]
}
d3charts("Pie2D","#barchart3", barchart3);

var barchart4 = {
    "chart": {
        "caption": "Doughnut Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
     "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
   
    "data": [
        {
            "label": "Over Priced",
            "value": 1000
        },
        {
            "label": "Equally Priced",
            "value": 2000
        },
        {
            "label": "Under Priced",
            "value": 1340
        }
        

    ]
}
d3charts("Doughnut2D","#barchart4", barchart4);

var barchart5 = {
    "chart": {
        "caption": " Semi Pie Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
     "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
   
    "data": [
        {
            "label": "Over Priced",
            "value": 1000
        },
        {
            "label": "Equally Priced",
            "value": 2000
        },
        {
            "label": "Under Priced",
            "value": 1340
        }
        

    ]
}
d3charts("SemiPie2D","#barchart5", barchart5);

var barchart6 = {
    "chart": {
        "caption": " Semi Doughnut Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":false,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
     "export":{
        "showexport": false,
         "format": ["-Select-","jpeg","png","pdf"]
    },
 
    "data": [
        {
            "label": "Over Priced",
            "value": 1000
        },
        {
            "label": "Equally Priced",
            "value": 2000
        },
        {
            "label": "Under Priced",
            "value": 1340
        }
        

    ]
}
d3charts("SemiDoughnut2D","#barchart6", barchart6);

var barchart7 = {
    "chart": {
        "caption": "Multi Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "Clothing",
    "label": "Snapdeal",
    "value": 100
}, {
    "category": "Clothing",
    "label": "Paytm",
    "value": 200
}, {
    "category": "Clothing",
    "label": "Shopclues",
    "value": 500
}, {
    "category": "Clothing",
    "label": "Rediff",
    "value": 0
}, {
    "category": "Clothing",
    "label": "Trendsin",
    "value": 700
}, {
    "category": "Clothing",
    "label": "Zovi",
    "value": 800
}, {
    "category": "Electronic",
    "label": "Snapdeal",
    "value": 0
}, {
    "category": "Electronic",
    "label": "Paytm",
    "value": 0
}, {
    "category": "Electronic",
    "label": "Shopclues",
    "value": 0
}, {
    "category": "Electronic",
    "label": "Rediff",
    "value": 0
}, {
    "category": "Electronic",
    "label": "Trendsin",
    "value": 0
}, {
    "category": "Electronic",
    "label": "Zovi",
    "value": 0
}]
}


d3charts("MultiLine2D","#barchart7", barchart7);

var barchart2 = {
    "chart": {
        "caption": "Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":false,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "A",
            "value": 1000
        },
        {
            "label": "B",
            "value": 2000
        },
        {
            "label": "C",
            "value": 1340
        },
        {
            "label": "D",
            "value": 500
        },
        {
            "label": "E",
            "value": 250
        },
        {
            "label": "F",
            "value": 800
        }      
         ]
}


d3charts("Area2D","#barchart2", barchart2);

var barchart8 = {
    "chart": {
        "caption": "Multi Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 200
}, {
    "category": "ABC",
    "label": "D",
    "value": 600
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 900
}, {
    "category": "XYZ",
    "label": "A",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "B",
    "value": 600
}, {
    "category": "XYZ",
    "label": "C",
    "value": 450
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 900
}, {
    "category": "XYZ",
    "label": "F",
    "value": 680
}, {
    "category": "QWE",
    "label": "A",
    "value": 789
}, {
    "category": "QWE",
    "label": "B",
    "value": 500
}, {
    "category": "QWE",
    "label": "C",
    "value": 800
}, {
    "category": "QWE",
    "label": "D",
    "value": 500
}, {
    "category": "QWE",
    "label": "E",
    "value": 300
}, {
    "category": "QWE",
    "label": "F",
    "value": 1000
}]
}


d3charts("MultiArea2D","#barchart8", barchart8);

var barchart9 = {
    "chart": {
        "caption": "Scatter Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":false,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "A",
            "value": 1000
        },
        {
            "label": "B",
            "value": 2000
        },
        {
            "label": "C",
            "value": 1340
        },
        {
            "label": "D",
            "value": 500
        },
        {
            "label": "E",
            "value": 250
        },
        {
            "label": "F",
            "value": 800
        }      
         ]
}


d3charts("Scatter2D","#barchart9", barchart9);

var barchart10 = {
    "chart": {
        "caption": "Multi Scatter Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 200
}, {
    "category": "ABC",
    "label": "D",
    "value": 600
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 900
}, {
    "category": "XYZ",
    "label": "A",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "B",
    "value": 600
}, {
    "category": "XYZ",
    "label": "C",
    "value": 450
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 900
}, {
    "category": "XYZ",
    "label": "F",
    "value": 680
}, {
    "category": "QWE",
    "label": "A",
    "value": 789
}, {
    "category": "QWE",
    "label": "B",
    "value": 500
}, {
    "category": "QWE",
    "label": "C",
    "value": 800
}, {
    "category": "QWE",
    "label": "D",
    "value": 500
}, {
    "category": "QWE",
    "label": "E",
    "value": 300
}, {
    "category": "QWE",
    "label": "F",
    "value": 1000
}]
}


d3charts("MultiScatter2D","#barchart10", barchart10);


var barchart14 = {
    "chart": {
        "caption": "Step Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        
        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Over Priced",
            "value": 100
        },
        {
            "label": "Equally Priced",
            "value": 1000
        },
        {
            "label": "Under Priced",
            "value": 10
        }
        ,
        {
            "label": "Good",
            "value": 0
        }
        ,
        {
            "label": "Very Good",
            "value": 300
        }
        ,
        {
            "label": "Ok",
            "value": 10
        }
        
        ,
        {
            "label": "Best",
            "value": 1340
        }

    ]
}
d3charts("StepLine2D","#barchart14", barchart14);

var barchart13 = {
    "chart": {
        "caption": "Multi Step Line Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 0
}, {
    "category": "ABC",
    "label": "D",
    "value": 0
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 900
}, {
    "category": "XYZ",
    "label": "A",
    "value": 123
}, {
    "category": "XYZ",
    "label": "B",
    "value": 600
}, {
    "category": "XYZ",
    "label": "C",
    "value": 450
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 900
}, {
    "category": "XYZ",
    "label": "F",
    "value": 680
}, {
    "category": "QWE",
    "label": "A",
    "value": 300
}, {
    "category": "QWE",
    "label": "B",
    "value": 345
}, {
    "category": "QWE",
    "label": "C",
    "value": 123
}, {
    "category": "QWE",
    "label": "D",
    "value": 0
}, {
    "category": "QWE",
    "label": "E",
    "value": 0
}, {
    "category": "QWE",
    "label": "F",
    "value": 0
}]
}


d3charts("MultiStepLine2D","#barchart13", barchart13);

var barchart15 = {
    "chart": {
        "caption": "Multi Step Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 0
}, {
    "category": "ABC",
    "label": "D",
    "value": 600
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 100
}, {
    "category": "XYZ",
    "label": "A",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "B",
    "value": 0
}, {
    "category": "XYZ",
    "label": "C",
    "value": 450
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 900
}, {
    "category": "XYZ",
    "label": "F",
    "value": 680
}, {
    "category": "QWE",
    "label": "A",
    "value": 789
}, {
    "category": "QWE",
    "label": "B",
    "value": 500
}, {
    "category": "QWE",
    "label": "C",
    "value": 800
}, {
    "category": "QWE",
    "label": "D",
    "value": 500
}, {
    "category": "QWE",
    "label": "E",
    "value": 0
}, {
    "category": "QWE",
    "label": "F",
    "value": 1000
}]
}


d3charts("MultiStepArea2D","#barchart15", barchart15);

var barchart16 = {
    "chart": {
        "caption": "Step Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project 1",
            "value": 100
        },
        {
            "label": "Project 2",
            "value": 1000
        },
        {
            "label": "Project 3",
            "value": 700
        }
        ,
        {
            "label": "Project 4",
            "value": 0
        }
        ,
        {
            "label": "Project 5",
            "value": 300
        }
        ,
        {
            "label": "Project 6",
            "value": 350
        }
        
        ,
        {
            "label": "Project 7",
            "value": 1340
        }

    ]
}
d3charts("StepArea2D","#barchart16", barchart16);

var barchart17 = {
    "chart": {
        "caption": "Curve Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project 1",
            "value": 100
        },
        {
            "label": "Project 2",
            "value": 0
        },
        {
            "label": "Project 3",
            "value": 700
        }
        ,
        {
            "label": "Project 4",
            "value": 1000
        }
        ,
        {
            "label": "Project 5",
            "value": 123
        }
        ,
        {
            "label": "Project 6",
            "value": 350
        }
        
        ,
        {
            "label": "Project 7",
            "value": 1340
        }

    ]
}
d3charts("Curve2D","#barchart17", barchart17);

var barchart18 = {
    "chart": {
        "caption": "Curve Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project 1",
            "value": 100
        },
        {
            "label": "Project 2",
            "value": 1000
        },
        {
            "label": "Project 3",
            "value": 700
        }
        ,
        {
            "label": "Project 4",
            "value": 1000
        }
        ,
        {
            "label": "Project 5",
            "value": 300
        }
        ,
        {
            "label": "Project 6",
            "value": 0
        }
        
        ,
        {
            "label": "Project 7",
            "value": 1340
        }

    ]
}
d3charts("CurveArea2D","#barchart18", barchart18);

var barchart19 = {
    "chart": {
        "caption": "Multi Curve Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 56
}, {
    "category": "ABC",
    "label": "D",
    "value": 600
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 0
}, {
    "category": "XYZ",
    "label": "A",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "B",
    "value": 100
}, {
    "category": "XYZ",
    "label": "C",
    "value": 23
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 900
}, {
    "category": "XYZ",
    "label": "F",
    "value": 0
}, {
    "category": "QWE",
    "label": "A",
    "value": 80
}, {
    "category": "QWE",
    "label": "B",
    "value": 500
}, {
    "category": "QWE",
    "label": "C",
    "value": 800
}, {
    "category": "QWE",
    "label": "D",
    "value": 0
}, {
    "category": "QWE",
    "label": "E",
    "value": 600
}, {
    "category": "QWE",
    "label": "F",
    "value": 1000
}]
}


d3charts("MultiCurve2D","#barchart19", barchart19);

var barchart20 = {
    "chart": {
        "caption": "Multi Curve Area Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,

        "slant":false,
          "credits":{
            "text":"© priceweave.com",
            "color":"#666"
        },
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "ABC",
    "label": "A",
    "value": 100
}, {
    "category": "ABC",
    "label": "B",
    "value": 300
}, {
    "category": "ABC",
    "label": "C",
    "value": 200
}, {
    "category": "ABC",
    "label": "D",
    "value": 0
}, {
    "category": "ABC",
    "label": "E",
    "value": 500
}, {
    "category": "ABC",
    "label": "F",
    "value": 900
}, {
    "category": "XYZ",
    "label": "A",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "B",
    "value": 0
}, {
    "category": "XYZ",
    "label": "C",
    "value": 450
}, {
    "category": "XYZ",
    "label": "D",
    "value": 500
}, {
    "category": "XYZ",
    "label": "E",
    "value": 0
}, {
    "category": "XYZ",
    "label": "F",
    "value": 680
}, {
    "category": "QWE",
    "label": "A",
    "value": 789
}, {
    "category": "QWE",
    "label": "B",
    "value": 500
}, {
    "category": "QWE",
    "label": "C",
    "value": 800
}, {
    "category": "QWE",
    "label": "D",
    "value": 500
}, {
    "category": "QWE",
    "label": "E",
    "value": 300
}, {
    "category": "QWE",
    "label": "F",
    "value": 1000
}]
}


d3charts("MultiCurveArea2D","#barchart20", barchart20);

var barchart21 = {
    "chart": {
        "caption": "Availability Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [{
    "category": "small",
    "label": "11th Nov",
    "value": true
}, {
    "category": "small",
    "label": "12th Nov",
    "value": true
}, {
    "category": "small",
    "label": "13th Nov",
    "value": false
}, {
    "category": "small",
    "label": "14th Nov",
    "value": false
}, {
    "category": "small",
    "label": "15th Nov",
    "value": false
}, {
    "category": "small",
    "label": "16th Nov",
    "value": true
}, {
    "category": "medium",
    "label": "11th Nov",
    "value": true
}, {
    "category": "medium",
    "label": "12th Nov",
    "value": true
}, {
    "category": "medium",
    "label": "13th Nov",
    "value": false
}, {
    "category": "medium",
    "label": "14th Nov",
    "value": false
}, {
    "category": "medium",
    "label": "15th Nov",
    "value": true
}, {
    "category": "medium",
    "label": "16th Nov",
    "value": true
}, {
    "category": "large",
    "label": "11th Nov",
    "value": true
}, {
    "category": "large",
    "label": "12th Nov",
    "value": true
}, {
    "category": "large",
    "label": "13th Nov",
    "value": false
}, {
    "category": "large",
    "label": "14th Nov",
    "value": true
}, {
    "category": "large",
    "label": "15th Nov",
    "value": true
}, {
    "category": "large",
    "label": "16th Nov",
    "value": true
}, {
    "category": "xl",
    "label": "11th Nov",
    "value": true
}, {
    "category": "xl",
    "label": "12th Nov",
    "value": true
}, {
    "category": "xl",
    "label": "13th Nov",
    "value": false
}, {
    "category": "xl",
    "label": "14th Nov",
    "value": true
}, {
    "category": "xl",
    "label": "15th Nov",
    "value": true
}, {
    "category": "xl",
    "label": "16th Nov",
    "value": true
}, {
    "category": "xxl",
    "label": "11th Nov",
    "value": true
}, {
    "category": "xxl",
    "label": "12th Nov",
    "value": true
}, {
    "category": "xxl",
    "label": "13th Nov",
    "value": true
}, {
    "category": "xxl",
    "label": "14th Nov",
    "value": true
}, {
    "category": "xxl",
    "label": "15th Nov",
    "value": false
}, {
    "category": "xxl",
    "label": "16th Nov",
    "value": true
}]
}

d3charts("Availability2D","#barchart21", barchart21);

var barchart22 = {
    "chart": {
        "caption": "Gauge Chart",
        "captionColor":"blue",
        "yaxisname": "",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "pallattecolor":["#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "gauge":{
        "pointer":0.38,
        "range":250
    },
    
    
    "data": [
        {
            "label": "Very Bad",
             "value": "0-250"       
        },
        {
            "label": "Bad",
             "value": "250-500"    
        },
        {
            "label": "Good",
             "value": "500-750"

        }
        ,
        {
            "label": "Very Good",
             "value": "750-1000"
        }
        ,
        {
            "label": "Best",
             "value": "1000-1250"
        }    

    ]
}
d3charts("Gauge2D","#barchart22", barchart22);
function type(d) {
  d.value = +d.value;
  return d;
}