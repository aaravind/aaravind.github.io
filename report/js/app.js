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

excelApp.controller('HomeController', ['$scope','$rootScope','NcbService','configService','$location','$anchorScroll','$window',
    function($scope,$rootScope,NcbService,configService,$location,$anchorScroll,$window){

d3.csv("../excel/report.csv", function(data) {
$scope.data = data;
			$scope.redrawpage = function(){
		$scope.table = $('.footable').footable();
						$scope.table.trigger('footable_redraw');
						
						
		};
	$scope.gotop=function(){
   $('html,body').animate({
        scrollTop: $('.hidetable').css('top')
    }, 250);
	};

		$scope.$apply();
                        $scope.table = $('.footable').footable();
						$scope.table.trigger('footable_redraw');	

						
});



 // $("#sidebar").animate({left:'-=300px'},'slow');
 

  
		
    }
	
				 
]);


/*Factory*/
excelApp.service('NcbService', ['$resource', '$rootScope',
    function($resource, $rootScope){
		
		
		//SmartHub xmltojson
this.getxmlobject=function(data){
                  parser=new DOMParser();
xmlDoc=parser.parseFromString(data,"text/xml");
var a=$.cordys.json.xml2js(xmlDoc);
            return a;
}
 
    }]);
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