var app = app || {};

app.parselogicfile = "../files/parser.json";
app.parsefile = "../files/logs.txt";
app.readdata = '';
app.filterapplied =false;

// Check for scroll end with the div

app.chk_scroll = function(e){
	if(!app.filterapplied){
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
        app.drawtable(app.readdata,second);
    }
    }
}
// Read the json file which has the parse logic

app.parselogic = function(filepath){
	$.getJSON( filepath, function( data ) {
     parserdata = data.parser;
     searchfilter = data.search_on;
     app.parsetxtfile(app.parsefile);
});
}
// Logic to find top 3 referrals relevant to search

app.topreferal = function(arrayelements){
	var counts = arrayelements.reduce(function(map, filtered) {
    map[filtered] = (map[filtered] || 0) + 1;
    return map;
}, {});

var sorted = Object.keys(counts).sort(function(a, b) {
    return counts[b] - counts[a];
});
if(sorted.length>=3)
var top3 = 'Top referrals : ' + sorted.slice(0, 3).join(',');
else if(sorted.length==0)
var top3 = ["No referals available"];
else
var top3 = 'Top referrals : ' + sorted.join(',');
$('.message').html(top3);
$('.notify_mess_right').slideDown(600);
}

// Read the file data

app.parsetxtfile = function(filename){
	parseddata=[];
    $.ajax({
            url : filename,
            dataType: "text",
            success : function (data) {
            	second = 0;
            	first = 0;
            	count = 0;
                app.readdata = data;
                app.drawtable(app.readdata,second);
                $('.logstable').bind('scroll', app.chk_scroll);
            }
        });
}

// Based on the data form json object and draw the table

app.drawtable = function(data,start,index){
	$('.loading').css('display','block');
	second = start;
	count = 0;
	if(!app.filterapplied){
	while(count < 25){
            		temp_obj = {};
            		if(second < data.length){
                for(i=0;i<parserdata.length;i++){
                	second = (second == 0) ? 0 : second+1;
                	first = data.indexOf(parserdata[i].logic[0],second);
                	second = data.indexOf(parserdata[i].logic[1],first+1);
                	if(i ==0)
                    temp_obj[parserdata[i].name] = data.substring(first,second);
                    else
                    temp_obj[parserdata[i].name] = data.substring(first+1,second);
                }
                //var ipnum = $('#ip_num').val();
                //var devos = $('#device_os').val();
                //if((temp_obj['ip_address'].search(ipnum) != -1) && (temp_obj['user_agent'].search(devos) != -1)){
                    parseddata.push(temp_obj);
                    count++;
                //}
                }
                else{
                	break;
                }

                }
            }
            else{
            	if(index.length != 0){
            	for(j=0;j<index.length;j++){
            		temp_obj = {};
                    if((index[j]-1) <= 0)
                    second = 0;
                    else
                    second = index[j]-1;	
            		if(second < data.length){
                for(i=0;i<parserdata.length;i++){
                	second = (second == 0) ? 0 : second+1;
                	first = data.indexOf(parserdata[i].logic[0],second);
                	second = data.indexOf(parserdata[i].logic[1],first+1);
                	if(i ==0)
                    temp_obj[parserdata[i].name] = data.substring(first,second);
                    else
                    temp_obj[parserdata[i].name] = data.substring(first+1,second);
                }
                //var ipnum = $('#ip_num').val();
                //var devos = $('#device_os').val();
                //if((temp_obj['ip_address'].search(ipnum) != -1) && (temp_obj['user_agent'].search(devos) != -1)){
                    parseddata.push(temp_obj);
                    count++;
                //}
                }

            	}
            }
            else
            	parseddata = [];
            }
                var logtemplate = _.template( $("#logstemplate").html() );
                var logsdata = {items:parseddata};
                var finaltemplate = logtemplate(logsdata);
                $('.footable').html(finaltemplate);
                $('.footable').footable();
				var $demo1 = $('.footable');
				$demo1.floatThead({
				  scrollContainer: function($table){
				    return $table.closest('.wrapper');
				  },
				   top:160,
				   autoReflow:true
				});
                $('.floatThead-table').attr('class','floatThead-table');
                if(parseddata.length != 0){
                        $current = $('.footable tbody tr:nth-last-child('+(count)+')');
        $('.logstable').scrollTop($current.position().top - 40);
            }

        $('.loading').css('display','none');
}

app.parselogic(app.parselogicfile);

// Operation on click of search button

$('body').on('click', '#search', function() {
	$('.loading').css('display','block');
	parseddata = [];
	$('.footable').empty();
    if($('#ip_num').val() != '' && $('#device_os').val() == ''){
    	app.filterapplied =true;
	var regex = eval('/' + $('#ip_num').val() + '/gi'), result, indices = [];
while ( (result = regex.exec(app.readdata)) ) {
    indices.push(result.index);
}
app.drawtable(app.readdata,0,indices);
}
else if($('#ip_num').val() == '' && $('#device_os').val() != ''){
	app.filterapplied =true;
	var regex = eval('/' + $('#device_os').val() + '/gi'), result, indices = [];
while ( (result = regex.exec(app.readdata)) ) {
	before_main_index = app.readdata.lastIndexOf(" - - ",result.index); 
	final_main = app.readdata.lastIndexOf("\"",before_main_index) + 1;
    indices.push(final_main);
}
app.drawtable(app.readdata,0,indices);
}
else if($('#ip_num').val() != '' && $('#device_os').val() != ''){
	app.filterapplied =true;
	var regex = eval('/' + $('#ip_num').val() + '/gi'), result, indices = [];indicesend=[];finalindex=[];
while ( (result = regex.exec(app.readdata)) ) {
	indicesend.push(app.readdata.indexOf(parserdata[0].logic[1],result.index+20));
    indices.push(result.index);
}
for(k=0;k<indices.length;k++){
	var regex = eval('/' + $('#device_os').val() + '/gi')
	if(regex.exec(app.readdata.substring(indices[k],indicesend[k])))
		finalindex.push(indices[k]);
}
app.drawtable(app.readdata,0,finalindex);
}
else{
	app.filterapplied =false;
	parseddata = [];
app.drawtable(app.readdata,0,[]);
    }
});

// Operation on click of top referal button

$('body').on('click', '#referal', function() {
	if(!app.filterapplied){
 filteredarray = app.readdata.split(/utm_source=(.*?)&/).filter(function(el, index) {
    return index % 2 === 1;
  });
}
else{
	 filteredarray = JSON.stringify(parseddata).split(/utm_source=(.*?)&/).filter(function(el, index) {
    return index % 2 === 1;
  });
}
 app.topreferal(filteredarray);
});
$('body').on('click', '.close_icon', function(ev) {
    $('.notify_mess_right').slideUp(600);
});

// Hide the notification if it clicked elsewere in the page

$(document).mousedown(function (e) {
            var container = $(".notify_mess_right .inner_cont");
            if( $(".notify_mess_right").css('display')=='block'){
            if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".notify_mess_right").slideUp(600);
            }
          }
        });