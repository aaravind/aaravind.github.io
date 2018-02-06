
$('.btn-expand-collapse').click(function(e) {
				$('.navbar-primary').toggleClass('collapsed');
});

$("body .nomination-form-type .each-form-type").on("click",function(){
	$(this).closest(".nomination-form-type").find(".each-form-type").removeClass("active");
	$(this).toggleClass("active");
});
// $("body .navbar-primary-menu a").on("click",function(e){
// 	$(this).closest(".navbar-primary-menu").find("a").removeClass("active");
// 	$(this).toggleClass("active");
// });

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
// $("body [data-type='gallery-image'] a").click(function(e){
// 	e.preventDefault();
// });
$("body [data-type='gallery-image']").click(function(e){
	if($(e.target).closest(".like-comment")[0] == undefined){
	e.preventDefault();
	e.stopPropagation();
	var url = $(this).attr("data-image-url");
	var imageContent = "<img class='' src='"+ url +"' alt=''>";
	$('#myModal .modal-wrapper-content').html(imageContent);
	$('#myModal').modal('show');
}
});
$("body .like-feature").click(function(e){
	if($(this)[0].className.split(" ")[1] == "active"){
		$(this).removeClass("active");
		$(this).addClass("inactive");
	}
	else if($(this)[0].className.split(" ")[1] == "inactive"){
		$(this).removeClass("inactive");
		$(this).addClass("active");
	}
	else{

	}
});
$("body .comment-feature").click(function(e){
	$('#comment-modal').modal('show');
})
$("body [data-type='gallery-video']").click(function(e){
	if($(e.target).closest(".like-comment")[0] == undefined){
	e.preventDefault();
	e.stopPropagation();
	var url = $(this).attr("data-video-url");
	var imageContent = "<video width='100%' controls>"
  						+"<source src='"+ url +"'"
  						+" type='video/mp4'>"
  						+" Your browser does not support HTML5 video."
 						+"</video>";
	$('#myModal .modal-wrapper-content').html(imageContent);
	$('#myModal').modal('show').on('hidden.bs.modal', function(){
        $(this).find('video')[0].pause();
    });
}
});

// $("body [data-type='gallery-video-with-like']").click(function(e){
// 	if($(e.target).closest(".like-comment")[0] == undefined){
// 	e.preventDefault();
// 	e.stopPropagation();
// 	var url = $(this).attr("data-video-url");
// 	var imageContent = "<video width='100%' controls>"
//   						+"<source src='"+ url +"'"
//   						+" type='video/mp4'>"
//   						+" Your browser does not support HTML5 video."
//  						+"</video>"
//  						+"<div class='container gallery'><div class='like-comment'>"
//  						+"<div class='like-feature inactive'>"
//  						+"<img src='../images/HeartBorder.svg'></img>"
//  						+"<img src='../images/HeartRed.svg'></img></div></div></div>";
// 	$('#myModal .modal-wrapper-content').html(imageContent);
// 	$('#myModal').modal('show').on('hidden.bs.modal', function(){
//         $(this).find('video')[0].pause();
//     });
// }
// });

$("body .header-year .year span").click(function(e){
	$(this).closest(".header-year").find("span").removeClass("active");
	$(this).addClass("active");
})
$("body .contest .wrapper span").click(function(e){
	$(this).closest(".contest").find("span").removeClass("active");
	$(this).addClass("active");
})
/* End of counter code */

    $( document ).ready(function() {
    	if(window.innerWidth < 480){
 			$("body .navbar-primary").addClass("collapsed");
 		}
	 // $('#myModal').modal('show').on('hidden.bs.modal', function(){
	 //        $(this).find('video')[0].pause();
	 //    });
	 $('body .carousel').carousel({
	  interval: 2000
	});


 	var location_url = window.location.href;
 	var page = location_url.substring(location_url.lastIndexOf("/")+1);
 	if($("[data-active-name='"+page+"']")[0] != undefined){
 	$("[data-active-name='"+page+"']").addClass("active");
 	};
});