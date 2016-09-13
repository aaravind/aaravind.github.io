var app = app || {};
app.url = 'http://nearadz.com/twittersearch.php?';
app.timerId = "";

// get number of rows columns and search parameter from the url

app.getparems = function(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

// With the inputs call the api url and on success call draw tiles
app.callapi = function(rows, cols, search) {
    parseddata = [];
    $.ajax({
        url: app.url + 'search=' + search + '&row=' + rows + '&col=' + cols,
        dataType: "json",
        success: function(data) {
            app.refreshtiles(data);
        }
    });
}

// With the data draw tiles based on rows and count

app.refreshtiles = function(data) {
    $('.main_flex .inner_flex').html('');
    var totalcount = 0;
    var tweettemplate = _.template($("#tweets_template").html());
    for (i = 0; i < data.length; i++) {
        totalcount = totalcount + data[i].length;
        var tweetsdata = {
            items: data[i]
        };
        var finaltemplate = tweettemplate(tweetsdata);
        $('.main_flex .inner_flex').append(finaltemplate);

        if (app.timerId != '')
            clearTimeout(app.timerId);
        app.timer();
    }
    for (k = 0; k < totalcount; k++) {
        var rand = Math.floor(Math.random(1) * 2);
        if (rand == 0)
            $('.each_tile').eq(k).slideUp(0).slideDown(500);
        else
            $('.each_tile').eq(k).slideDown(0).slideUp(500).slideDown(0);
    }
}
app.rows_count = (app.getparems('rows') == undefined || app.getparems('rows') == '') ? 5 : app.getparems('rows');
app.cols_count = (app.getparems('cols') == undefined || app.getparems('cols') == '') ? 5 : app.getparems('cols');
app.search_term = (app.getparems('search') == undefined || app.getparems('search') == '') ? 'cricket' : app.getparems('search');
app.callapi(app.rows_count, app.cols_count, app.search_term);

// On click each tile flip and show the twitter card

$('body').on('click', '.each_tile', function(e) {
    if ($(this).find('.card_content').length == 0) {
        if (e.target.tagName != 'A') {
            var currentdata = $(this).data();
            var cardtemplate = _.template($("#tweets_card").html());
            var tweetscarddata = {
                card: currentdata
            };
            var finaltemplate = cardtemplate(tweetscarddata);
            $(this).find('p').css('display', 'none');
            $(this).append(finaltemplate);
        }
    } else {
        $(this).find('.card_content').remove();
        $(this).find('p').css('display', 'block');
    }
    $(this).toggleClass('rotated');
});

// Timer function - call api and refresh data for every minute

app.timer = function() {
    var timeLeft = 60;
    app.timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(app.timerId);
            app.callapi(app.rows_count, app.cols_count, app.search_term);
        } else {
            timeLeft--;
        }
    }
}