window.onresize = function (event) {

    d3charts("Line2D", "#linechart", linedata);
    d3charts("Column2D", "#leadershipchart", columndata);
    d3charts("Availability2D", "#availability", availabilitydata);

};

var linedata = {
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
            "value": 0
        },
        {
            "label": "EquallyPriced",
            "value": 100
        },
        {
            "label": "UnderPriced",
            "value": 150
        }
        ,
        {
            "label": "UnderPriced5",
            "value": 0
        }
        ,
        {
            "label": "UnderPriced6",
            "value": 300
        }
        ,
        {
            "label": "UnderPriced7",
            "value": 500
        }
        
        ,
        {
            "label": "UnderPriced2",
            "value": 0
        }

    ]
}
    d3charts("Line2D", "#linechart", linedata);


var columndata = {
    "chart": {
        "caption": "Price Leadership Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "slantdegree":"90",
        "pallattecolor":["#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324CC"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "01-08-2015",
            "value": 56,
            "tooltext":"Snapdeal"
        },
        {
            "label": "02-08-2015",
            "value": 23,
            "tooltext":"Flipkart"
        },
        {
            "label": "03-08-2015",
            "value": 87,
            "tooltext":"Amazon"
        }
        ,
        {
            "label": "04-08-2015",
            "value": 10,
            "tooltext":"Paytm"
        }
        ,
        {
            "label": "05-08-2015",
            "value": 67,
            "tooltext":"Shopclues"
        }
        ,
        {
            "label": "06-08-2015",
            "value": 50,
            "tooltext":"Jabong"
        }
        ,
        {
            "label": "07-08-2015",
            "value": 66,
            "tooltext":"Myntra"
        }
        ,
        {
            "label": "08-08-2015",
            "value": 12,
            "tooltext":"Trends"
        },
        {
            "label": "09-08-2015",
            "value": 98,
            "tooltext":"Mocha"
        }
        ,
        {
            "label": "10-08-2015",
            "value": 55,
            "tooltext":"Waves"
        }
        ,
        {
            "label": "11-08-2015",
            "value": 88,
            "tooltext":"Snapdeal"
        }
        ,
        {
            "label": "12-08-2015",
            "value": 44,
            "tooltext":"Flipkart"
        }
        

    ]
}
  d3charts("Column2D", "#leadershipchart", columndata);

var availabilitydata = {
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

    d3charts("Availability2D", "#availability", availabilitydata);