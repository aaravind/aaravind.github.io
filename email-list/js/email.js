var app = app || {};

// Function to validate Email

app.validate_email = function(mailaddress) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(mailaddress);
    }
    // Function to Email tag creation

app.create_tags = function(data_list) {
    var previous_tag_wrong = false;
    for (current = 0; current < data_list.length; current++) {
        if (data_list[current] != '') {
            var current_email = data_list[current];
            if (app.validate_email(current_email.trim()) && !previous_tag_wrong) {
                var temp_list = '<li class="each_tag">' + current_email.trim() + '<span role="presentation" class="delete"></span></li>';
                $(temp_list).insertBefore(".email_box .input_area");
            } else {
                previous_tag_wrong = true;
                $('.notify_mess_right .message').html(current_email + ' not a valid emailaddress');
                $('.notify_mess_right').slideDown(600);
                app.data_list = data_list.splice(current + 1);
                break;
            }
        }
    }
}

// Close Invalid notification and popsup a error

$('body').on('click', '.close_icon', function(ev) {
    $('.notify_mess_right').slideUp(600);
    app.create_tags(app.data_list);
    $('.input_area input').focus();
});

// Make the input tag focus on click of the main container

$('body').on('click', '.email_box', function(ev) {
    $('.input_area input').focus();
});

// Highlight each tag on click and on delete remove from the list

$('body').on('click', '.each_tag', function(ev) {
    if ($(ev.target).attr('class').indexOf('delete') != -1) {
        $(this).closest('.each_tag').remove();
    } else {
        $('.each_tag').attr('class', 'each_tag');
        $(this).addClass('highlight');
    }
});

// On space,comma and enter create email tags and on backspace twice and delete remove the tags

$('body').on('keyup', '.input_area input', function(e) {
    if (e.keyCode === 13 || e.keyCode === 0 || e.keyCode === 32) {
        app.create_tags($('.input_area input').val().split(','));
        $('.input_area input').val('');
    } else if (e.keyCode == 8 && ($('.input_area input').val() == '')) {
        if ($('ul .each_tag').last().attr('class').indexOf('highlight') == -1)
            $('ul .each_tag').last().addClass('highlight');
        else
            $('ul .each_tag').last().remove();
    } else if (e.keyCode == 46) {
        $.each($('.each_tag'), function(current) {
            if ($(this).attr('class').indexOf('highlight') != -1)
                $(this).remove();
        })
    }
});

//Create tags on pasting the content

$('body').on('paste', '.input_area input', function(e) {
    setTimeout(function() {
        app.create_tags($(e.currentTarget).val().split(','));
        $('.input_area input').val('');
    }, 0);
});