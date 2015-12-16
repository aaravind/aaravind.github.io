

$(document).ready(function () {

    /* $(".promotionimageitem .imageactual").hover(function () {
    if ($(this).attr('class').search('open') == -1) {
    $(this).attr('class', 'imageactual open ');
    $(this).parent().parent().find('.overlayimage').css('display', 'block');
    $(this).parent().parent().find('.image_act').css('visibility', 'visible');
    $(this).parent().parent().find('.image_inact').css('visibility', 'visible');
    }
    else {
    $(this).attr('class', 'imageactual');
    $(this).parent().parent().find('.overlayimage').css('display', 'none');
    $(this).parent().parent().find('.image_act').css('visibility', 'hidden');
    $(this).parent().parent().find('.image_inact').css('visibility', 'hidden');
    }

    });
    */


    /* $(".promotionimageitem .imageactual").mouseover(function () {

    if ($(this).attr('class').search('open') == -1) {
    $(this).attr('class', 'imageactual open ');
    $(this).parent().parent().find('.overlayimage').css('display', 'block');
    $(this).parent().parent().find('.image_act').css('visibility', 'visible');
    $(this).parent().parent().find('.image_inact').css('visibility', 'visible');
    }
    });
    $(".promotionimageitem .imageactual").mouseout(function () {
    if ($(this).attr('class').search('open') != -1) { 
    $(this).attr('class', 'imageactual');
    $(this).parent().parent().find('.overlayimage').css('display', 'none');
    $(this).parent().parent().find('.image_act').css('visibility', 'hidden');
    $(this).parent().parent().find('.image_inact').css('visibility', 'hidden');
    }
      
    });*/


    /* $(".promotionimageitem .imageactual").mouseout(function () {
    $(this).parent().parent().find('.overlayimage').css('display', 'none');
    $(this).parent().parent().find('.image_act').css('visibility', 'hidden');
    $(this).parent().parent().find('.image_inact').css('visibility', 'hidden');
    });*/


   $(".promotionimageitem .promotioninner").mouseover(function () {

        $(this).find('.overlayimage').css('display', 'block');
        $(this).find('.image_act').css('visibility', 'visible');
        $(this).find('.image_inact').css('visibility', 'visible');
    });
    $(".promotionimageitem .promotioninner").mouseout(function () {
        $(this).find('.overlayimage').css('display', 'none');
        $(this).find('.image_act').css('visibility', 'hidden');
        $(this).find('.image_inact').css('visibility', 'hidden');
    }); 

});