var barchart3 = {
    "chart": {
        "caption": "",
        "captionColor":"blue",
        "yaxisname": "Revenue",
        "showValue":true,
        "showlegend":true,
        "color":"white",
        "fontsize":15,
        "slant":false,
        "slantdegree":"90",
        "pallattecolor":["red","green","yellow"]
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
d3charts("Pie2D","#barchart3", barchart3, 400, 300);

function type(d) {
  d.value = +d.value;
  return d;
}