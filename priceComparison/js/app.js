//Define an angular module for our app
/*
 function deleteCookie(cookieName)  {
 var path = window.location.pathname;
 document.cookie = (cookieName == preLoginInfo.SamlArtifactCookieName.text || cookieName == preLoginInfo.CheckName.text)
 ? cookieName + "=; path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
 : cookieName + "=; path=" + path.substring(0,path.lastIndexOf("/")) + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
 }
 */
  
var excelApp = angular.module('excelApp', ['ngRoute', 'ngResource']);

angular.element(document).ready(function() {

    var configServiceProvider;
    $.date = function(dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "-" + month + "-" + year;

        return date;
    };
    $("li").click(function(){
        $(".link").removeClass("active");
        $(this).addClass("active");
    });
            angular.bootstrap(document, ['excelApp']);
     	

});

excelApp.provider('configService', function(){
    var options={};
    this.setLoginStatus = function(status){
        //$rootScope.isLoggedIn = status;
        options.isLoggedIn=status;
    };
    this.setPreLoginInfo=function(info){
        options.preLoginInfo=info;
    };

    this.$get=[function(){
        if(!options){

        }
        return options;
    }];
});

/* Router */
excelApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/Home', {
                templateUrl: 'home.htm',
                controller: 'HomeController'
            }).		
            otherwise({
                redirectTo: '/Home'
            });
    }
]);

/* Controller */



//SmartHub Ncb CustomerMessage Display

excelApp.controller('HomeController', ['$scope','$rootScope','AppService','configService','$location','$anchorScroll','$window',
    function($scope,$rootScope,AppService,configService,$location,$anchorScroll,$window){


$scope.data = priceComparison.PriceComparison;
     $scope.arraydatavalue = AppService.formArraydata('Flipkart',$scope.data);
	 $scope.arraydatavalue = AppService.formArraydata('Snapdeal',$scope.data);
	 $scope.arraydatavalue = AppService.formArraydata('Amazon',$scope.data);
	 $scope.arraydatavalue = AppService.formArraydata('HS18',$scope.data);
	 $scope.arraydatavalue = AppService.formArraydata('Ebay',$scope.data);
	 $scope.arraydatavalue = AppService.formArraydata('Shopclues',$scope.data);
		$scope.redraw = function(){
		_.defer(function(){$scope.$apply();});	
		$scope.table = $('.footable').footable();
						$scope.table.trigger('footable_redraw');
						
						
		};
	$scope.gotop=function(){
   $('html,body').animate({
        scrollTop: $('.hidetable').css('top')
    }, 250);
	};
$window.notifyvalue = function(value){
var classvalue;
var type = value.split(',');
if(type[1] == 'Underpriced')
classvalue = 'info';
if(type[1] == 'Competitive')
classvalue = 'success';
if(type[1] == 'Overpriced')
classvalue = 'danger';
$.notify(value, {
  clickToHide: true,
  autoHide: true,
  className: classvalue
});
};
		$scope.$apply();
                        $scope.table = $('.footable').footable();
						$scope.table.trigger('footable_redraw');	

						



 // $("#sidebar").animate({left:'-=300px'},'slow');
 

  
		
    }
	
				 
]);


/*Factory*/
excelApp.service('AppService', ['$resource', '$rootScope',
    function($resource, $rootScope){
		
		
		//SmartHub xmltojson
this.getxmlobject=function(data){
                  parser=new DOMParser();
xmlDoc=parser.parseFromString(data,"text/xml");
var a=$.cordys.json.xml2js(xmlDoc);
            return a;
}

var createchartdata = function(arraydata){

return chartData = {
                    "data" : arraydata,
				"showZeroPies" : 1,
					"bgcolor": "#f7f7f7",
					"manageLabelOverflow":1,
					"useEllipsesWhenOverflow":1,
					"showpercentvalues":1,
			      "showpercentintooltip":0,
				  "showLabels":0,
				    "showValues":1,
				  "showlegend": 0,
        "legendborder": 0,
        "legendposition": "bottom",
		"legendnumcolumns": 2,
				  
                  "use3dlighting": 0,
                  "showplotborder": 0,
				  "showshadow": 0,
			
					"palettecolors": "#33bdda,#6baa01,#e44a00"
                };
				
				
}

var insertchart = function(divId,data)
{
   $(divId).insertFusionCharts({type: "Column3D",dataSource: data, dataFormat: "json", width: "100%", height: "150px",renderer:'javascript'});
}

this.formArraydata = function(type,data){

var i=0;

var typedata=$.cordys.json.find(data,type);
	_.each(typedata,function(detail){
	i++;
	var stateDataArray = [];
	var chartidtype = type;
	               var chartid = "#" + chartidtype + i;
					chartidval = chartidtype + i;
				if(detail.type == 'Mobile')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Mobile,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Mobile,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Mobile,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
				
					 if(detail.type == 'tablet')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Tablet,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Tablet,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Tablet,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
					 if(detail.type == 'Laptop')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Laptop,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Laptop,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Laptop,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
					 if(detail.type == 'shoe')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Shoe,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Shoe,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Shoe,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
						 if(detail.type == 'clothing')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Clothing,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Clothing,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Clothing,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
						 if(detail.type == 'furnishing')
				{
                    stateDataArray.push({'label':'Underpriced', 'value':detail.underpriced,link:"j-notifyvalue-Furnishing,Underpriced," +detail.underpriced +"," +type});
					stateDataArray.push({'label':'Competitive', 'value':detail.competitive,link:"j-notifyvalue-Furnishing,Competitive," +detail.competitive +"," +type});
					stateDataArray.push({'label':'Overpriced', 'value':detail.overpriced,link:"j-notifyvalue-Furnishing,Overpriced," +detail.overpriced +"," +type});
					var chart = createchartdata(stateDataArray);
					insertchart(chartid,chart);
					}
				
                });
}
}
 
    ]);
/* Filter */
excelApp.filter('startFrom', function() {
    return function(data, index){
        if(data){
            index = +index; //parse to int
            return data.slice(index);
        }
    }
});

var uniqueItems = function (data, key) {
    var result = [];
	if (data != undefined)
	{
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) == -1) {
            result.push(value);
        }
    }
	}
    return result;
};

excelApp.filter('groupBy',
            function () {
                return function (collection, key) {
                    if (collection === null) return;
                    return uniqueItems(collection, key);
        };
    });
	
	
excelApp.filter('filterTasks',function(query){
    return;
});