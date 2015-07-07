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
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
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
            "value": 1000
        }
        ,
        {
            "label": "UnderPriced6",
            "value": 0
        }
        ,
        {
            "label": "UnderPriced7",
            "value": 10
        }
        
        ,
        {
            "label": "UnderPriced2",
            "value": 1340
        }

    ]
}
d3charts("Line2D","#barchart", barchart);

var barchart11 = {
    "chart": {
        "caption": "Bar Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
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
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"45",
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
            "value": 234
        },
        {
            "label": "UnderPriced",
            "value": 300
        }
        ,
        {
            "label": "UnderPriced5",
            "value": 854
        }
        ,
        {
            "label": "UnderPriced6",
            "value": 645
        }
        

    ]
}
d3charts("Column2D","#barchart12", barchart12);

var barchart3 = {
    "chart": {
        "caption": "Pie Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
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
            "label": "OverPriced",
            "value": 1000
        },
        {
            "label": "EquallyPriced",
            "value": 2000
        },
        {
            "label": "UnderPriced",
            "value": 1340
        }
        

    ]
}
d3charts("Pie2D","#barchart3", barchart3);

var barchart4 = {
    "chart": {
        "caption": "Doughnut Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
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
            "label": "OverPriced",
            "value": 1000
        },
        {
            "label": "EquallyPriced",
            "value": 2000
        },
        {
            "label": "UnderPriced",
            "value": 1340
        }
        

    ]
}
d3charts("Doughnut2D","#barchart4", barchart4);

var barchart5 = {
    "chart": {
        "caption": " Semi Pie Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
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
            "label": "OverPriced",
            "value": 1000
        },
        {
            "label": "EquallyPriced",
            "value": 2000
        },
        {
            "label": "UnderPriced",
            "value": 1340
        }
        

    ]
}
d3charts("SemiPie2D","#barchart5", barchart5);

var barchart6 = {
    "chart": {
        "caption": " Semi Doughnut Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
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
            "label": "OverPriced",
            "value": 1000
        },
        {
            "label": "EquallyPriced",
            "value": 2000
        },
        {
            "label": "UnderPriced",
            "value": 1340
        }
        

    ]
}
d3charts("SemiDoughnut2D","#barchart6", barchart6);

var barchart7 = {
    "chart": {
        "caption": "Multi Line Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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
    "value": 200
}, {
    "category": "ABC",
    "label": "C",
    "value": 500
}, {
    "category": "ABC",
    "label": "D",
    "value": 300
}, {
    "category": "ABC",
    "label": "E",
    "value": 700
}, {
    "category": "ABC",
    "label": "F",
    "value": 800
}, {
    "category": "XYZ",
    "label": "A",
    "value": 500
}, {
    "category": "XYZ",
    "label": "B",
    "value": 750
}, {
    "category": "XYZ",
    "label": "C",
    "value": 300
}, {
    "category": "XYZ",
    "label": "D",
    "value": 950
}, {
    "category": "XYZ",
    "label": "E",
    "value": 1000
}, {
    "category": "XYZ",
    "label": "F",
    "value": 900
}]
}


d3charts("MultiLine2D","#barchart7", barchart7);

var barchart2 = {
    "chart": {
        "caption": "Area Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":false,
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
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":false,
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
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
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
            "value": 1000
        }
        ,
        {
            "label": "UnderPriced6",
            "value": 300
        }
        ,
        {
            "label": "UnderPriced7",
            "value": 10
        }
        
        ,
        {
            "label": "UnderPriced2",
            "value": 1340
        }

    ]
}
d3charts("StepLine2D","#barchart14", barchart14);

var barchart13 = {
    "chart": {
        "caption": "Multi Step Line Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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


d3charts("MultiStepLine2D","#barchart13", barchart13);

var barchart15 = {
    "chart": {
        "caption": "Multi Step Area Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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


d3charts("MultiStepArea2D","#barchart15", barchart15);

var barchart16 = {
    "chart": {
        "caption": "Step Area Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project1",
            "value": 100
        },
        {
            "label": "Project2",
            "value": 1000
        },
        {
            "label": "Project3",
            "value": 700
        }
        ,
        {
            "label": "Project4",
            "value": 1000
        }
        ,
        {
            "label": "Project5",
            "value": 300
        }
        ,
        {
            "label": "Project6",
            "value": 350
        }
        
        ,
        {
            "label": "Project7",
            "value": 1340
        }

    ]
}
d3charts("StepArea2D","#barchart16", barchart16);

var barchart17 = {
    "chart": {
        "caption": "Curve Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"90",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project1",
            "value": 100
        },
        {
            "label": "Project2",
            "value": 1000
        },
        {
            "label": "Project3",
            "value": 700
        }
        ,
        {
            "label": "Project4",
            "value": 1000
        }
        ,
        {
            "label": "Project5",
            "value": 300
        }
        ,
        {
            "label": "Project6",
            "value": 350
        }
        
        ,
        {
            "label": "Project7",
            "value": 1340
        }

    ]
}
d3charts("Curve2D","#barchart17", barchart17);

var barchart18 = {
    "chart": {
        "caption": "Curve Area Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"45",
        "pallattecolor":["#008ee4","#6baa01","#f8bd19"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "Project1",
            "value": 100
        },
        {
            "label": "Project2",
            "value": 1000
        },
        {
            "label": "Project3",
            "value": 700
        }
        ,
        {
            "label": "Project4",
            "value": 1000
        }
        ,
        {
            "label": "Project5",
            "value": 300
        }
        ,
        {
            "label": "Project6",
            "value": 350
        }
        
        ,
        {
            "label": "Project7",
            "value": 1340
        }

    ]
}
d3charts("CurveArea2D","#barchart18", barchart18);

var barchart19 = {
    "chart": {
        "caption": "Multi Curve Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
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


d3charts("MultiCurve2D","#barchart19", barchart19);

var barchart20 = {
    "chart": {
        "caption": "Multi Curve Area Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
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


d3charts("MultiCurveArea2D","#barchart20", barchart20);

var barchart21 = {
    "chart": {
        "caption": "Availability Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
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
        "yaxisname": "Revenue",
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