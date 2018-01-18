
$('.btn-expand-collapse').click(function(e) {
				$('.navbar-primary').toggleClass('collapsed');
});

$("body .nomination-form-type .each-form-type").on("click",function(){
	$(this).closest(".nomination-form-type").find(".each-form-type").removeClass("active");
	$(this).toggleClass("active");
});
$("body .navbar-primary-menu a").on("click",function(e){
	e.preventDefault();
	$(this).closest(".navbar-primary-menu").find("a").removeClass("active");
	$(this).toggleClass("active");
});

$('.carousel').carousel({
  interval: 3000,
  ride:true
})
var days, hours, minutes, seconds;
/* Counter code*/
function callCounter(id){
	dateVal = $('#'+id).attr("data-date");
	target_date = new Date(dateVal).getTime();
	countdown = document.getElementById(id);
	setInterval(function () {
	    var current_date = new Date().getTime();
	    var seconds_left = (target_date - current_date) / 1000;
	    days = parseInt(seconds_left / 86400);
	    seconds_left = seconds_left % 86400;   
	    hours = parseInt(seconds_left / 3600);
	    seconds_left = seconds_left % 3600;     
	    minutes = parseInt(seconds_left / 60);
	    seconds = parseInt(seconds_left % 60);
	    countdown.innerHTML = '<span class="days">' + (days.toString().length == 1 ? ('0'+days) : days) +  '</span> <span class="hours">' + (hours.toString().length == 1 ? ('0'+hours) : hours)  + '</span> <span class="minutes">'
	    + (minutes.toString().length == 1 ? ('0'+minutes) : minutes) + '</span> <span class="seconds">' + (seconds.toString().length == 1 ? ('0'+seconds) : seconds)  + '</span>';  
	 
	}, 1000);
}
callCounter('countdown');
/* End of counter code */

    $( document ).ready(function() {
 $('#myModal').modal('show');
});