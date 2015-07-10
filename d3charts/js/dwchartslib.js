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
    "data":  [
        {
            "label": "01-08-2015",
            "value": 56
        },
        {
            "label": "02-08-2015",
            "value": 23
        },
        {
            "label": "03-08-2015",
            "value": 87

        }
        ,
        {
            "label": "04-08-2015",
            "value": 10
        }
        ,
        {
            "label": "05-08-2015",
            "value": 67
        }
        ,
        {
            "label": "06-08-2015",
            "value": 50
        }
        ,
        {
            "label": "07-08-2015",
            "value": 66
        }
        ,
        {
            "label": "08-08-2015",
            "value": 0
        },
        {
            "label": "09-08-2015",
            "value": 98
        }
        ,
        {
            "label": "10-08-2015",
            "value": 55
        }
        ,
        {
            "label": "11-08-2015",
            "value": 88
        }
        ,
        {
            "label": "12-08-2015",
            "value": 44
        } ,
        {
            "label": "13-08-2015",
            "value": 55
        } ,
        {
            "label": "14-08-2015",
            "value": 89
        },
        {
            "label": "15-08-2015",
            "value": 23
        },
        {
            "label": "16-08-2015",
            "value": 33
        },
        {
            "label": "17-08-2015",
            "value": 0
        },
        {
            "label": "18-08-2015",
            "value": 0

        }
        ,
        {
            "label": "19-08-2015",
            "value": 11
        }
        ,
        {
            "label": "20-08-2015",
            "value": 45
        }
        ,
        {
            "label": "21-08-2015",
            "value": 76
        }
        ,
        {
            "label": "22-08-2015",
            "value": 77
        }
        ,
        {
            "label": "23-08-2015",
            "value": 5
        },
        {
            "label": "24-08-2015",
            "value": 0
        }
        ,
        {
            "label": "25-08-2015",
            "value": 80
        }
        ,
        {
            "label": "26-08-2015",
            "value": 34
        }
        ,
        {
            "label": "27-08-2015",
            "value": 12
        } ,
        {
            "label": "28-08-2015",
            "value": 6
        } ,
        {
            "label": "29-08-2015",
            "value": 89

        },
        {
            "label": "30-08-2015",
            "value": 23

        }


        

    ]
}
    d3charts("Line2D", "#linechart", linedata);


var columndata = {
   "chart": {
        "caption": "Column Chart",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "color":"white",
        "fontsize":15,
        "slant":true,
        "twoxaxis":true,
        "slantdegree":"90",
        "pallattecolor":["#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C"
        ,"#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78","#BE3243","#FF3243","#BE0043","#BE32FF","#CC3243","#BECC43","#BE324C","#f8bd19","#e44a00","#008ee4","#33bdda","#6baa01","#583e78"]
    },
    "export":{
        "showexport": true,
         "format": ["-Select-","jpeg","png","pdf"]
    },
    "data": [
        {
            "label": "01-08-2015",
            "value": 56,
            "axistop":"Snapdeal"
        },
        {
            "label": "02-08-2015",
            "value": 23,
            "axistop":"Flipkart"
        },
        {
            "label": "03-08-2015",
            "value": 87,
            "axistop":"Amazon"

        }
        ,
        {
            "label": "04-08-2015",
            "value": 10,
            "axistop":"Paytm"
        }
        ,
        {
            "label": "05-08-2015",
            "value": 67,
            "axistop":"Shopclues"
        }
        ,
        {
            "label": "06-08-2015",
            "value": 50,
            "axistop":"Jabong"
        }
        ,
        {
            "label": "07-08-2015",
            "value": 66,
            "axistop":"Myntra"
        }
        ,
        {
            "label": "08-08-2015",
            "value": 12,
            "axistop":"Trends"
        },
        {
            "label": "09-08-2015",
            "value": 98,
            "axistop":"Mocha"
        }
        ,
        {
            "label": "10-08-2015",
            "value": 55,
            "axistop":"Waves"
        }
        ,
        {
            "label": "11-08-2015",
            "value": 88,
            "axistop":"Snapdeal"
        }
        ,
        {
            "label": "12-08-2015",
            "value": 44,
            "axistop":"Flipkart"
        } ,
        {
            "label": "13-08-2015",
            "value": 55,
            "axistop":"Jabong"
        } ,
        {
            "label": "14-08-2015",
            "value": 89,
            "axistop":"Myntra"
        },
        {
            "label": "15-08-2015",
            "value": 23,
            "axistop":"Paytm"
        },
        {
            "label": "16-08-2015",
            "value": 33,
            "axistop":"Snapdeal"
        },
        {
            "label": "17-08-2015",
            "value": 66,
            "axistop":"Flipkart"
        },
        {
            "label": "18-08-2015",
            "value": 76,
            "axistop":"Amazon"

        }
        ,
        {
            "label": "19-08-2015",
            "value": 11,
            "axistop":"Paytm"
        }
        ,
        {
            "label": "20-08-2015",
            "value": 45,
            "axistop":"Shopclues"
        }
        ,
        {
            "label": "21-08-2015",
            "value": 76,
            "axistop":"Jabong"
        }
        ,
        {
            "label": "22-08-2015",
            "value": 77,
            "axistop":"Myntra"
        }
        ,
        {
            "label": "23-08-2015",
            "value": 5,
            "axistop":"Trends"
        },
        {
            "label": "24-08-2015",
            "value": 0,
            "axistop":"Mocha"
        }
        ,
        {
            "label": "25-08-2015",
            "value": 80,
            "axistop":"Waves"
        }
        ,
        {
            "label": "26-08-2015",
            "value": 34,
            "axistop":"Snapdeal"
        }
        ,
        {
            "label": "27-08-2015",
            "value": 12,
            "axistop":"Flipkart"
        } ,
        {
            "label": "28-08-2015",
            "value": 6,
            "axistop":"Jabong"
        } ,
        {
            "label": "29-08-2015",
            "value": 89,
            "axistop":"Myntra"
        },
        {
            "label": "30-08-2015",
            "value": 23,
            "axistop":"Paytm"
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