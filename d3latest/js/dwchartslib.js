function redrawchart(chart,id,data) {
    if (chart.search('Column') == -1) {
        var savelegends = d3.selectAll(id + ' path[data-visibilitypath = \'false\']')[0];
        if (savelegends.length == 0)
            d3charts(chart, id, data);
        else {
            var saveleg = [];
            for (i = 0; i < savelegends.length; i++) {
                saveleg.push(savelegends[i].getAttribute('class').split(' ')[0]);
            };
            d3charts(chart, id, data);
            for (i = 0; i < saveleg.length; i++) {
                d3.selectAll(id + ' .' + saveleg[i]).style('display', 'none').attr('data-visibilitypath', 'false');
            };
        }
    }
    else
    {   
      var savelegends = d3.selectAll(id + ' rect[data-visibility = \'false\']')[0];
        if (savelegends.length == 0)
            d3charts(chart, id, data);
        else {
            var saveleg = [];
            for (i = 0; i < savelegends.length; i++) {
                saveleg.push(savelegends[i].getAttribute('class').split(' ')[0]);
            };
            d3charts(chart, id, data);
            for (i = 0; i < saveleg.length; i++) {
                d3.selectAll(id + ' .' + saveleg[i]).style('display', 'none').attr('data-visibility', 'false');
            };
        }
    }
}

window.onresize = function (event) {

    d3charts("Line2D", "#linechart", linedata);
    redrawchart("MultiLine2D","#Multiline", Multilinedata); // For Multiline call Redraw Function to Save the legends interactions
    redrawchart("Column2D", "#column", columndata);
     redrawchart("DoubleColumn2D","#doublecolumn", doublecolumndata);
      d3charts("ColumnRange2D","#columnrange", columnrange);
};

var linedata = {
    "chart": {
        "caption": "Line Chart", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#008ee4","#E94C3D","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
    "data":  [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {

            "label": "01-08-15",
            "value": 56
        },
        {
            "label": "02-08-15",
            "value": 23
        },
        {
            "label": "03-08-15",
            "value": 87

        }
        ,
        {
            "label": "04-08-15",
            "value": 10
        }
        ,
        {
            "label": "05-08-15",
            "value": 67
        }
        ,
        {
            "label": "06-08-15",
            "value": 50
        }
        ,
        {
            "label": "07-08-15",
            "value": 66
        }
        ,
        {
            "label": "08-08-15",
            "value": 0
        },
        {
            "label": "09-08-15",
            "value": 98
        }
        ,
        {
            "label": "10-08-15",
            "value": 55
        }
        ,
        {
            "label": "11-08-15",
            "value": 88
        }
        ,
        {
            "label": "12-08-15",
            "value": 44
        } ,
        {
            "label": "13-08-15",
            "value": 55
        } ,
        {
            "label": "14-08-15",
            "value": 89
        },
        {
            "label": "15-08-15",
            "value": 23
        },
        {
            "label": "16-08-15",
            "value": 33
        },
        {
            "label": "17-08-15",
            "value": 0
        },
        {
            "label": "18-08-15",
            "value": 0

        }
        ,
        {
            "label": "19-08-15",
            "value": 11
        }
        ,
        {
            "label": "20-08-15",
            "value": 45
        }
        ,
        {
            "label": "21-08-15",
            "value": 76
        }
        ,
        {
            "label": "22-08-15",
            "value": 77
        }
        ,
        {
            "label": "23-08-15",
            "value": 5
        },
        {
            "label": "24-08-15",
            "value": 0
        }
        ,
        {
            "label": "25-08-15",
            "value": 80
        }
        ,
        {
            "label": "26-08-15",
            "value": 3
        }
        ,
        {
            "label": "27-08-15",
            "value": 12
        } ,
        {
            "label": "28-08-15",
            "value": 6
        } ,
        {
            "label": "29-08-15",
            "value": 89

        },
        {
            "label": "30-08-15",
            "value": 23

        }


        

    ]
}
// Single Type chart: Line2D,Curve2D,StepLine2D,Scatter2D
// Area Type Chart: Area2D,StepArea2D,CurveArea2D
// Multi Type Chart: MultiLine2D,MultiArea2D,MultiScatter2D,MultiStepLine2D,MultiStepArea2D,MultiCurve2D,MultiCurveArea2D
//d3charts(ChartType,Id,Data) 
//where ChartType is one of the options mentioned above;
// Id is the Div Id where the chart to be placed;
// Data is the above formed Data
    d3charts("Line2D", "#linechart", linedata);

 var Multilinedata = {
    "chart": {
        "caption": "Multi Line Chart",
        "captionColor":"#333",
        "yaxisname": "",
        "showlegend":true,
        "tickinterval":5,
        "tooltipheader":"Date", //Header in the TooTip if Not specified taken as Node
        "slant":false,
        "slantdegree":"90",
          "credits":{
            "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
    
        },
        "pallattecolor":["#008ee4","#E94C3D","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png"]
    },
    "data":  [ // Data Format example for Multi chart Type
        {
            "category": "Snapdeal",
            "label": "01-08-15",
            "value": 256
        },
        { 
            "category": "Snapdeal",
            "label": "02-08-15",
            "value": 223
        },
        {
    
            "category": "Snapdeal",
            "label": "03-08-15",
            "value": 287

        }
        ,
        {
            "category": "Snapdeal",
            "label": "04-08-15",
            "value": 210
        }
        ,
        {
            "category": "Snapdeal",
            "label": "05-08-15",
            "value": 0
        }
        ,
        {
            "category": "Snapdeal",
            "label": "06-08-15",
            "value": 250
        }
        ,
        {
            "category": "Snapdeal",
            "label": "07-08-15",
            "value": 212
        }
        ,
        {
            "category": "Snapdeal",
            "label": "08-08-15",
            "value": 0
        },
        {
            "category": "Snapdeal",
            "label": "09-08-15",
            "value": 298
        }
        ,
        {
            "category": "Snapdeal",
            "label": "10-08-15",
            "value": 255
        }
        ,
        {
            "category": "Snapdeal",
            "label": "11-08-15",
            "value": 288
        }
        ,
        {
            "category": "Snapdeal",
            "label": "12-08-15",
            "value": 278
        } ,
        {
            "category": "Snapdeal",
            "label": "13-08-15",
            "value": 255
        } ,
        {
            "category": "Snapdeal",
            "label": "14-08-15",
            "value": 289
        },
        {
            "category": "Snapdeal",
            "label": "15-08-15",
            "value": 223
        },
        {
            "category": "Snapdeal",
            "label": "16-08-15",
            "value": 280
        },
        {
            "category": "Snapdeal",
            "label": "17-08-15",
            "value": 0
        },
        {
            "category": "Snapdeal",
            "label": "18-08-15",
            "value": 0

        }
        ,
        {
            "category": "Snapdeal",
            "label": "19-08-15",
            "value": 211
        }
        ,
        {
            "category": "Snapdeal",
            "label": "20-08-15",
            "value": 0
        }
        ,
        {
            "category": "Snapdeal",
            "label": "21-08-15",
            "value": 276
        }
        ,
        {
            "category": "Snapdeal",
            "label": "22-08-15",
            "value": 277
        }
        ,
        {
            "category": "Snapdeal",
            "label": "23-08-15",
            "value": 259
        },
        {
            "category": "Snapdeal",
            "label": "24-08-15",
            "value": 0
        }
        ,
        {
            "category": "Snapdeal",
            "label": "25-08-15",
            "value": 280
        }
        ,
        {
            "category": "Snapdeal",
            "label": "26-08-15",
            "value": 0
        }
        ,
        {
            "category": "Snapdeal",
            "label": "27-08-15",
            "value": 212
        } ,
        {
            "category": "Snapdeal",
            "label": "28-08-15",
            "value": 0
        } ,
        {
            "category": "Snapdeal",
            "label": "29-08-15",
            "value": 289

        },
        {
            "category": "Snapdeal",
            "label": "30-08-15",
            "value": 223

        }, {
             "category": "Paytm",
            "label": "01-08-15",
            "value": 206
        },
        { 
            "category": "Paytm",
            "label": "02-08-15",
            "value": 227
        },
        {
            "category": "Paytm",
            "label": "03-08-15",
            "value": 204

        }
        ,
        {
            "category": "Paytm",
            "label": "04-08-15",
            "value": 290
        }
        ,
        {
            "category": "Paytm",
            "label": "05-08-15",
            "value": 255
        }
        ,
        {
            "category": "Paytm",
            "label": "06-08-15",
            "value": 245
        }
        ,
        {
            "category": "Paytm",
            "label": "07-08-15",
            "value": 287
        }
        ,
        {
            "category": "Paytm",
            "label": "08-08-15",
            "value": 222
        },
        {
            "category": "Paytm",
            "label": "09-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "10-08-15",
            "value": 211
        }
        ,
        {
            "category": "Paytm",
            "label": "11-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "12-08-15",
            "value": 0
        } ,
        {
            "category": "Paytm",
            "label": "13-08-15",
            "value": 277
        } ,
        {
            "category": "Paytm",
            "label": "14-08-15",
            "value": 237
        },
        {
            "category": "Paytm",
            "label": "15-08-15",
            "value": 222
        },
        {
            "category": "Paytm",
            "label": "16-08-15",
            "value": 277
        },
        {
            "category": "Paytm",
            "label": "17-08-15",
            "value": 0
        },
        {
            "category": "Paytm",
            "label": "18-08-15",
            "value": 222

        }
        ,
        {
            "category": "Paytm",
            "label": "19-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "20-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "21-08-15",
            "value": 277
        }
        ,
        {
            "category": "Paytm",
            "label": "22-08-15",
            "value": 255
        }
        ,
        {
            "category": "Paytm",
            "label": "23-08-15",
            "value": 215
        },
        {
            "category": "Paytm",
            "label": "24-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "25-08-15",
            "value": 273
        }
        ,
        {
            "category": "Paytm",
            "label": "26-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "27-08-15",
            "value": 0
        } ,
        {
            "category": "Paytm",
            "label": "28-08-15",
            "value": 276
        } ,
        {
            "category": "Paytm",
            "label": "29-08-15",
            "value": 150

        },
        {
            "category": "Paytm",
            "label": "30-08-15",
            "value": 123

        }, {
             "category": "Flipkart",
            "label": "01-08-15",
            "value": 150
        },
        { 
            "category": "Flipkart",
            "label": "02-08-15",
            "value": 210
        },
        {
            "category": "Flipkart",
            "label": "03-08-15",
            "value": 264

        }
        ,
        {
            "category": "Flipkart",
            "label": "04-08-15",
            "value": 255
        }
        ,
        {
            "category": "Flipkart",
            "label": "05-08-15",
            "value": 244
        }
        ,
        {
            "category": "Flipkart",
            "label": "06-08-15",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "07-08-15",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "08-08-15",
            "value": 288
        },
        {
            "category": "Flipkart",
            "label": "09-08-15",
            "value": 277
        }
        ,
        {
            "category": "Flipkart",
            "label": "10-08-15",
            "value": 277
        }
        ,
        {
            "category": "Flipkart",
            "label": "11-08-15",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "12-08-15",
            "value": 206
        } ,
        {
            "category": "Flipkart",
            "label": "13-08-15",
            "value": 255
        } ,
        {
            "category": "Flipkart",
            "label": "14-08-15",
            "value": 230
        },
        {
            "category": "Flipkart",
            "label": "15-08-15",
            "value": 276
        },
        {
            "category": "Flipkart",
            "label": "16-08-15",
            "value": 210
        },
        {
            "category": "Flipkart",
            "label": "17-08-15",
            "value": 0
        },
        {
            "category": "Flipkart",
            "label": "18-08-15",
            "value": 0

        }
        ,
        {
            "category": "Flipkart",
            "label": "19-08-15",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "20-08-15",
            "value": 0
        }
        ,
        {
            "category": "Flipkart",
            "label": "21-08-15",
            "value": 222
        }
        ,
        {
            "category": "Flipkart",
            "label": "22-08-15",
            "value": 211
        }
        ,
        {
            "category": "Flipkart",
            "label": "23-08-15",
            "value": 0
        },
        {
            "category": "Flipkart",
            "label": "24-08-15",
            "value": 210
        }
        ,
        {
            "category": "Flipkart",
            "label": "25-08-15",
            "value": 220
        }
        ,
        {
            "category": "Flipkart",
            "label": "26-08-15",
            "value": 278
        }
        ,
        {
            "category": "Flipkart",
            "label": "27-08-15",
            "value": 0
        } ,
        {
            "category": "Flipkart",
            "label": "28-08-15",
            "value": 224
        } ,
        {
            "category": "Flipkart",
            "label": "29-08-15",
            "value": 0

        },
        {
            "category": "Flipkart",
            "label": "30-08-15",
            "value": 295

        }


        

    ]
}


d3charts("MultiLine2D","#Multiline", Multilinedata);

var columndata = {
    "chart": {
        "caption": "Column Chart",
        "captionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
        "tickinterval":5,
        "slantdegree":"65",
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["#008ee4","#E94C3D","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png"]
    },
    "colormap":[
    {"name":"Snapdeal",
    "value":"#008ee4"},
       {"name":"Flipkart",
    "value":"#26AD5E"},
     {"name":"Amazon",
    "value":"#E77E22"}
    ],
    "data": [
        {
            "label": "01-08-15",
            "value": 11,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "02-08-15",
            "value": 22,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "03-08-15",
            "value": -33,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]

        }
        ,
        {
            "label": "04-08-15",
            "value": -44,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "05-08-15",
            "value": 55,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "06-08-15",
            "value": 0,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "07-08-15",
            "value": -77,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "08-08-15",
            "value": 88,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "09-08-15",
            "value": -99,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "10-08-15",
            "value": -50,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "11-08-15",
            "value": 10,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "12-08-15",
            "value": 0,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        } ,
        {
            "label": "13-08-15",
            "value": 99,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100']]
        } ,
        {
            "label": "14-08-15",
            "value": -7,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11'],['% Diffag','11']]
        },
        {
            "label": "15-08-15",
            "value":76,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "16-08-15",
            "value": -65,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        },
        {   
		    "label": "17-08-15",
            "value": 54,
            "category":"Flipkart",
            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "18-08-15",
            "value": 100,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]

        }
        ,
        {
            "label": "19-08-15",
            "value": -43,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "20-08-15",
            "value": 32,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "21-08-15",
            "value": 21,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "22-08-15",
            "value": -55,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "23-08-15",
            "value": 77,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "24-08-15",
            "value": 100,
            "category":"Amazon",
            "tooltip":[['Amazon','200'],['Your Price','100'],['% Diff','11'],['asdasd','11']]
        }
        ,
        {
            "label": "25-08-15",
            "value": 0,
            "category":"Amazon",
            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "26-08-15",
            "value": 0,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "27-08-15",
            "value": -88,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        } ,
        {
            "label": "28-08-15",
            "value": 66,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        } ,
        {
            "label": "29-08-15",
            "value": -50,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "30-08-15",
            "value": 93,
            "category":"Snapdeal",
            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }


        

    ]
}
d3charts("Column2D","#column", columndata);


var doublecolumndata = {
    "chart": {
        "caption": "Price Range Chart",
        "captionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":false,
        "slant":false,
        "twoxaxis":false,
        "tickinterval":5,
        "slantdegree":"65",
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["#008ee4","#008ee4","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png"]
    },
      "colormap":[
    {"name":"high",
    "value":"#008ee4"},
       {"name":"low",
    "value":"#E94C3D"}
    ],
    "data": [
        {
            "label": "01-08-15",
            "lowvalue": -4,
            "highvalue":67
        },
        {
            "label": "02-08-15",
            "lowvalue": -10,
            "highvalue":0
        },
        {
            "label": "03-08-15",
            "lowvalue": -6,
            "highvalue":9

        }
        ,
        {
            "label": "04-08-15",
             "lowvalue": -23,
            "highvalue":12
        }
        ,
        {
            "label": "05-08-15",
               "lowvalue": -11,
            "highvalue":88
        }
        ,
        {
            "label": "06-08-15",
             "lowvalue": -44,
            "highvalue":66
        }
        ,
        {
            "label": "07-08-15",
               "lowvalue": -33,
            "highvalue":66
        }
        ,
        {
            "label": "08-08-15",
                "lowvalue": -22,
            "highvalue":88
        },
        {
            "label": "09-08-15",
               "lowvalue": -43,
            "highvalue":43
        }
        ,
        {
            "label": "10-08-15",
             "lowvalue": -23,
            "highvalue":78
        }
        ,
        {
            "label": "11-08-15",
               "lowvalue": -12,
            "highvalue":23
        }
        ,
        {
            "label": "12-08-15",
           "lowvalue": -23,
            "highvalue":43
        } ,
        {
            "label": "13-08-15",
              "lowvalue": -55,
            "highvalue":55
        } ,
        {
            "label": "14-08-15",
                "lowvalue": -88,
            "highvalue":77
        },
        {
            "label": "15-08-15",
               "lowvalue": -67,
            "highvalue":78
        },
        {
            "label": "16-08-15",
               "lowvalue": -23,
            "highvalue":45
        },
        {   
		    "label": "17-08-15",
                "lowvalue": -21,
            "highvalue":12
        },
        {
            "label": "18-08-15",
              "lowvalue": -43,
            "highvalue":33

        }
        ,
        {
            "label": "19-08-15",
                "lowvalue": -76,
            "highvalue":54
        }
        ,
        {
            "label": "20-08-15",
                "lowvalue": -78,
            "highvalue":89
        }
        ,
        {
            "label": "21-08-15",
                "lowvalue": -56,
            "highvalue":67
        }
        ,
        {
            "label": "22-08-15",
            "lowvalue": -45,
            "highvalue":56
        }
        ,
        {
            "label": "23-08-15",
              "lowvalue": -22,
            "highvalue":30
        },
        {
            "label": "24-08-15",
              "lowvalue": -11,
            "highvalue":22
        }
        ,
        {
            "label": "25-08-15",
                "lowvalue": -88,
            "highvalue":99
        }
        ,
        {
            "label": "26-08-15",
               "lowvalue": -66,
            "highvalue":77
        }
        ,
        {
            "label": "27-08-15",
               "lowvalue": -44,
            "highvalue":55
        } ,
        {
            "label": "28-08-15",
               "lowvalue": -22,
            "highvalue":33
        } ,
        {
            "label": "29-08-15",
                "lowvalue": -51,
            "highvalue":40
        },
        {
            "label": "30-08-15",
                "lowvalue": -11,
            "highvalue":50
        }


        

    ]
}
d3charts("DoubleColumn2D","#doublecolumn", doublecolumndata);

var columnrange = {
    "chart": {
        "caption": "Heat Map",
        "captionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":false,
        "slant":false,
        "twoxaxis":false,
        "tickinterval":5,
        "slantdegree":"65",
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["#008ee4","#008ee4","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png"]
    },
    "range":{
        "lowrange":-100,
        "highrange":100
    },
    "data": [
        {
            "label": "01-08-15",
             "values":[[100,50],[50,-10],[-10,-60],[-60,-80]]
        },
        {
            "label": "02-08-15",
             "values":[[80,60],[60,0],[0,-30]]
        },
        {
            "label": "03-08-15",
             "values":[[90,75],[75,55],[55,33],[33,20],[20,10],[10,-10],[-10,-30],[-30,-50]]

        }
        ,
        {
            "label": "04-08-15",
             "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        }
        ,
        {
            "label": "05-08-15",
             "values":[[50,10],[10,-40],[-40,-78]]
        }
        ,
        {
            "label": "06-08-15",
             "values":[[34,23],[23,-11],[-11,-55]]
        }
        ,
        {
            "label": "07-08-15",
             "values":[[89,54],[54,-10],[-10,-78],[-78,-90]]
        }
        ,
        {
            "label": "08-08-15",
             "values":[[100,0],[0,-50],[-50,-100]]
        },
        {
            "label": "09-08-15",
             "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        }
        ,
        {
            "label": "10-08-15",
             "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        }
        ,
        {
            "label": "11-08-15",
             "values":[[45,35],[35,25],[25,10],[10,-30],[-30,-60],[-60,-80]]
        }
        ,
        {
            "label": "12-08-15",
            "values":[[90,75],[75,55],[55,33],[33,20],[20,10],[10,-10],[-10,-30],[-30,-50]]
        } ,
        {
            "label": "13-08-15",
             "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        } ,
        {
            "label": "14-08-15",
             "values":[[89,54],[54,-10],[-10,-78],[-78,-90]]
        },
        {
            "label": "15-08-15",
            "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        },
        {
            "label": "16-08-15",
            "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        },
        {   
		    "label": "17-08-15",
             "values":[[30,10],[10,-10],[-10,-30]]
        },
        {
            "label": "18-08-15",
            "values":[[45,35],[35,25],[25,10],[10,-30],[-30,-60],[-60,-80]]

        }
        ,
        {
            "label": "19-08-15",
             "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        }
        ,
        {
            "label": "20-08-15",
            "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        }
        ,
        {
            "label": "21-08-15",
          "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        }
        ,
        {
            "label": "22-08-15",
             "values":[[90,75],[75,55],[55,33],[33,20],[20,10],[10,-10],[-10,-30],[-30,-50]]
        }
        ,
        {
            "label": "23-08-15",
           "values":[[45,35],[35,25],[25,10],[10,-30],[-30,-60],[-60,-80]]
        },
        {
            "label": "24-08-15",
            "values":[[90,75],[75,55],[55,33],[33,20],[20,10],[10,-10],[-10,-30],[-30,-50]]
        }
        ,
        {
            "label": "25-08-15",
             "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        }
        ,
        {
            "label": "26-08-15",
             "values":[[56,34],[34,10],[10,0],[0,-10],[-10,-40],[-40,-80]]
        }
        ,
        {
            "label": "27-08-15",
             "values":[[45,35],[35,25],[25,10],[10,-30],[-30,-60],[-60,-80]]
        } ,
        {
            "label": "28-08-15",
             "values":[[90,75],[75,55],[55,33],[33,20],[20,10],[10,-10],[-10,-30],[-30,-50]]
        } ,
        {
            "label": "29-08-15",
             "values":[[68,43],[43,23],[23,10],[10,-50],[-50,-70]]
        },
        {
            "label": "30-08-15",
             "values":[[50,40],[40,35],[35,20],[20,15],[15,0],[0,-10],[-10,-30],[-30,-70]]
        }


        

    ]
}
d3charts("ColumnRange2D","#columnrange", columnrange);