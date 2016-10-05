
function convertDate( date ) {
var d = new Date( date );
function day(d) { return (d < 10) ? '0' + d : d; }
function month(m) { var months = ['जनवरी','फ़रवरी','मार्च',
'अप्रैल','मई','जून',
'जुलाई','अगस्त','सितम्बर',
'अक्टूबर','नवेम्बर','दिसम्बर'];
return months[m]; }
return [ day(d.getDate()), month(d.getMonth()), d.getFullYear() ].join(' ');
}


function add_reviews(reviews_info){
var review = _.template($("#reviewtemplate").html());
for(i=0;i<reviews_info.reviewList.length;i++){
	reviews_info.reviewList[i].reviewDateMillis = convertDate(reviews_info.reviewList[i].reviewDateMillis)
}
var reviewdata = {data:reviews_info.reviewList};
    var reviewtemplate = review(reviewdata);
    $('.review_container').append(reviewtemplate);
}
$(document).ready(function(){

    var title_card = _.template($("#main_card_template").html());

    story_info.listingDateMillis = convertDate(story_info.listingDateMillis);
    story_info.averageRating = story_info.averageRating.toFixed(1);
var carddata = {data:story_info};
    var cardtemplate = title_card(carddata);
    $('.main_card').html(cardtemplate);
add_reviews(reviews_info);

  
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    	if(reviews_info2 != undefined && reviews_info2.reviewList.length != 0){
    		console.log(reviews_info2);
        add_reviews(reviews_info2);
    }
    }
};

});


