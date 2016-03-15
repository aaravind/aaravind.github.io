var installmentval;
$( document ).ready(function() {

function callrange(){
$('.installment').jRange({
    from: 1231,
    to: 24000,
    step: 1,
    scale: [0,24000],
    format: '%s',
    width: $('.slide_container').width(), // specify your width here
    showLabels: true,
    theme:'theme-blue',
    snap: true    
});
$('.tenure').jRange({
    from: 2,
    to: 12,
    step: 1,
    scale: [2,12],
    format: '%s',
    width: $('.slide_container').width(), // specify your width here
    showLabels: true,
    theme:'theme-blue',
    snap: true
});
$('.downpayment').jRange({
    from: 19500,
    to: 53212,
    step: 1,
    scale: [19500,53212],
    format: '%s',
    width: $('.slide_container').width(), // specify your width here
    showLabels: true,
    theme:'theme-blue',
    snap: true
});
}
callrange();
window.onresize=function(){
    $('.installment').remove();
    $('.tenure').remove();
    $('.downpayment').remove();
    $('.slider-container').remove();
    $('.addinstall').html('<input type="hidden" class="slider-input installment" value="4300" style="display: none;">');
    $('.addtenure').html('<input type="hidden" class="slider-input tenure" value="12" style="display: none;">');
    $('.addpayment').html('<input type="hidden" class="slider-input downpayment" value="20000" style="display: none;">');
      callrange();
}
});
