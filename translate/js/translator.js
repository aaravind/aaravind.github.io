var app = app || {};

// Function to hindi tag create

app.create_tags = function(data_list, engval) {
    var previous_tag_wrong = false;
    if (data_list != '') {
        var current_translate = data_list;
        var temp_list = '<li class="each_tag" data-eng="' + engval.trim() + '">' + current_translate + '</li>';
        $(temp_list).insertBefore(".translate_box .input_area");

    }
}

// Function to translate text

app.translatetext = function(source) {

    $.when($.ajax('https://www.google.com/inputtools/request?ime=transliteration_en_hi&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=' + source)).then(function(data, textStatus, jqXHR) {
        var basehtml = '<div class="options"><ul>';
        var liform = '';
        for (i = 0; i < data[1][0][1].length; i++) {
            liform = liform + '<li>' + data[1][0][1][i] + '</li>';
        }
        var finalhtml = basehtml + liform + '</ul></div>';
        if ($currentelement.find('.options').length == 0) {
            $currentelement.append(finalhtml);
            $('.input_area .options li:first-child').addClass('hlight');
        } else {
            $currentelement.find('.options').remove();
            $currentelement.append(finalhtml);
            $currentelement.find('.options li:first-child').addClass('hlight');
        }
    });
}

// All Keyup events

$('body').on('keyup', '.input_area input', function(e) {
    $currentelement = $(this).closest('.input_area');

    //event for space,enter,comma 
    if (e.keyCode === 13 || e.keyCode === 0 || e.keyCode === 32) {
        if ($('.hlight').length != 0) {
            currentval = $(this).closest('.input_area').find('input').val();
            app.create_tags($('.hlight').html(), currentval);
            $('.input_area .options').remove();
            $('.input_area input').val('').focus();
        } else
            app.create_tags($('.input_area input').val());
        $('.input_area input').val('');
    }
    // event for backspace
    else if (e.keyCode == 8 && ($('.input_area input').val() == '')) {
        if ($('.each_tag').length != 0) {
            $(this).closest('.input_area').remove();
            $('ul .each_tag').last().html('<input type="text" data-eng = "" value="' + $('ul .each_tag').last().attr('data-eng').trim() + '" placeholder="" autofocus="">').attr('class', 'input_area');
            $(".input_area input").focus();
            $currentelement = $(".input_area");
            $(".input_area input").val($(".input_area input").val());
            app.translatetext($('.input_area input').val());
        } else
            $(".input_area .options").remove();

    }
    // event for down arrow
    else if (e.keyCode == 40) {
        if ($('.hlight').length == 0)
            $('.input_area .options li:first-child').addClass('hlight');
        else {
            $cur = $('.hlight');
            $('.hlight').next().addClass('hlight');
            $cur.removeClass('hlight')
        }
    }
    // event for up arrow
    else if (e.keyCode == 38) {
        if ($('.hlight').length == 0)
            $('.input_area .options li:first-child').addClass('hlight');
        else {
            $cur = $('.hlight');
            $('.hlight').prev().addClass('hlight');
            $cur.removeClass('hlight')
        }
    } else {
        currenttranslate = app.translatetext($('.input_area input').val());

    }
});

//focus input on click box

$('body').on('click', '.translate_box', function(ev) {
    $('.input_area input').focus();
});

// On Click elesewhere remove suggestion box

$(document).mouseup(function(e) {
    var container = $(".translate_box");
    if (!container.is(e.target) // if the target of the click isn't the container...
        &&
        container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        if ($(".input_area input").val() != '') {
            currentval = $('.input_area').find('input').val();
            app.create_tags($('.hlight').html(), currentval);
            $('.input_area').find('.options').remove();
            $(".input_area input").val('');
        }

    }
});

// On select li update input box

$('body').on('click', '.input_area .options li', function(e) {
    currentval = $(this).closest('.input_area').find('input').val();
    $(this).closest('.input_area').find('input').val('');
    app.create_tags($(this).html(), currentval);
    $(this).closest('.input_area').find('.options').remove();
    $(".input_area input").focus();
})