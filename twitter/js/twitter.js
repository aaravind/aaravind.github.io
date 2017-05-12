
var inputquery;
var timerId;
function refreshtweets(querystring){
	$('.tweets_container .loader').css('display','block');
	$('.tweets_container .each_tweet').remove();
	var url = (querystring=='' || querystring==undefined) ? 'https://aravindtwitter.herokuapp.com/twittersearch?key="ola"' : 'https://aravindtwitter.herokuapp.com/twittersearch?key='+ querystring;
	$.ajax({
	  url: url,
	  context: document.body
	}).done(function(data) {
		$('.tweets_container .loader').css('display','none');
	  var tweetdata = JSON.parse(data);
	  if(tweetdata.length != 0){
	  		  var source   = $("#tweet_template").html();
	  var template = Handlebars.compile(source);
		            for(var index in tweetdata){
		            var html = template(tweetdata[index]);
		              $('.tweets_container').append(html);
		        }
		$('.tweets_container .each_tweet').animate({opacity: '1'}, "slow");        
     if(timerId != undefined)
      clearTimeout(timerId);		        
      timer();
	  }
	  else{
	  	$('.tweets_container').append('<div class="each_tweet"><p>No data to display</p></div>');
	  	$('.tweets_container .each_tweet').animate({opacity: '1'}, "slow"); 
	  }
		        
	});
}
refreshtweets('');

$('.search_but').click(function(){
	inputquery = encodeURIComponent($('.search_input').val());
    refreshtweets(inputquery);
})

function timer(){
var timeLeft = 30;
timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
  	$('.timeout').html(timeLeft + ' ');
    clearTimeout(timerId);
    refreshtweets(inputquery);
  } else {
    $('.timeout').html(timeLeft + ' ');
    timeLeft--;
  }
}
}

$(".search_input").keypress(function(event) {
    if (event.which == 13) {
	inputquery = encodeURIComponent($('.search_input').val());
    refreshtweets(inputquery);
     }
});