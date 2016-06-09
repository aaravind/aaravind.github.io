function redrawchart(chart,id,data) {
    if (chart.search('Column') == -1 && chart.search('Bar') == -1 && chart.search('Calender') == -1 && chart.search('WeekHour2D') == -1) {
        if (chart == 'Bilevel2D' && zoomcontent != undefined) {
           d3charts(chart, id, data,zoomcontent);
          
        }
        else { 
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
        
    }
    else {
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
                if(chart.search('Calender') == -1 && chart != 'WeekHour2D')
                d3.selectAll(id + ' .' + saveleg[i]).style('display', 'none').attr('data-visibility', 'false');
                else
                 d3.selectAll(id + ' .' + saveleg[i]).style('fill', 'none').attr('data-visibility', 'false');
            };
        }
        
        
    }
}

window.onresize = function (event) {

    d3charts("Line2D", "#linechart", linedata);
    redrawchart("MultiLine2D","#Multiline", Multilinedata); // For Multiline call Redraw Function to Save the legends interactions
    redrawchart("Column2D", "#column", columndata);
     redrawchart("DoubleColumn2D","#doublecolumn", doublecolumndata);
      redrawchart("ColumnRange2D","#columnrange", columnrange);
      redrawchart("StackedBar2D","#stackedbar", stackedbar);
      redrawchart("StackedColumn2D","#stackedcolumn", stackedcolumn);
          d3charts("Bubble2D", "#bubble", bubbledata);
              redrawchart("BarLine2D", "#barline", barlinedata);
              /*  redrawchart("CalenderMultiView2D", "#calendermultiview", calenderMultidata);*/
                 redrawchart("CalenderSingleView2D", "#calendersingleview", calenderSingledata);
                redrawchart("Bilevel2D", "#bilevel", bileveldata);
                    redrawchart("WeekHour2D", "#weekhour", hourlydata);
                    d3charts("Pricing2D", "#pricing", pricing);
                    d3charts("MultiDonut2D", "#multidonut", multipledonut);
                    d3charts("CustomBar2D", "#custombar", custombar);
                    d3charts("CustomColumn2D", "#customcolumn", customcolumn);
                    redrawchart("GroupBar2D", "#groupbar", groupbar);
                        redrawchart("GroupBar2D", "#groupbarneg", groupbarneg);
                             redrawchart("MultiSeriesRange2D", "#multiseriesrange", multiseriesrange);
                             d3charts("BoxPlot2D", "#boxplot", boxplot);
                             d3charts("CustomVerticalBar2D", "#customverticalbar", customverticalbar);
                             redrawchart("GroupBar2D", "#groupbarcustom", groupbarcustom);
};

var linedata = {
    "chart": {
        "caption": "Line Chart", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
         "subcaption": "More Info",
        "subcaptionColor":"black",
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
         "format": ["-Download-","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
     "click":function(data){
    alert(data.label + ' : '+data.value);},
    "data":  [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {

            "label": "01-08-15",
            "value": 56.123123
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
            "label": "07-08-15asdddddddddddddddddddddddddddddddddddddddddddddddddddd",
            "value": 66
        }
        ,
        {
            "label": "08-08-15asddddddddddddddddddddddddddddddddd",
            "value": 0
        },
        {
            "label": "09-08-15adsasdsadasdasdasdasdsdasdsadasz",
            "value": 98
        }
        ,
        {
            "label": "10-08-15",
            "value": 55
        }
        ,
        {
            "label": "11-08-15asddddddddddddddddddddddddddddddddd",
            "value": 88
        }
        ,
        {
            "label": "12-08-15",
            "value": 44
        } ,
        {
            "label": "13-08-15saddddddddddddddddddddddddddddddddddddd",
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
            "label": "25-08-15asdddddddddddddddddd",
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
            "label": "30-08-15asdddddddddddddddddddddddddddddddddddddddddddddddddd",
            "value": 23.345

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
   "chart":{  
      "caption":"Price Gap with Lowest Priced Competitor",
      "captionColor":"black",
      "yaxisname":"",
      "showlegend":true,
      "tickinterval":4,
      "tooltipheader":"Date",
      "slant":false,
      "slantdegree":"90",
      "suffixsymbol":'%',
      "credits":{  
         "text":" ",
         "color":"#666",
         "imageurl":"../images/logo.png"
      },
      "pallattecolor":[  
         "#008ee4",
         "#E94C3D",
         "#26AD5E",
         "#E77E22",
         "#2B80B9",
         "#F2C40F",
         "#2D3E50",
         "#5CADE2",
         "#BE3A2B",
         "#7E8C8D",
         "#9A59B5",
         "#34495E",
         "#BEC3C7",
         "#EC0000",
         "#BE3243",
         "#FF3243",
         "#BE0043",
         "#BE32FF",
         "#CC3243",
         "#BECC43",
         "#BE324C",
         "#f8bd19",
         "#e44a00",
         "#008FF4",
         "#33bdda",
         "#6baa01",
         "#583e78"
      ]
   },
   "export":{  
      "showexport":true,
      "filename":"http://localhost/priceweave_v3/insights/loadchart/price_gap_comparison/#3-Zoook ZB-BS100R Blue",
      "format":[  
         "Download",
         "jpeg",
         "png"
      ]
   },
   "data":[
{
category: "Amazon",
count: 0,
value: 0,
label: "08-05-2016"
},
{
category: "Amazon",
count: 243,
value: -1.6387663716807863,
label: "09-05-2016"
},
{
category: "Amazon",
count: 233,
value: 4.62185342009323,
label: "10-05-2016"
},
{
category: "Amazon",
count: 243,
value: -4.9207098714097945,
label: "11-05-2016"
},
{
category: "Amazon",
count: 243,
value: -1.5335278828203724,
label: "12-05-2016"
},
{
category: "Amazon",
count: 243,
value: -11.689026220452298,
label: "13-05-2016"
},
{
category: "Amazon",
count: 243,
value: 0.7342856216381797,
label: "14-05-2016"
},
{
category: "Amazon",
count: 243,
value: 2.8332749438060483,
label: "15-05-2016"
},
{
category: "Amazon",
count: 243,
value: 4.147104692833814,
label: "16-05-2016"
},
{
category: "Amazon",
count: 243,
value: 4.34200769221191,
label: "17-05-2016"
},
{
category: "Amazon",
count: 243,
value: 0.9474852579667148,
label: "18-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.5952074159491971,
label: "19-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.4395192880267956,
label: "20-05-2016"
},
{
category: "Amazon",
count: 243,
value: 0.10310619599719036,
label: "21-05-2016"
},
{
category: "Amazon",
count: 239,
value: 1.438854611631572,
label: "22-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.6211790747087651,
label: "23-05-2016"
},
{
category: "Amazon",
count: 243,
value: 1.0784401258979388,
label: "24-05-2016"
},
{
category: "Amazon",
count: 243,
value: -1.419785817666947,
label: "25-05-2016"
},
{
category: "Amazon",
count: 243,
value: -3.381400329675996,
label: "26-05-2016"
},
{
category: "Amazon",
count: 243,
value: 1.4520300033685196,
label: "27-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.10585498228140378,
label: "28-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.16232145679748797,
label: "29-05-2016"
},
{
category: "Amazon",
count: 243,
value: -0.005499496137001852,
label: "30-05-2016"
},
{
category: "Amazon",
count: 243,
value: 1.5663531582203545,
label: "31-05-2016"
},
{
category: "Amazon",
count: 243,
value: -1.1293363421850742,
label: "01-06-2016"
},
{
category: "Amazon",
count: 243,
value: -1.995003277951798,
label: "02-06-2016"
},
{
category: "Amazon",
count: 243,
value: 0.03243495070630577,
label: "03-06-2016"
},
{
category: "Amazon",
count: 243,
value: 7.485664113182571,
label: "04-06-2016"
},
{
category: "Amazon",
count: 242,
value: -4.035752921323774,
label: "05-06-2016"
},
{
category: "Amazon",
count: 243,
value: -0.14831965822796883,
label: "06-06-2016"
},
{
category: "Amazon",
count: 243,
value: 1.275645788137955,
label: "07-06-2016"
},
{
category: "Flipkart",
count: 0,
value: 0,
label: "08-05-2016"
},
{
category: "Flipkart",
count: 259,
value: 1.7693673584319989,
label: "09-05-2016"
},
{
category: "Flipkart",
count: 257,
value: 4.633401191882265,
label: "10-05-2016"
},
{
category: "Flipkart",
count: 259,
value: -3.176537141972334,
label: "11-05-2016"
},
{
category: "Flipkart",
count: 260,
value: 0.41593199820790966,
label: "12-05-2016"
},
{
category: "Flipkart",
count: 261,
value: -12.731532914514569,
label: "13-05-2016"
},
{
category: "Flipkart",
count: 261,
value: -0.5112357388076011,
label: "14-05-2016"
},
{
category: "Flipkart",
count: 261,
value: -0.713135123652104,
label: "15-05-2016"
},
{
category: "Flipkart",
count: 260,
value: 7.584884783652194,
label: "16-05-2016"
},
{
category: "Flipkart",
count: 259,
value: 1.0100661188447242,
label: "17-05-2016"
},
{
category: "Flipkart",
count: 260,
value: 2.0571888276923906,
label: "18-05-2016"
},
{
category: "Flipkart",
count: 262,
value: -2.1882995677760957,
label: "19-05-2016"
},
{
category: "Flipkart",
count: 262,
value: 0.4025141844998536,
label: "20-05-2016"
},
{
category: "Flipkart",
count: 258,
value: 1.1035256859284897,
label: "21-05-2016"
},
{
category: "Flipkart",
count: 210,
value: 15.85315709161014,
label: "22-05-2016"
},
{
category: "Flipkart",
count: 264,
value: -28.549345416898376,
label: "23-05-2016"
},
{
category: "Flipkart",
count: 262,
value: 7.509869403502922,
label: "24-05-2016"
},
{
category: "Flipkart",
count: 262,
value: -1.0430696398647192,
label: "25-05-2016"
},
{
category: "Flipkart",
count: 263,
value: -2.877706885885243,
label: "26-05-2016"
},
{
category: "Flipkart",
count: 264,
value: 0.8641722638816107,
label: "27-05-2016"
},
{
category: "Flipkart",
count: 264,
value: 0.07512582657009187,
label: "28-05-2016"
},
{
category: "Flipkart",
count: 263,
value: 0.5707410520782891,
label: "29-05-2016"
},
{
category: "Flipkart",
count: 263,
value: 0.14054085798089586,
label: "30-05-2016"
},
{
category: "Flipkart",
count: 262,
value: 0.13168679184516174,
label: "31-05-2016"
},
{
category: "Flipkart",
count: 264,
value: -3.1226183863454886,
label: "01-06-2016"
},
{
category: "Flipkart",
count: 264,
value: -3.107539293483373,
label: "02-06-2016"
},
{
category: "Flipkart",
count: 259,
value: 4.612285320799264,
label: "03-06-2016"
},
{
category: "Flipkart",
count: 258,
value: 4.689541911279291,
label: "04-06-2016"
},
{
category: "Flipkart",
count: 254,
value: -1.3034399143546183,
label: "05-06-2016"
},
{
category: "Flipkart",
count: 259,
value: -1.3648904819067174,
label: "06-06-2016"
},
{
category: "Flipkart",
count: 257,
value: 0.2606862177184872,
label: "07-06-2016"
},
{
category: "Jabong",
count: 0,
value: 0,
label: "08-05-2016"
},
{
category: "Jabong",
count: 6,
value: 100,
label: "09-05-2016"
},
{
category: "Jabong",
count: 6,
value: -1.1962931760741404,
label: "10-05-2016"
},
{
category: "Jabong",
count: 6,
value: 1.6407026847862116,
label: "11-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "12-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "13-05-2016"
},
{
category: "Jabong",
count: 6,
value: -1.6680707666385848,
label: "14-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "15-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "16-05-2016"
},
{
category: "Jabong",
count: 6,
value: 18.508856240560206,
label: "17-05-2016"
},
{
category: "Jabong",
count: 6,
value: -22.712721145745572,
label: "18-05-2016"
},
{
category: "Jabong",
count: 6,
value: 1.6407026847862116,
label: "19-05-2016"
},
{
category: "Jabong",
count: 6,
value: 1.1629811629811666,
label: "20-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "21-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "22-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "23-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "24-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "25-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "26-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "27-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "28-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "29-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "30-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "31-05-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "01-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "02-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "03-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "04-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "05-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "06-06-2016"
},
{
category: "Jabong",
count: 6,
value: 0,
label: "07-06-2016"
},
{
category: "Paytm",
count: 0,
value: 0,
label: "08-05-2016"
},
{
category: "Paytm",
count: 224,
value: -17.642175372104703,
label: "09-05-2016"
},
{
category: "Paytm",
count: 193,
value: 13.144102076622332,
label: "10-05-2016"
},
{
category: "Paytm",
count: 223,
value: -12.278384224214527,
label: "11-05-2016"
},
{
category: "Paytm",
count: 223,
value: -1.6720678016297779,
label: "12-05-2016"
},
{
category: "Paytm",
count: 223,
value: -30.121925890992934,
label: "13-05-2016"
},
{
category: "Paytm",
count: 224,
value: 1.4515900885651352,
label: "14-05-2016"
},
{
category: "Paytm",
count: 224,
value: -1.1600007428804906,
label: "15-05-2016"
},
{
category: "Paytm",
count: 224,
value: 17.799428243502682,
label: "16-05-2016"
},
{
category: "Paytm",
count: 223,
value: 8.038973707496622,
label: "17-05-2016"
},
{
category: "Paytm",
count: 223,
value: -2.3581220457101413,
label: "18-05-2016"
},
{
category: "Paytm",
count: 223,
value: 0.4597607019124281,
label: "19-05-2016"
},
{
category: "Paytm",
count: 223,
value: -0.28948337267870083,
label: "20-05-2016"
},
{
category: "Paytm",
count: 223,
value: 0.13296557673058196,
label: "21-05-2016"
},
{
category: "Paytm",
count: 191,
value: 10.041288175496977,
label: "22-05-2016"
},
{
category: "Paytm",
count: 223,
value: -18.464468684493735,
label: "23-05-2016"
},
{
category: "Paytm",
count: 223,
value: 5.962205297429532,
label: "24-05-2016"
},
{
category: "Paytm",
count: 223,
value: 0.6470253376280543,
label: "25-05-2016"
},
{
category: "Paytm",
count: 224,
value: -7.640735409193454,
label: "26-05-2016"
},
{
category: "Paytm",
count: 224,
value: 8.046266790732536,
label: "27-05-2016"
},
{
category: "Paytm",
count: 224,
value: -2.0737665668754124,
label: "28-05-2016"
},
{
category: "Paytm",
count: 224,
value: 0.015834370165690108,
label: "29-05-2016"
},
{
category: "Paytm",
count: 224,
value: -14.391213985629339,
label: "30-05-2016"
},
{
category: "Paytm",
count: 224,
value: 12.350932576041648,
label: "31-05-2016"
},
{
category: "Paytm",
count: 225,
value: -0.23119084958945516,
label: "01-06-2016"
},
{
category: "Paytm",
count: 225,
value: 0.02709430504869215,
label: "02-06-2016"
},
{
category: "Paytm",
count: 225,
value: -5.293614381491466,
label: "03-06-2016"
},
{
category: "Paytm",
count: 225,
value: 5.202130576448425,
label: "04-06-2016"
},
{
category: "Paytm",
count: 225,
value: 1.395588595268307,
label: "05-06-2016"
},
{
category: "Paytm",
count: 223,
value: -0.3918112871002805,
label: "06-06-2016"
},
{
category: "Paytm",
count: 225,
value: -1.2555480579323757,
label: "07-06-2016"
},
{
category: "SnapDeal",
count: 0,
value: 0,
label: "08-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: -0.79532518600355,
label: "09-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: 5.520666493335201,
label: "10-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: -0.010276439200531942,
label: "11-05-2016"
},
{
category: "SnapDeal",
count: 341,
value: -3.454023485741119,
label: "12-05-2016"
},
{
category: "SnapDeal",
count: 341,
value: -11.963971823375587,
label: "13-05-2016"
},
{
category: "SnapDeal",
count: 337,
value: -2.279785260482457,
label: "14-05-2016"
},
{
category: "SnapDeal",
count: 339,
value: 1.0975154405920224,
label: "15-05-2016"
},
{
category: "SnapDeal",
count: 338,
value: 10.983110953160114,
label: "16-05-2016"
},
{
category: "SnapDeal",
count: 341,
value: 4.42128685921347,
label: "17-05-2016"
},
{
category: "SnapDeal",
count: 340,
value: 1.6180939762844762,
label: "18-05-2016"
},
{
category: "SnapDeal",
count: 341,
value: -1.97094528251027,
label: "19-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: 0.643281497347748,
label: "20-05-2016"
},
{
category: "SnapDeal",
count: 343,
value: -2.4385163478959035,
label: "21-05-2016"
},
{
category: "SnapDeal",
count: 337,
value: 0.5147191769848752,
label: "22-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: -6.666974978254818,
label: "23-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: 6.014507605619831,
label: "24-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: 1.7951097088643964,
label: "25-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: -6.123570597769139,
label: "26-05-2016"
},
{
category: "SnapDeal",
count: 343,
value: 4.076223402323272,
label: "27-05-2016"
},
{
category: "SnapDeal",
count: 344,
value: -3.394306278686057,
label: "28-05-2016"
},
{
category: "SnapDeal",
count: 343,
value: 0.15234462802555276,
label: "29-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: 0.5717501279186762,
label: "30-05-2016"
},
{
category: "SnapDeal",
count: 342,
value: -0.6208749542498371,
label: "31-05-2016"
},
{
category: "SnapDeal",
count: 344,
value: -2.1789558307568773,
label: "01-06-2016"
},
{
category: "SnapDeal",
count: 342,
value: -1.449913381794605,
label: "02-06-2016"
},
{
category: "SnapDeal",
count: 342,
value: 1.0297109106776903,
label: "03-06-2016"
},
{
category: "SnapDeal",
count: 341,
value: 5.3946516800587405,
label: "04-06-2016"
},
{
category: "SnapDeal",
count: 340,
value: -1.8145025604133855,
label: "05-06-2016"
},
{
category: "SnapDeal",
count: 341,
value: -6.486949357459413,
label: "06-06-2016"
},
{
category: "SnapDeal",
count: 341,
value: 4.775914694194823,
label: "07-06-2016"
}
]
}


d3charts("MultiLine2D","#Multiline", Multilinedata);

var columndata = {
    "chart": {
        "caption": "Column Chart",
        "captionColor":"black",
         "subcaption": "More Info",
        "subcaptionColor":"black",
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
        "pallattecolorsingle":false, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
        "singlecolorgradient":true,
         "pallattecolor":["#92c6db","#008ee4","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"]
    },
      "click":function(data){
    alert(data.label + ' : '+data.value);},
    "data": [
        {
            "label": "01-08-15asdasdsadasdasdsadasdasdsadasdasdsadasdasdasdasdasdasdasdasadas",
            "value": -0.0567,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "02-08-15",
            "value": -0.0567,

            "tooltip":[['Flipkart','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "03-08-15",
            "value": -0.0567,

            "tooltip":[['Amazon','100'],['Your Price','100'],['% Diff','11']]

        }
        ,
        {
            "label": "04-08-15",
            "value": -0.0567,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "05-08-15",
            "value": -0.0567,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "06-08-15",
            "value": 0,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "07-08-15",
            "value": -0.07767,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "08-08-15",
            "value": -0.0567,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        },
        {
            "label": "09-08-15",
            "value": -0.5,

            "tooltip":[['Snapdeal','100'],['Your Price','100'],['% Diff','11']]
        }
        ,
        {
            "label": "10-08-15",
            "value": 2.05671,

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
         "format": ["-Download-","jpeg","png"]
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
            "lowvalue": -4.345,
            "highvalue":67.123
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
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "yaxisname": "",
        "color":"white",
        "tooltipheader":"Retailer",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
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
         "format": ["-Download-","jpeg","png"]
    },
        "colormap":[
    {"name":"Very Low",
    "value":"#c7001e"},
       {"name":"Low",
    "value":"#f6a580"},
     {"name":"Average",
    "value":"#cccccc"},
      {"name":"High",
    "value":"#92c6db"},
      {"name":"Very High",
    "value":"#086fad"}

    ],
    "range":{
        "lowrange":0,
        "highrange":500
    },
    "rangetype":"Price Range",
      "click":function(data){
    alert(data[0].label);},
    "data":  [{"values":[[0.123,44.1123,3],[44.1,88.212,8],[88.2,132.3,5],[132.3,176.4,3],[176.4,220.5,3],[264.6,308.7,1]],"label":"Amazon-US"},{"values":[[44.1,88.2,9],[88.2,132.3,7],[132.3,176.4,6],[176.4,220.5,4],[220.5,264.6,2],[308.7,352.8,1]],"label":"Amazon-US-Ace Micros"},{"values":[[0,44.1,4],[88.2,132.3,11],[132.3,176.4,9],[176.4,220.5,5],[220.5,264.6,3]],"label":"Amazon-US-DataVision Computer Video"},{"values":[[0,44.1,6],[44.1,88.2,11],[88.2,132.3,16],[132.3,176.4,10],[176.4,220.5,7],[264.6,308.7,2]],"label":"Amazon-US-http://ecx.images-amazon.com/images/I/01dXM-J1oeL.gif"},{"values":[[44.1,88.2,15],[88.2,132.3,19],[132.3,176.4,13],[176.4,220.5,9],[264.6,308.7,3]],"label":"Amazon-US-IPC-Store"},{"values":[[0,44.1,8],[44.1,88.2,19],[88.2,132.3,23],[132.3,176.4,15],[176.4,220.5,10],[220.5,264.6,4],[264.6,308.7,4]],"label":"NetGear-US"}]
    }
d3charts("ColumnRange2D","#columnrange", columnrange);


var stackedbar = {
    "chart": {
        "caption": "Stacked Bar Chart",
        "captionColor":"black",
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
        "slantdegree":"65",
        "dynamicheight":true,
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["#de8e43","#dfc133","#e0594b","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"]
    },
    "colormap":[
    {"name":"Highest",
    "value":"#de8e43"},
       {"name":"Equal",
    "value":"#dfc133"},
     {"name":"Lowest",
    "value":"#e0594b"}
    ],
         // "click":function(data){
   // alert(data[0].label);},
    "data": [
        {
            "label": "Electronic",
            "value": 11.234,
            "category":"Highest"
        },
        {
            "label": "Electronic",
            "value": 22.223423,
             "category":"Equal"
        },
        {
            "label": "Electronic",
            "value": 33.567567,
            "category":"Lowest"

        }
        ,
        {
            "label": "Watch",
            "value": 44,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch",
            "value": 55,
             "category":"Equal"
        }
        ,
        {
            "label": "Watch",
            "value": 12,
            "category":"Lowest"
        }
        ,
        {
            "label": "Shoe",
            "value": 77,
             "category":"Highest"
        }
        ,
        {
            "label": "Shoe",
            "value": 88,
             "category":"Equal"
        },
        {
            "label": "Shoe",
            "value": 99,
            "category":"Lowest"
        }
        ,
        {
            "label": "bag",
            "value": 100,
             "category":"Highest"
        }
        ,
        {
            "label": "bag",
            "value": 200,
             "category":"Equal"
        },
        {
            "label": "bag",
            "value": 50,
            "category":"Lowest"
        }
         ,
        {
            "label": "fitness equipments",
            "value": 100,
            "category":"Highest"
        }
        ,
        {
            "label": "fitness equipments",
            "value": 200,
             "category":"Equal"
        },
        {
            "label": "fitness equipments",
            "value": 50,
            "category":"Lowest"
        }
        ,
        {
            "label": "T shirt",
            "value": 100,
            "category":"Highest"
        }
        ,
        {
            "label": "T shirt",
            "value": 200,
            "category":"Equal"
        },
        {
            "label": "T shirt",
            "value": 50,
            "category":"Lowest"
        } ,
        {
            "label": "Jean",
            "value": 34,
            "category":"Highest"
        }
        ,
        {
            "label": "Jean",
            "value": 56,
            "category":"Equal"
        },
        {
            "label": "Jean",
            "value": 78,
            "category":"Lowest"
        }
         ,
        {
            "label": "Watch for Men",
            "value": 32,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch for Men",
            "value": 134,
            "category":"Equal"
        },
        {
            "label": "Watch for Men",
            "value": 12,
            "category":"Lowest"
        } ,
        {
            "label": "Watch for Women",
            "value": 12,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch for Women",
            "value": 34,
            "category":"Equal"
        },
        {
            "label": "Watch for Women",
            "value": 56,
            "category":"Lowest"
        }
    ]
}
d3charts("StackedBar2D","#stackedbar", stackedbar);

var stackedcolumn = {
    "chart": {
        "caption": "Stacked Column Chart",
        "captionColor":"black",
         "tooltipheader":"Seller",
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
        "slantdegree":"65",
        "dynamicheight":true,
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
         "format": ["-Download-","jpeg","png"]
    },
    "colormap":[
    {"name":" > 50",
    "value":"#008ee4"},
       {"name":">40-50",
    "value":"#26AD5E"},
     {"name":">30-40",
    "value":"#E77E22"}
    ],
       "click":function(data){
    alert(data[0].label + ' : '+data[0].value);},
    "data": [
        {
            "label": "Nikonasdsadsadsadsadsadsa",
            "value": 33.123,
            "tooltip":45.3423,
            "category":" > 50"
        },
        {
            "label": "Nikonasdsadsadsadsadsadsa",
            "value": 22.234,
             "tooltip":12.543,
             "category":">40-50"
        },
        {
            "label": "Nikonasdsadsadsadsadsadsa",
            "value": 45,
             "tooltip":23,
            "category":">30-40"

        }
        ,
        {
            "label": "Livon",
            "value": 50,
             "tooltip":43,
            "category":" > 50"
        }
        ,
        {
            "label": "Livon",
            "value": 20,
             "tooltip":78,
            "category":">40-50"
        }
        ,
        {
            "label": "Livon",
            "value": 30,
             "tooltip":56,
           "category":">30-40"
        }
        ,
        {
            "label": "WD",
            "value": 10,
             "tooltip":12,
             "category":" > 50"
        }
        ,
        {
            "label": "WD",
            "value": 20,
             "tooltip":34,
             "category":">40-50"
        },
        {
            "label": "WD",
            "value": 70,
             "tooltip":65,
             "category":">30-40"
        }
        ,
        {
            "label": "Spy",
            "value": 80,
             "tooltip":78,
             "category":" > 50"
        }
        ,
        {
            "label": "Spy",
            "value": 10,
             "tooltip":23,
            "category":">40-50"
        },
        {
            "label": "Spy",
            "value": 10,
             "tooltip":56,
            "category":">30-40"
        }
         ,
        {
            "label": "Lego",
            "value": 15,
             "tooltip":321,
             "category":" > 50"
        }
        ,
        {
            "label": "Lego",
            "value": 25,
             "tooltip":234,
             "category":">40-50"
        },
        {
             "label": "Lego",
            "value": 60,
             "tooltip":90,
            "category":">30-40"
        }
        ,
        {
            "label": "Orion",
            "value": 50,
             "tooltip":89,
             "category":" > 50"
        }
        ,
        {
            "label": "Orion",
            "value": 25,
             "tooltip":87,
             "category":">40-50"
        },
        {
            "label": "Orion",
            "value": 25,
             "tooltip":76,
             "category":">30-40"
        } ,
        {
            "label": "Metz",
            "value": 60,
             "tooltip":54,
           "category":" > 50"
        }
        ,
        {
             "label": "Metz",
            "value": 20,
             "tooltip":34,
             "category":">40-50"
        },
        {
             "label": "Metz",
            "value": 20,
             "tooltip":12,
            "category":">30-40"
        }
         
    ]
}
d3charts("StackedColumn2D","#stackedcolumn", stackedcolumn);


var bubbledata = {
    "chart": {
        "caption": "Bubble Chart", //Name of the chart Header
        "captionColor": "black", // Color of the Chart Header

        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant": false, // X axis label slant
        "slantdegree": "90", // Slant based on the degree specified
        "credits": {            // Credits
            "text": "Powered By", // Credit Name
            "color": "#666",
            "imageurl": "../images/logo.png"
        },
        "fillinside": "none", // fill or none
        "pallattecolor": ["#008ee4", "#E94C3D", "#26AD5E", "#E77E22", "#2B80B9", "#F39C11", "#F2C40F", "#179F87", "#2D3E50", "#9045AE", "#5CADE2", "#2ECD71", "#BE3A2B", "#C85600", "#7E8C8D", "#9A59B5", "#34495E", "#BEC3C7", "#EC0000", "#BE3243", "#FF3243", "#BE0043", "#BE32FF", "#CC3243", "#BECC43", "#BE324C", "#f8bd19", "#e44a00", "#008FF4", "#33bdda", "#6baa01", "#583e78"] // Pallette colors for 30 values
    },
    "export": {
        "showexport": true,
        "format": ["-Download-", "jpeg", "png"] //Specify Format to export.Currently support jpeg,png
    },
    "click": function (data) {
        alert(data.name);
    },
    "tableshow": {
        "show":true,
        "divheight":'500px',
        "noofrows":5
    },
    "data": [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {

        "label": "Palladiumasdasdasdasdasd",
        "value": 56.1232
    },
        {
            "label": "Lead",
            "value": 23
        },
        {
            "label": "Platinum",
            "value": 87

        }
        ,
        {
            "label": "Silver",
            "value": 10
        }
        ,
        {
            "label": "Copper",
            "value": 67
        }
        ,
        {
            "label": "Zinc",
            "value": 50
        }
        ,
        {
            "label": "Nikel",
            "value": 66
        }
        ,
        {
            "label": "Alluminum",
            "value": 0
        },
        {
            "label": "Cobalt",
            "value": 98
        }
        ,
        {
            "label": "Gold",
            "value": 55
        }
        ,
        {
            "label": "Pin",
            "value": 88
        }
        ,
        {
            "label": "Tin",
            "value": 44
        },
        {
            "label": "Plastic",
            "value": 55
        },
        {
            "label": "Glass",
            "value": 89
        },
        {
            "label": "Steel",
            "value": 23
        },




    ]
}

    d3charts("Bubble2D", "#bubble", bubbledata);

    var barlinedata = {
    "chart": {
        "caption": "", //Name of the chart Header
        "hiddencaption": "Bar Line Chart",
        "subhiddencaption": "More Info",
        "captionColor":"black", // Color of the Chart Header
         "subcaption": "",
        "subcaptionColor":"blue",
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
         "showlegend":true,
         "tooltipheader":'Date',
        "tickinterval":5,
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "pallattecolor":["#008ee4","#E94C3D","#26AD5E","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
      "colormap":[
    {"name":"Snapdeal",
    "value":"#008ee4"},
       {"name":"Flipkart",
    "value":"#26AD5E"},
     {"name":"Paytm",
    "value":"#E77E22"}
    ],
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
         "barclick":function(data){
    alert(data.label + ' : '+data.value);},
    "bardata":  [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {

            "label": "Snapdeal",
            "value": 20
        },
        {
            "label": "Paytm",
            "value": -50
        },
        {
            "label": "Flipkart",
            "value": 100

        }
           
    ],
     "linedata":   [ // Data Format example for Multi chart Type
        {
            "category": "Snapdeal",
            "label": "01-08-15",
            "value": 23
        },
        { 
            "category": "Snapdeal",
            "label": "02-08-15",
            "value": 12
        },
        {
    
            "category": "Snapdeal",
            "label": "03-08-15",
            "value": 34

        }
        ,
        {
            "category": "Snapdeal",
            "label": "04-08-15",
            "value": 56
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
            "value": 76
        }
        ,
        {
            "category": "Snapdeal",
            "label": "07-08-15",
            "value": 43
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
            "value": 65
        }
        ,
        {
            "category": "Snapdeal",
            "label": "10-08-15",
            "value": -12
        }
        ,
        {
            "category": "Snapdeal",
            "label": "11-08-15",
            "value": 12
        }
        ,
        {
            "category": "Snapdeal",
            "label": "12-08-15",
            "value": -34
        } ,
        {
            "category": "Snapdeal",
            "label": "13-08-15",
            "value": 45
        } ,
        {
            "category": "Snapdeal",
            "label": "14-08-15",
            "value": -90
        },
        {
            "category": "Snapdeal",
            "label": "15-08-15",
            "value": 34
        },
        {
            "category": "Snapdeal",
            "label": "16-08-15",
            "value": 12
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
            "value": 54
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
            "value": -100
        }
        ,
        {
            "category": "Snapdeal",
            "label": "22-08-15",
            "value": 23
        }
        ,
        {
            "category": "Snapdeal",
            "label": "23-08-15",
            "value": 54
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
            "value": -10
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
            "value": 87
        } ,
        {
            "category": "Snapdeal",
            "label": "28-08-15",
            "value": 0
        } ,
        {
            "category": "Snapdeal",
            "label": "29-08-15",
            "value": -23

        },
        {
            "category": "Snapdeal",
            "label": "30-08-15",
            "value": 80

        }, {
             "category": "Paytm",
            "label": "01-08-15",
            "value": 23
        },
        { 
            "category": "Paytm",
            "label": "02-08-15",
            "value": 11
        },
        {
            "category": "Paytm",
            "label": "03-08-15",
            "value": 11

        }
        ,
        {
            "category": "Paytm",
            "label": "04-08-15",
            "value": 76
        }
        ,
        {
            "category": "Paytm",
            "label": "05-08-15",
            "value": -34
        }
        ,
        {
            "category": "Paytm",
            "label": "06-08-15",
            "value": 43
        }
        ,
        {
            "category": "Paytm",
            "label": "07-08-15",
            "value": 0
        }
        ,
        {
            "category": "Paytm",
            "label": "08-08-15",
            "value": -33
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
            "value": -2
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
            "value": 12
        } ,
        {
            "category": "Paytm",
            "label": "14-08-15",
            "value": 45
        },
        {
            "category": "Paytm",
            "label": "15-08-15",
            "value": 23
        },
        {
            "category": "Paytm",
            "label": "16-08-15",
            "value": -90
        },
        {
            "category": "Paytm",
            "label": "17-08-15",
            "value": 0
        },
        {
            "category": "Paytm",
            "label": "18-08-15",
            "value": 54

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
            "value": 34
        }
        ,
        {
            "category": "Paytm",
            "label": "22-08-15",
            "value": 23
        }
        ,
        {
            "category": "Paytm",
            "label": "23-08-15",
            "value": 78
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
            "value": 54
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
            "value": 23
        } ,
        {
            "category": "Paytm",
            "label": "29-08-15",
            "value": 32

        },
        {
            "category": "Paytm",
            "label": "30-08-15",
            "value": 56

        }, {
             "category": "Flipkart",
            "label": "01-08-15",
            "value": 78
        },
        { 
            "category": "Flipkart",
            "label": "02-08-15",
            "value": 54
        },
        {
            "category": "Flipkart",
            "label": "03-08-15",
            "value": -12

        }
        ,
        {
            "category": "Flipkart",
            "label": "04-08-15",
            "value": -10
        }
        ,
        {
            "category": "Flipkart",
            "label": "05-08-15",
            "value": -20
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
            "value": 90
        },
        {
            "category": "Flipkart",
            "label": "09-08-15",
            "value": 23
        }
        ,
        {
            "category": "Flipkart",
            "label": "10-08-15",
            "value": 45
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
            "value": 54
        } ,
        {
            "category": "Flipkart",
            "label": "13-08-15",
            "value": 67
        } ,
        {
            "category": "Flipkart",
            "label": "14-08-15",
            "value": 78
        },
        {
            "category": "Flipkart",
            "label": "15-08-15",
            "value": 43
        },
        {
            "category": "Flipkart",
            "label": "16-08-15",
            "value": -20
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
            "value": -30
        }
        ,
        {
            "category": "Flipkart",
            "label": "22-08-15",
            "value": -50
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
            "value": 100
        }
        ,
        {
            "category": "Flipkart",
            "label": "25-08-15",
            "value": -40
        }
        ,
        {
            "category": "Flipkart",
            "label": "26-08-15",
            "value": 34
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
            "value": -10
        } ,
        {
            "category": "Flipkart",
            "label": "29-08-15",
            "value": 0

        },
        {
            "category": "Flipkart",
            "label": "30-08-15",
            "value": 23

        }


        

    ]
}
    d3charts("BarLine2D", "#barline", barlinedata);

   /* var calenderMultidata = {
        "chart": {
            "caption": "Calender Month Wise Chart", //Name of the chart Header
            "captionColor": "black", // Color of the Chart Header
            "showlegend":true,
            "yaxisname": "", // Name which gets displayed in the Yaxis
            "slant": false, // X axis label slant
            "slantdegree": "90", // Slant based on the degree specified
            "credits": {            // Credits
                "text": "Powered By", // Credit Name
                "color": "#666",
                "imageurl": "../images/logo.png"
            },
            "fillinside": "none", // fill or none
            "pallattecolor": ["#008ee4", "#E94C3D", "#26AD5E", "#E77E22", "#2B80B9", "#F39C11", "#F2C40F", "#179F87", "#2D3E50", "#9045AE", "#5CADE2", "#2ECD71", "#BE3A2B", "#C85600", "#7E8C8D", "#9A59B5", "#34495E", "#BEC3C7", "#EC0000", "#BE3243", "#FF3243", "#BE0043", "#BE32FF", "#CC3243", "#BECC43", "#BE324C", "#f8bd19", "#e44a00", "#008FF4", "#33bdda", "#6baa01", "#583e78"] // Pallette colors for 30 values
        },
        "export": {
            "showexport": true,
            "format": ["-Download-", "jpeg", "png"] //Specify Format to export.Currently support jpeg,png
        },
         "colormap":[
    {"name":"Very Low",
    "value":"#c7001e"},
       {"name":"Low",
    "value":"#f6a580"},
     {"name":"Average",
    "value":"#cccccc"},
      {"name":"High",
    "value":"#92c6db"},
      {"name":"Very High",
    "value":"#086fad"}

    ],
    "calenderyear":[2015,2016],
        "data": [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {"month":'Jan',
          "max":90,
          "values":[10,10,20,30,40,50,60,70,0,90,10,10,20,30,40,50,60,70,80,90,0,10,20,30,40,50,60,70,80,90,50]},
          {"month":'Feb',
          "max":90,
          "values":[13,45,20,30,40,50,60,23,80,90,10,10,20,30,33,0,60,70,80,90,55,10,0,30,40,88,60,70,88,99,50]},
          {"month":'Mar',
          "max":90,
          "values":[10,10,20,0,40,50,60,11,80,90,22,10,20,33,40,50,60,70,55,90,10,10,0,99,40,50,0,70,80,90,50]},
          {"month":'Apr',
          "max":90,
          "values":[10,10,20,0,40,50,60,0,80,90,10,0,20,30,40,50,60,0,80,90,10,10,0,30,40,50,60,70,80,90,50]},
          {"month":'May',
          "max":90,
          "values":[10,10,0,30,40,50,60,70,0,90,10,10,20,30,40,0,0,0,0,90,10,10,0,30,40,50,60,70,80,90,50]},
          {"month":'Jun',
          "max":90,
          "values":[10,45,20,30,0,50,60,0,80,90,0,10,78,30,40,0,60,70,80,90,0,23,20,30,40,50,60,70,80,90,50]},
          {"month":'Jul',
          "max":90,
          "values":[10,10,20,0,0,0,0,70,66,90,10,10,20,30,40,50,60,70,0,90,54,0,0,0,40,50,60,70,80,90,50]},
          {"month":'Aug',
          "max":90,
          "values":[10,10,23,30,0,0,0,70,80,90,0,10,67,30,0,50,60,0,80,90,10,0,54,30,40,0,60,70,80,90,50]},
          {"month":'Sep',
          "max":90,
          "values":[10,10,0,66,0,0,0,70,0,90,10,55,20,30,40,50,60,33,80,0,0,0,0,30,40,50,60,70,80,90,50]},
          {"month":'Oct',
          "max":90,
          "values":[10,10,20,0,77,50,60,70,0,90,10,10,20,30,40,50,0,70,21,90,10,10,0,30,40,55,60,70,0,90,50]},
          {"month":'Nov',
          "max":90,
          "values":[10,10,55,0,40,50,0,70,80,90,10,10,20,0,40,50,55,70,0,90,10,10,0,55,40,50,60,0,80,90,50]},
          {"month":'Dec',
          "max":90,
          "values":[10,10,20,0,40,50,60,70,80,90,10,0,20,4,40,50,0,70,80,90,0,10,20,30,40,0,2,70,80,3,50]}
    ]
    }
    d3charts("CalenderMultiView2D", "#calendermultiview", calenderMultidata);*/


     var calenderSingledata = {
        "chart": {
            "caption": "Calendar Chart", //Name of the chart Header
            "captionColor": "black", // Color of the Chart Header
            "showlegend":true,
            "yaxisname": "", // Name which gets displayed in the Yaxis
            "slant": false, // X axis label slant
            "slantdegree": "90", // Slant based on the degree specified
            "credits": {            // Credits
                "text": "Powered By", // Credit Name
                "color": "#666",
                "imageurl": "../images/logo.png"
            },
            "fillinside": "none", // fill or none
            "pallattecolor": ["#008ee4", "#E94C3D", "#26AD5E", "#E77E22", "#2B80B9", "#F39C11", "#F2C40F", "#179F87", "#2D3E50", "#9045AE", "#5CADE2", "#2ECD71", "#BE3A2B", "#C85600", "#7E8C8D", "#9A59B5", "#34495E", "#BEC3C7", "#EC0000", "#BE3243", "#FF3243", "#BE0043", "#BE32FF", "#CC3243", "#BECC43", "#BE324C", "#f8bd19", "#e44a00", "#008FF4", "#33bdda", "#6baa01", "#583e78"] // Pallette colors for 30 values
        },
        "export": {
            "showexport": true,
            "format": ["-Download-", "jpeg", "png"] //Specify Format to export.Currently support jpeg,png
        },
         "colormap":[
    {"name":"Very Low",
    "value":"#cee1e2"},
       {"name":"Low",
    "value":"#96c3c2"},
     {"name":"Average",
    "value":"#85baba"},
      {"name":"High",
    "value":"#56a1a0"},
      {"name":"Very High",
    "value":"#35908f"}

    ],
    "calenderyear":[2015,2016],
        "data": [ // Specify in label and value pairs for Single Type Charts.Specify category,label and value for Multi type charts
        {"month":'Jan',
          "max":90,
          "values":[10,10,20,30,40,50,60,70,0,90,10,10,20,30,40,50,60,70,80,90,0,10,20,30,40,50,60,70,80,90,50]},
          {"month":'Feb',
          "max":90,
          "values":[13,45,20,30,40,50,60,23,80,90,10,10,20,30,33,0,60,70,80,90,55,10,0,30,40,88,60,70,88,99,50]},
          {"month":'Mar',
          "max":90,
          "values":[10,10,20,0,40,50,60,11,80,90,22,10,20,33,40,50,60,70,55,90,10,10,0,99,40,50,0,70,80,90,50]},
          {"month":'Apr',
          "max":90,
          "values":[10,10,20,0,40,50,60,0,80,90,10,0,20,30,40,50,60,0,80,90,10,10,0,30,40,50,60,70,80,90,50]},
          {"month":'May',
          "max":90,
          "values":[10,10,0,30,40,50,60,70,0,90,10,10,20,30,40,0,0,0,0,90,10,10,0,30,40,50,60,70,80,90,50]},
          {"month":'Jun',
          "max":90,
          "values":[10,45,20,30,0,50,60,0,80,90,0,10,78,30,40,0,60,70,80,90,0,23,20,30,40,50,60,70,80,90,50]},
          {"month":'Jul',
          "max":90,
          "values":[10,10,20,0,0,0,0,70,66,90,10,10,20,30,40,50,60,70,0,90,54,0,0,0,40,50,60,70,80,90,50]},
          {"month":'Aug',
          "max":90,
          "values":[10,10,23,30,0,0,0,70,80,90,0,10,67,30,0,50,60,0,80,90,10,0,54,30,40,0,60,70,80,90,50]},
          {"month":'Sep',
          "max":90,
          "values":[10,10,0,66,0,0,0,70,0,90,10,55,20,30,40,50,60,33,80,0,0,0,0,30,40,50,60,70,80,90,50]},
          {"month":'Oct',
          "max":90,
          "values":[10,10,20,0,77,50,60,70,0,90,10,10,20,30,40,50,0,70,21,90,10,10,0,30,40,55,60,70,0,90,50]},
          {"month":'Nov',
          "max":90,
          "values":[10,10,55,0,40,50,0,70,80,90,10,10,20,0,40,50,55,70,0,90,10,10,0,55,40,50,60,0,80,90,50]},
          {"month":'Dec',
          "max":90,
          "values":[10,10,20,0,40,50,60,70,80,90,10,0,20,4,40,50,0,70,80,90,0,10,20,30,40,0,2,70,80,3,50]}
    ]
    }
    d3charts("CalenderSingleView2D", "#calendersingleview", calenderSingledata);




    var bileveldata = {
     "chart": {
        "caption": "Bilevel Chart",
        "captionColor":"black",
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
        "slantdegree":"65",
        "dynamicheight":true,
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["#de8e43","#dfc133","#e0594b","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"]
    },
    "colormap":[
    {"name":"Highest",
    "value":"#c7001e"},
       {"name":"Equal",
    "value":"#f6a580"},
     {"name":"Lowest",
    "value":"#92c6db"}
    ],
          "click":function(data){
    alert(data[0].label);},
    "data": [
        {
            "label": "Electronic",
            "value": 11.234,
            "category":"Highest"
        },
        {
            "label": "Electronic",
            "value": 22.223423,
             "category":"Equal"
        },
        {
            "label": "Electronic",
            "value": 33.567567,
            "category":"Lowest"

        }
        ,
        {
            "label": "Watch",
            "value": 44,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch",
            "value": 55,
             "category":"Equal"
        }
        ,
        {
            "label": "Watch",
            "value": 12,
            "category":"Lowest"
        }
        ,
        {
            "label": "Shoe",
            "value": 77,
             "category":"Highest"
        }
        ,
        {
            "label": "Shoe",
            "value": 88,
             "category":"Equal"
        },
        {
            "label": "Shoe",
            "value": 99,
            "category":"Lowest"
        }
        ,
        {
            "label": "bag",
            "value": 100,
             "category":"Highest"
        }
        ,
        {
            "label": "bag",
            "value": 200,
             "category":"Equal"
        },
        {
            "label": "bag",
            "value": 50,
            "category":"Lowest"
        }
         ,
        {
            "label": "fitness equipments",
            "value": 100,
            "category":"Highest"
        }
        ,
        {
            "label": "fitness equipments",
            "value": 200,
             "category":"Equal"
        },
        {
            "label": "fitness equipments",
            "value": 50,
            "category":"Lowest"
        }
        ,
        {
            "label": "T shirt",
            "value": 100,
            "category":"Highest"
        }
        ,
        {
            "label": "T shirt",
            "value": 200,
            "category":"Equal"
        },
        {
            "label": "T shirt",
            "value": 50,
            "category":"Lowest"
        } ,
        {
            "label": "Jean",
            "value": 34,
            "category":"Highest"
        }
        ,
        {
            "label": "Jean",
            "value": 56,
            "category":"Equal"
        },
        {
            "label": "Jean",
            "value": 78,
            "category":"Lowest"
        }
         ,
        {
            "label": "Watch for Men",
            "value": 32,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch for Men",
            "value": 134,
            "category":"Equal"
        },
        {
            "label": "Watch for Men",
            "value": 12,
            "category":"Lowest"
        } ,
        {
            "label": "Watch for Women",
            "value": 12,
            "category":"Highest"
        }
        ,
        {
            "label": "Watch for Women",
            "value": 34,
            "category":"Equal"
        },
        {
            "label": "Watch for Women",
            "value": 56,
            "category":"Lowest"
        }
    ]
}

    d3charts("Bilevel2D", "#bilevel", bileveldata);


      var hourlydata = {
     "chart": {
        "caption": "",
        "captionColor":"black",
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "backgroundcolor":"#4a4a4a",
        "textcolor":'white',
        "yaxisname": "",
        "color":"white",
        "fontsize":15,
        "showlegend":true,
        "slant":false,
        "twoxaxis":false,
        "slantdegree":"65",
        "dynamicheight":true,
        "valuerank":true,
        "maxrank":1,
        "lowrank":0,
        "weekstartdate":"2015-12-09",
        "credits":{
               "text":"Powered By",
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
        "pallattecolorsingle":true, // if set to True: Only First Value is Considered ; if set to False all values in the Pallate is considered
         "pallattecolor":["green","red","#e0594b","#E77E22","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"]
    },
        "colormap":[
    {"name":"Less",
    "value":"green"},
       {"name":"High",
    "value":"red"},
       {"name":"N/A",
    "value":"lightgrey"}
    ],
          "click":function(data){
    alert(data[0].label);},
    "data":[{"day":"3","hour":1,"value":0},{"day":"3","hour":2,"value":0},{"day":"3","hour":3,"value":0},{"day":"3","hour":4,"value":0},{"day":"3","hour":5,"value":0},{"day":"3","hour":6,"value":0},{"day":"3","hour":7,"value":0},{"day":"3","hour":8,"value":0},{"day":"3","hour":9,"value":0},{"day":"3","hour":10,"value":0},{"day":"3","hour":11,"value":0},{"day":"3","hour":12,"value":0},{"day":"3","hour":13,"value":0},{"day":"3","hour":14,"value":0},{"day":"3","hour":15,"value":0},{"day":"3","hour":16,"value":0},{"day":"3","hour":17,"value":0},{"day":"3","hour":18,"value":0},{"day":"3","hour":19,"value":0},{"day":"3","hour":20,"value":0},{"day":"3","hour":21,"value":0},{"day":"3","hour":22,"value":0},{"day":"3","hour":23,"value":0},{"day":"3","hour":24,"value":0},{"day":"4","hour":1,"value":0},{"day":"4","hour":2,"value":0},{"day":"4","hour":3,"value":0},{"day":"4","hour":4,"value":0},{"day":"4","hour":5,"value":0},{"day":"4","hour":6,"value":0},{"day":"4","hour":7,"value":0},{"day":"4","hour":8,"value":0},{"day":"4","hour":9,"value":0},{"day":"4","hour":10,"value":0},{"day":"4","hour":11,"value":0},{"day":"4","hour":12,"value":0},{"day":"4","hour":13,"value":0},{"day":"4","hour":14,"value":0},{"day":"4","hour":15,"value":0},{"day":"4","hour":16,"value":0},{"day":"4","hour":17,"value":0},{"day":"4","hour":18,"value":0},{"day":"4","hour":19,"value":0},{"day":"4","hour":20,"value":0},{"day":"4","hour":21,"value":0},{"day":"4","hour":22,"value":0},{"day":"4","hour":23,"value":0},{"day":"4","hour":24,"value":0},{"day":"5","hour":1,"value":0},{"day":"5","hour":2,"value":0},{"day":"5","hour":3,"value":0},{"day":"5","hour":4,"value":0},{"day":"5","hour":5,"value":0},{"day":"5","hour":6,"value":0},{"day":"5","hour":7,"value":0},{"day":"5","hour":8,"value":0},{"day":"5","hour":9,"value":0},{"day":"5","hour":10,"value":0},{"day":"5","hour":11,"value":0},{"day":"5","hour":12,"value":0},{"day":"5","hour":13,"value":0},{"day":"5","hour":14,"value":0},{"day":"5","hour":15,"value":0},{"day":"5","hour":16,"value":0},{"day":"5","hour":17,"value":0},{"day":"5","hour":18,"value":0},{"day":"5","hour":19,"value":0},{"day":"5","hour":20,"value":0},{"day":"5","hour":21,"value":0},{"day":"5","hour":22,"value":0},{"day":"5","hour":23,"value":0},{"day":"5","hour":24,"value":0},{"day":"6","hour":1,"value":0},{"day":"6","hour":2,"value":0},{"day":"6","hour":3,"value":0},{"day":"6","hour":4,"value":0},{"day":"6","hour":5,"value":0},{"day":"6","hour":6,"value":0},{"day":"6","hour":7,"value":0},{"day":"6","hour":8,"value":0},{"day":"6","hour":9,"value":0},{"day":"6","hour":10,"value":0},{"day":"6","hour":11,"value":0},{"day":"6","hour":12,"value":0},{"day":"6","hour":13,"value":0},{"day":"6","hour":14,"value":0},{"day":"6","hour":15,"value":0},{"day":"6","hour":16,"value":0},{"day":"6","hour":17,"value":0},{"day":"6","hour":18,"value":0},{"day":"6","hour":19,"value":0},{"day":"6","hour":20,"value":0},{"day":"6","hour":21,"value":0},{"day":"6","hour":22,"value":0},{"day":"6","hour":23,"value":0},{"day":"6","hour":24,"value":0},{"day":"7","hour":1,"value":0},{"day":"7","hour":2,"value":0},{"day":"7","hour":3,"value":0},{"day":"7","hour":4,"value":0},{"day":"7","hour":5,"value":0},{"day":"7","hour":6,"value":0},{"day":"7","hour":7,"value":0},{"day":"7","hour":8,"value":0},{"day":"7","hour":9,"value":0},{"day":"7","hour":10,"value":0},{"day":"7","hour":11,"value":0},{"day":"7","hour":12,"value":0},{"day":"7","hour":13,"value":0},{"day":"7","hour":14,"value":0},{"day":"7","hour":15,"value":0},{"day":"7","hour":16,"value":0},{"day":"7","hour":17,"value":0},{"day":"7","hour":18,"value":0},{"day":"7","hour":19,"value":0},{"day":"7","hour":20,"value":0},{"day":"7","hour":21,"value":0},{"day":"7","hour":22,"value":0},{"day":"7","hour":23,"value":0},{"day":"7","hour":24,"value":0},{"day":"1","hour":1,"value":0},{"day":"1","hour":2,"value":0},{"day":"1","hour":3,"value":0},{"day":"1","hour":4,"value":0},{"day":"1","hour":5,"value":0},{"day":"1","hour":6,"value":0},{"day":"1","hour":7,"value":0},{"day":"1","hour":8,"value":0},{"day":"1","hour":9,"value":0},{"day":"1","hour":10,"value":0},{"day":"1","hour":11,"value":0},{"day":"1","hour":12,"value":0},{"day":"1","hour":13,"value":0},{"day":"1","hour":14,"value":0},{"day":"1","hour":15,"value":0},{"day":"1","hour":16,"value":0},{"day":"1","hour":17,"value":0},{"day":"1","hour":18,"value":0},{"day":"1","hour":19,"value":0},{"day":"1","hour":20,"value":0},{"day":"1","hour":21,"value":0},{"day":"1","hour":22,"value":0},{"day":"1","hour":23,"value":0},{"day":"1","hour":24,"value":0},{"day":"2","hour":1,"value":0},{"day":"2","hour":2,"value":0},{"day":"2","hour":3,"value":0},{"day":"2","hour":4,"value":0},{"day":"2","hour":5,"value":0},{"day":"2","hour":6,"value":0},{"day":"2","hour":7,"value":0},{"day":"2","hour":8,"value":0},{"day":"2","hour":9,"value":0},{"day":"2","hour":10,"value":0},{"day":"2","hour":11,"value":0},{"day":"2","hour":12,"value":0},{"day":"2","hour":13,"value":0},{"day":"2","hour":14,"value":0},{"day":"2","hour":15,"value":0},{"day":"2","hour":16,"value":1},{"day":"2","hour":17,"value":0}] 
    }

    d3charts("WeekHour2D", "#weekhour", hourlydata);



    var pricing = {
    "chart": {
        "caption": "Pricing chart", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
         "subcaption": "More Info",
        "subcaptionColor":"black",
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#ff3232","#ff7f7f","#00b200","#004c00","#2B80B9","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
    "rectheight":50,
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
    "data":  [
        {

            "label": "Snapdeal",
            "value": 10
        },
         {

            "label": "shopclues",
            "value": 15
        },
        {
            "label": "flipkart",
            "value": 23,
            "flag":true
        },
        {
            "label": "Amazon",
            "value": 67

        }
        ,
        {
            "label": "Rediff",
            "value": 87
        }
        ,
        {
            "label": "Paytm",
            "value": 100
        }
      


        

    ]
}
    d3charts("Pricing2D", "#pricing", pricing);


     var multipledonut = {
    "chart": {
        "caption": "Discount distribution of product by category", //Name of the chart Header
        "captionColor":"white", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#50e2c2","#f5a623","#8b572a"] // Pallette colors for 30 values
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
    "data":  [
        {
           "category": "Electronics",
            "arrowhead" : 'top',
            "arrowcolor" : 'red',
            "data":[
                    {'label':'Snapdeal',
                     'value':50
                     },
                     {'label':'Amazon',
                     'value':50
                     },
                     {'label':'Paytm',
                     'value':100
                     }
                    ] 
        },
        {
           "category": "Apparel",
            "arrowhead" : 'bottom',
            "arrowcolor" : 'green',
            "data":[
                    {'label':'Snapdeal',
                     'value':100
                     },
                     {'label':'Amazon',
                     'value':50
                     },
                     {'label':'Paytm',
                     'value':20
                     }
                    ] 
        },
        {
           "category": "Clothing",
            "arrowhead" : 'top',
            "arrowcolor" : 'green',
            "data":[
                    {'label':'Snapdeal',
                     'value':20
                     },
                     {'label':'Amazon',
                     'value':50
                     },
                     {'label':'Paytm',
                     'value':100
                     }
                    ] 
        },
        {
           "category": "Footwear",
            "arrowhead" : 'bottom',
            "arrowcolor" : 'red',
            "data":[
                    {'label':'Snapdeal',
                     'value':89
                     },
                     {'label':'Amazon',
                     'value':100
                     },
                     {'label':'Paytm',
                     'value':50
                     }
                    ] 
        },
        {
           "category": "Accesories",
            "arrowhead" : 'bottom',
            "arrowcolor" : 'green',
            "data":[
                    {'label':'Snapdeal',
                     'value':20
                     },
                     {'label':'Amazon',
                     'value':100
                     },
                     {'label':'Paytm',
                     'value':50
                     }
                    ] 
        }                       
    ]
}
    d3charts("MultiDonut2D", "#multidonut", multipledonut);

    var custombar = {
    "chart": {
        "caption": "Top brands by discount", //Name of the chart Header
        "captionColor":"#727272", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
          //"credits":{            // Credits
         //   "text":"Powered By", // Credit Name
         //   "color":"#666",
         //   "imageurl":"../images/logo.png"
        //},
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#fcb249","#c2d661","#3ecfc1","#599bf0","#fe949e","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
    "rectheight":50,
    "export":{
        "showexport": true,
         "format": ["Download","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
    "data":  [
        {

            "label": "Snapdeal",
            "value": 99,
            "type":'up',
            "denomination":'plus'
        },
         {

            "label": "shopclues",
            "value": 3,
            "type":'down',
            "denomination":'plus'
        },
        {
            "label": "flipkart",
            "value": 50,
            "type":'up',
            "denomination":'minus'
        },
        {
            "label": "Amazon",
            "value": 100,
            "type":'down',
            "denomination":'plus'

        }
        ,
        {
            "label": "Rediff",
            "value": 75,
            "type":'down',
            "denomination":'minus'
        }          
    ]
}
    d3charts("CustomBar2D", "#custombar", custombar);



var customverticalbar = {
    "chart": {
        "caption": "Top brands by discount", //Name of the chart Header
        "captionColor":"#727272", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
          //"credits":{            // Credits
         //   "text":"Powered By", // Credit Name
         //   "color":"#666",
         //   "imageurl":"../images/logo.png"
        //},
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#fcb249","#c2d661","#3ecfc1","#599bf0","#fe949e","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
    "rectheight":50,
    "export":{
        "showexport": true,
         "format": ["Download","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },
    "data":  [
        {

            "label": "Snapdeal",
            "value": 99,
            "type":'up',
            "denomination":'plus'
        },
         {

            "label": "shopclues",
            "value": 3,
            "type":'down',
            "denomination":'plus'
        },
        {
            "label": "flipkart",
            "value": 50,
            "type":'up',
            "denomination":'minus'
        },
        {
            "label": "Amazon",
            "value": 100,
            "type":'down',
            "denomination":'plus'

        }
        ,
        {
            "label": "Rediff",
            "value": 75,
            "type":'down',
            "denomination":'minus'
        }          
    ]
}
    d3charts("CustomVerticalBar2D", "#customverticalbar", customverticalbar);


    var customcolumn = {
    "chart": {
        "caption": "% of Products Discounted", //Name of the chart Header
        "captionColor":"#727272", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
         // "credits":{            // Credits
          //  "text":"Powered By", // Credit Name
         //   "color":"#666",
          //  "imageurl":"../images/logo.png"
       // },
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#7277d5","#3bb0d9","#d8434e","#b1c252","#f5ba42","#F39C11","#F2C40F","#179F87","#2D3E50","#9045AE","#5CADE2","#2ECD71","#BE3A2B"     ,"#C85600","#7E8C8D","#9A59B5","#34495E","#BEC3C7","#EC0000","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008FF4","#33bdda","#6baa01","#583e78"] // Pallette colors for 30 values
    },
    "rectheight":50,
    "export":{
        "showexport": true,
         "format": ["Download","jpeg","png"] //Specify Format to export.Currently support jpeg,png
    },

    "data":  [
        {

            "label": "Snapdeal(10.03)",
            "value": 99,
            "type":'up',
            "denomination":'plus'
        },
         {

            "label": "Shopclues(40.23)",
            "value": 10,
            "type":'down',
            "denomination":'minus'
        },
        {
            "label": "Flipkart(12.0)",
            "value": 50,
            "type":'down',
            "denomination":'minus'
        },
        {
            "label": "Amazon(7.89)",
            "value": 100,
            "type":'up',
            "denomination":'plus'

        }
        ,
        {
            "label": "Rediff(66.55)",
            "value": 75,
            "type":'up',
            "denomination":'minus'
        }          
    ]
}
    d3charts("CustomColumn2D", "#customcolumn", customcolumn);





     var groupbar = {
    "chart": {
        "caption": "Group bar", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
        "showlegend":true,
        "tooltipheader":'CATEGORY',
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] // Pallette colors for 30 values
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"], //Specify Format to export.Currently support jpeg,png
         "filename":"groupchart"
    },
    "data":  [
{
category: "2016-5-3",
data: [ ]
},
{
category: "2016-5-4",
data: [ ]
},
{
category: "2016-5-5",
data: [
{
label: "Amazon",
value: 83
},
{
label: "PaytmEffective-IN",
value: 5
},
{
label: "SnapDeal",
value: 33
},
{
label: "Paytm",
value: 5
},
{
label: "Flipkart",
value: 84
}
]
},
{
category: "2016-5-6",
data: [ ]
},
{
category: "2016-5-7",
data: [ ]
},
{
category: "2016-5-8",
data: [ ]
},
{
category: "2016-5-9",
data: [ ]
}
]
}
    d3charts("GroupBar2D", "#groupbar", groupbar);



var groupbarcustom = {
    "chart": {
        "caption": "Discount distribution of product by category", //Name of the chart Header
        "captionColor":"#727272", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
        "showlegend":true,
        "tooltipheader":'CATEGORY',
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#dee2a1", "#f39684", "#d3eee7", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] // Pallette colors for 30 values
    },
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"], //Specify Format to export.Currently support jpeg,png
         "filename":"groupchart"
    },
    "data":  [
{
        category: "Clothing",
        data: [ 
              {
              label: "0-30",
              value: 83
              },
              {
              label: "30-60",
              value: 5
              },
              {
              label: "60-90",
              value: 33
              }
              ]
},
{
category: "Mobile",
        data: [ 
              {
              label: "0-30",
              value: 23
              },
              {
              label: "30-60",
              value: 9
              },
              {
              label: "60-90",
              value: 65
              }
              ]
},
{
category: "Electronics",
        data: [ 
              {
              label: "0-30",
              value: 34
              },
              {
              label: "30-60",
              value: 67
              },
              {
              label: "60-90",
              value: 32
              }
              ]
},
{
category: "Accesories",
        data: [ 
              {
              label: "0-30",
              value: 4
              },
              {
              label: "30-60",
              value: 8
              },
              {
              label: "60-90",
              value: 12
              }
              ]
},
{
category: "Footwear",
        data: [ 
              {
              label: "0-30",
              value: 34
              },
              {
              label: "30-60",
              value: 67
              },
              {
              label: "60-90",
              value: 32
              }
              ]
}
]
}
    d3charts("GroupBar2D", "#groupbarcustom", groupbarcustom);


    var groupbarneg = {
    "chart": {
        "caption": "Negative Group bar", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
        "showlegend":true,
        "tooltipheader":'CATEGORY',
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] // Pallette colors for 30 values
    },
    
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"], //Specify Format to export.Currently support jpeg,png
         "filename":"Negativegroupchart"
    },
    "data":  [
        {
           "category": "Electronics",
            "data":[
                    {'label':'Snapdeal',
                     'value':50
                     },
                     {'label':'Amazon',
                     'value':50
                     },
                     {'label':'Paytm',
                     'value':100
                     },
                     {'label':'Shopclues',
                     'value':45
                     },
                     {'label':'Jabong',
                     'value':23
                     },
                     {'label':'Flipkart',
                     'value':87
                     },
                     {'label':'Rediff',
                     'value':45
                     }
                    ] 
        },
        {
           "category": "Apparel",
            "data":[
                    {'label':'Snapdeal',
                     'value':100
                     },
                     {'label':'Amazon',
                     'value':50
                     },
                     {'label':'Paytm',
                     'value':20
                     },
                     {'label':'Shopclues',
                     'value':66
                     },
                     {'label':'Jabong',
                     'value':22
                     },
                     {'label':'Flipkart',
                     'value':99
                     },
                     {'label':'Rediff',
                     'value':33
                     }
                    ] 
        },
        {
           "category": "Clothing",
            "data":[
                    {'label':'Snapdeal',
                     'value':-20
                     },
                     {'label':'Amazon',
                     'value':-50
                     },
                     {'label':'Paytm',
                     'value':-100
                     },
                     {'label':'Shopclues',
                     'value':-67
                     },
                     {'label':'Jabong',
                     'value':-11
                     },
                     {'label':'Flipkart',
                     'value':-9
                     },
                     {'label':'Rediff',
                     'value':-55
                     }
                    ] 
        },
        {
           "category": "Footwear",
            "data":[
                    {'label':'Snapdeal',
                     'value':89
                     },
                     {'label':'Amazon',
                     'value':100
                     },
                     {'label':'Paytm',
                     'value':50
                     },
                     {'label':'Shopclues',
                     'value':23
                     },
                     {'label':'Jabong',
                     'value':56
                     },
                     {'label':'Flipkart',
                     'value':32
                     },
                     {'label':'Rediff',
                     'value':90
                     }
                    ] 
        },
        {
           "category": "Accesories",
            "data":[
                    {'label':'Snapdeal',
                     'value':20
                     },
                     {'label':'Amazon',
                     'value':10
                     },
                     {'label':'Paytm',
                     'value':50
                     },
                     {'label':'Shopclues',
                     'value':100
                     },
                     {'label':'Jabong',
                     'value':23
                     },
                     {'label':'Flipkart',
                     'value':66
                     },
                     {'label':'Rediff',
                     'value':33
                     }
                    ] 
        }                       
    ]
}
    d3charts("GroupBar2D", "#groupbarneg", groupbarneg);

     var multiseriesrange = {
    "chart": {
        "caption": "Multi Series Range chart", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
        "showlegend":true,
        "tooltipheader":'CATEGORY',
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["red", "blue", "green", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] // Pallette colors for 30 values
    },
    
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"], //Specify Format to export.Currently support jpeg,png
         "filename":"multiseriesrange"
    },
    "data":  [
        {
           "category": "Snapdeal",
            "data":[
                     {'label':'201604010000',
                     'value':21
                     },
                    {'label':'201604010222',
                     'value':54
                     },
                     {'label':'201604012230',
                     'value':33
                     },
                     {'label':'201604020000',
                     'value':88
                     },
                     {'label':'201604030000',
                     'value':23
                     },
                     {'label':'201604031345',
                     'value':77
                     },
                     {'label':'201604040000',
                     'value':33
                     },
                     {'label':'201604050000',
                     'value':55
                     },
                     {'label':'201604060000',
                     'value':99
                     },
                     {'label':'201604070000',
                     'value':54
                     },
                     {'label':'201604080000',
                     'value':12
                     },
                     {'label':'201604090000',
                     'value':34
                     },
                     {'label':'201604100000',
                     'value':78
                     },
                     {'label':'201604110000',
                     'value':65
                     },
                     {'label':'201604120000',
                     'value':0
                     },
                     {'label':'201604130000',
                     'value':0
                     },
                     {'label':'201604140000',
                     'value':0
                     },
                     {'label':'201604150000',
                     'value':55
                     },
                     {'label':'201604160000',
                     'value':66
                     },
                     {'label':'201604170000',
                     'value':76
                     },
                     {'label':'201604180000',
                     'value':12
                     },
                     {'label':'201604190000',
                     'value':74
                     },
                     {'label':'201604200000',
                     'value':23
                     },
                     {'label':'201604210000',
                     'value':12
                     },
                     {'label':'201604220000',
                     'value':44
                     },
                     {'label':'201604230000',
                     'value':88
                     },
                     {'label':'201604240000',
                     'value':99
                     },
                     {'label':'201604250000',
                     'value':65
                     },
                     {'label':'201604260000',
                     'value':43
                     },
                     {'label':'201604270000',
                     'value':32
                     },
                     {'label':'201604280000',
                     'value':56
                     },
                     {'label':'201604290000',
                     'value':11
                     },
                     {'label':'201604290900',
                     'value':77
                     },
                     {'label':'201604291500',
                     'value':11
                     },
                     {'label':'201604300000',
                     'value':22
                     }
                    ] 
        },
        {
           "category": "Paytm",
            "data":[
                    {'label':'201604010000',
                     'value':11
                     },
                    {'label':'201604010222',
                     'value':23
                     },
                     {'label':'201604012230',
                     'value':0
                     },
                     {'label':'201604020000',
                     'value':100
                     },
                     {'label':'201604030000',
                     'value':45
                     },
                     {'label':'201604031345',
                     'value':23
                     },
                     {'label':'201604040000',
                     'value':87
                     },
                     {'label':'201604050000',
                     'value':33
                     },
                     {'label':'201604060000',
                     'value':10
                     },
                     {'label':'201604070000',
                     'value':87
                     },
                     {'label':'201604080000',
                     'value':54
                     },
                     {'label':'201604090000',
                     'value':32
                     },
                     {'label':'201604100000',
                     'value':45
                     },
                     {'label':'201604110000',
                     'value':45
                     },
                     {'label':'201604120000',
                     'value':67
                     },
                     {'label':'201604130000',
                     'value':89
                     },
                     {'label':'201604140000',
                     'value':90
                     },
                     {'label':'201604150000',
                     'value':76
                     },
                     {'label':'201604160000',
                     'value':54
                     },
                     {'label':'201604170000',
                     'value':32
                     },
                     {'label':'201604180000',
                     'value':12
                     },
                     {'label':'201604190000',
                     'value':54
                     },
                     {'label':'201604200000',
                     'value':67
                     },
                     {'label':'201604210000',
                     'value':43
                     },
                     {'label':'201604220000',
                     'value':88
                     },
                     {'label':'201604230000',
                     'value':43
                     },
                     {'label':'201604240000',
                     'value':66
                     },
                     {'label':'201604250000',
                     'value':33
                     },
                     {'label':'201604260000',
                     'value':22
                     },
                     {'label':'201604270000',
                     'value':11
                     },
                     {'label':'201604280000',
                     'value':33
                     },
                     {'label':'201604290000',
                     'value':45
                     },
                     {'label':'201604290900',
                     'value':22
                     },
                     {'label':'201604291500',
                     'value':45
                     },
                     {'label':'201604300000',
                     'value':12
                     }
                    ] 
        },
        {
           "category": "Flipkart",
            "data":[
                    {'label':'201604010000',
                     'value':55
                     },
                    {'label':'201604010222',
                     'value':7
                     },
                     {'label':'201604012230',
                     'value':5
                     },
                     {'label':'201604020000',
                     'value':88
                     },
                     {'label':'201604030000',
                     'value':66
                     },
                     {'label':'201604031345',
                     'value':0
                     },
                     {'label':'201604040000',
                     'value':34
                     },
                     {'label':'201604050000',
                     'value':34
                     },
                     {'label':'201604060000',
                     'value':23
                     },
                     {'label':'201604070000',
                     'value':55
                     },
                     {'label':'201604080000',
                     'value':99
                     },
                     {'label':'201604090000',
                     'value':65
                     },
                     {'label':'201604100000',
                     'value':55
                     },
                     {'label':'201604110000',
                     'value':44
                     },
                     {'label':'201604120000',
                     'value':33
                     },
                     {'label':'201604130000',
                     'value':32
                     },
                     {'label':'201604140000',
                     'value':45
                     },
                     {'label':'201604150000',
                     'value':32
                     },
                     {'label':'201604160000',
                     'value':67
                     },
                     {'label':'201604170000',
                     'value':87
                     },
                     {'label':'201604180000',
                     'value':54
                     },
                     {'label':'201604190000',
                     'value':54
                     },
                     {'label':'201604200000',
                     'value':45
                     },
                     {'label':'201604210000',
                     'value':66
                     },
                     {'label':'201604220000',
                     'value':88
                     },
                     {'label':'201604230000',
                     'value':99
                     },
                     {'label':'201604240000',
                     'value':44
                     },
                     {'label':'201604250000',
                     'value':33
                     },
                     {'label':'201604260000',
                     'value':22
                     },
                     {'label':'201604270000',
                     'value':66
                     },
                     {'label':'201604280000',
                     'value':55
                     },
                     {'label':'201604290000',
                     'value':88
                     },
                     {'label':'201604290900',
                     'value':88
                     },
                     {'label':'201604291500',
                     'value':88
                     },
                     {'label':'201604300000',
                     'value':33
                     }
                    ] 
        }                       
    ]
}
    d3charts("MultiSeriesRange2D", "#multiseriesrange", multiseriesrange);


     var boxplot = {
    "chart": {
        "caption": "Box Plot chart", //Name of the chart Header
        "captionColor":"black", // Color of the Chart Header
        "yaxisname": "", // Name which gets displayed in the Yaxis
        "slant":false, // X axis label slant
        "slantdegree":"90", // Slant based on the degree specified
        "showlegend":true,
        "tooltipheader":'CATEGORY',
          "credits":{            // Credits
            "text":"Powered By", // Credit Name
            "color":"#666",
            "imageurl":"../images/logo.png"
        },
         "suffix":'%',
          "tickinterval":5, // Number of label visible in the X axis
         "pallattecolor":["red", "blue", "green", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] // Pallette colors for 30 values
    },
    
    "export":{
        "showexport": true,
         "format": ["-Download-","jpeg","png"], //Specify Format to export.Currently support jpeg,png
         "filename":"boxplot"
    },
    "colormap":[
    {"name":"lowest",
    "value":"#6baed6"},
       {"name":"highest",
    "value":"#3182bd"},
       {"name":"median",
    "value":"#000"}
    ],
    "data":  [
        {
           "category": "addidas",
            "data":[

                     {'label':'Product1',
                     'value':77
                     },
                     {'label':'Product2',
                     'value':33
                     },
                     {'label':'Product3',
                     'value':55
                     },
                     {'label':'Product4',
                     'value':99
                     },
                     {'label':'Product5',
                     'value':54
                     },
                     {'label':'Product6',
                     'value':12
                     },
                     {'label':'Product7',
                     'value':34
                     },
                     {'label':'Product8',
                     'value':78
                     },
                     {'label':'Product9',
                     'value':65
                     },
                     {'label':'Product10',
                     'value':0
                     },
                     {'label':'Product11',
                     'value':0
                     },
                     {'label':'Product12',
                     'value':0
                     },
                     {'label':'Product13',
                     'value':55
                     },
                     {'label':'Product14',
                     'value':66
                     },
                     {'label':'Product15',
                     'value':76
                     },
                     {'label':'Product16',
                     'value':12
                     },
                     {'label':'Product17',
                     'value':74
                     },
                     {'label':'Product18',
                     'value':23
                     },
                     {'label':'Product19',
                     'value':12
                     },
                     {'label':'Product20',
                     'value':44
                     },
                     {'label':'Product21',
                     'value':88
                     },
                     {'label':'Product22',
                     'value':99
                     },
                     {'label':'Product23',
                     'value':65
                     },
                     {'label':'Product24',
                     'value':43
                     },
                     {'label':'Product25',
                     'value':32
                     },
                     {'label':'Product26',
                     'value':56
                     },
                     {'label':'Product27',
                     'value':11
                     },
                     {'label':'Product28',
                     'value':77
                     },
                     {'label':'Product29',
                     'value':11
                     },
                     {'label':'Product30',
                     'value':22
                     }
                    ] 
        },
        {
           "category": "puma",
            "data":[
                    {'label':'Product1',
                     'value':12
                     },
                     {'label':'Product2',
                     'value':55
                     },
                     {'label':'Product3',
                     'value':76
                     },
                     {'label':'Product4',
                     'value':32
                     },
                     {'label':'Product5',
                     'value':88
                     },
                     {'label':'Product6',
                     'value':43
                     },
                     {'label':'Product7',
                     'value':66
                     },
                     {'label':'Product8',
                     'value':78
                     },
                     {'label':'Product9',
                     'value':34
                     },
                     {'label':'Product10',
                     'value':0
                     },
                     {'label':'Product11',
                     'value':0
                     },
                     {'label':'Product12',
                     'value':0
                     },
                     {'label':'Product13',
                     'value':7
                     },
                     {'label':'Product14',
                     'value':3
                     },
                     {'label':'Product15',
                     'value':89
                     },
                     {'label':'Product16',
                     'value':12
                     },
                     {'label':'Product17',
                     'value':22
                     },
                     {'label':'Product18',
                     'value':88
                     },
                     {'label':'Product19',
                     'value':32
                     },
                     {'label':'Product20',
                     'value':44
                     },
                     {'label':'Product21',
                     'value':74
                     },
                     {'label':'Product22',
                     'value':12
                     },
                     {'label':'Product23',
                     'value':65
                     },
                     {'label':'Product24',
                     'value':10
                     },
                     {'label':'Product25',
                     'value':32
                     },
                     {'label':'Product26',
                     'value':4
                     },
                     {'label':'Product27',
                     'value':61
                     },
                     {'label':'Product28',
                     'value':45
                     },
                     {'label':'Product29',
                     'value':78
                     },
                     {'label':'Product30',
                     'value':32
                     }
                    ] 
        },
        {
           "category": "reebok",
            "data":[
                    {'label':'Product1',
                     'value':77
                     },
                     {'label':'Product2',
                     'value':56
                     },
                     {'label':'Product3',
                     'value':11
                     },
                     {'label':'Product4',
                     'value':4
                     },
                     {'label':'Product5',
                     'value':9
                     },
                     {'label':'Product6',
                     'value':4
                     },
                     {'label':'Product7',
                     'value':56
                     },
                     {'label':'Product8',
                     'value':23
                     },
                     {'label':'Product9',
                     'value':56
                     },
                     {'label':'Product10',
                     'value':0
                     },
                     {'label':'Product11',
                     'value':0
                     },
                     {'label':'Product12',
                     'value':0
                     },
                     {'label':'Product13',
                     'value':45
                     },
                     {'label':'Product14',
                     'value':88
                     },
                     {'label':'Product15',
                     'value':11
                     },
                     {'label':'Product16',
                     'value':45
                     },
                     {'label':'Product17',
                     'value':76
                     },
                     {'label':'Product18',
                     'value':44
                     },
                     {'label':'Product19',
                     'value':55
                     },
                     {'label':'Product20',
                     'value':98
                     },
                     {'label':'Product21',
                     'value':65
                     },
                     {'label':'Product22',
                     'value':12
                     },
                     {'label':'Product23',
                     'value':45
                     },
                     {'label':'Product24',
                     'value':65
                     },
                     {'label':'Product25',
                     'value':32
                     },
                     {'label':'Product26',
                     'value':56
                     },
                     {'label':'Product27',
                     'value':32
                     },
                     {'label':'Product28',
                     'value':78
                     },
                     {'label':'Product29',
                     'value':54
                     },
                     {'label':'Product30',
                     'value':67
                     }
                    ] 
        },
        {
           "category": "fila",
            "data":[
                    {'label':'Product1',
                     'value':23
                     },
                     {'label':'Product2',
                     'value':45
                     },
                     {'label':'Product3',
                     'value':67
                     },
                     {'label':'Product4',
                     'value':43
                     },
                     {'label':'Product5',
                     'value':67
                     },
                     {'label':'Product6',
                     'value':89
                     },
                     {'label':'Product7',
                     'value':54
                     },
                     {'label':'Product8',
                     'value':43
                     },
                     {'label':'Product9',
                     'value':56
                     },
                     {'label':'Product10',
                     'value':34
                     },
                     {'label':'Product11',
                     'value':56
                     },
                     {'label':'Product12',
                     'value':23
                     },
                     {'label':'Product13',
                     'value':87
                     },
                     {'label':'Product14',
                     'value':65
                     },
                     {'label':'Product15',
                     'value':54
                     },
                     {'label':'Product16',
                     'value':55
                     },
                     {'label':'Product17',
                     'value':88
                     },
                     {'label':'Product18',
                     'value':66
                     },
                     {'label':'Product19',
                     'value':99
                     },
                     {'label':'Product20',
                     'value':54
                     },
                     {'label':'Product21',
                     'value':65
                     },
                     {'label':'Product22',
                     'value':34
                     },
                     {'label':'Product23',
                     'value':54
                     },
                     {'label':'Product24',
                     'value':67
                     },
                     {'label':'Product25',
                     'value':65
                     },
                     {'label':'Product26',
                     'value':43
                     },
                     {'label':'Product27',
                     'value':89
                     },
                     {'label':'Product28',
                     'value':54
                     },
                     {'label':'Product29',
                     'value':43
                     },
                     {'label':'Product30',
                     'value':32
                     }
                    ] 
        },
        {
           "category": "Seven",
            "data":[
                    {'label':'Product1',
                     'value':100
                     },
                     {'label':'Product2',
                     'value':56
                     },
                     {'label':'Product3',
                     'value':78
                     },
                     {'label':'Product4',
                     'value':65
                     },
                     {'label':'Product5',
                     'value':43
                     },
                     {'label':'Product6',
                     'value':22
                     },
                     {'label':'Product7',
                     'value':66
                     },
                     {'label':'Product8',
                     'value':77
                     },
                     {'label':'Product9',
                     'value':88
                     },
                     {'label':'Product10',
                     'value':54
                     },
                     {'label':'Product11',
                     'value':56
                     },
                     {'label':'Product12',
                     'value':34
                     },
                     {'label':'Product13',
                     'value':23
                     },
                     {'label':'Product14',
                     'value':67
                     },
                     {'label':'Product15',
                     'value':54
                     },
                     {'label':'Product16',
                     'value':76
                     },
                     {'label':'Product17',
                     'value':87
                     },
                     {'label':'Product18',
                     'value':99
                     },
                     {'label':'Product19',
                     'value':99
                     },
                     {'label':'Product20',
                     'value':43
                     },
                     {'label':'Product21',
                     'value':23
                     },
                     {'label':'Product22',
                     'value':34
                     },
                     {'label':'Product23',
                     'value':44
                     },
                     {'label':'Product24',
                     'value':32
                     },
                     {'label':'Product25',
                     'value':14
                     },
                     {'label':'Product26',
                     'value':65
                     },
                     {'label':'Product27',
                     'value':78
                     },
                     {'label':'Product28',
                     'value':65
                     },
                     {'label':'Product29',
                     'value':43
                     },
                     {'label':'Product30',
                     'value':45
                     }
                    ] 
        }                          
    ]
}
    d3charts("BoxPlot2D", "#boxplot", boxplot);