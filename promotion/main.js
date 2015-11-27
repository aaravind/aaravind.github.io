

$(document).ready(function () {

    $(".promotionimageitem .promotioninner").mouseover(function () {

        $(this).find('.overlayimage').css('display', 'block');
        $(this).find('.image_act').css('visibility', 'visible');
    });
    $(".promotionimageitem .promotioninner").mouseout(function () {
        $(this).find('.overlayimage').css('display', 'none');
         $(this).find('.image_act').css('visibility', 'hidden');
    });
});