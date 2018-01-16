
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