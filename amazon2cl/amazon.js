var vTabs = $('.s-vtabs-tab');
var totalfiltercount = 0;
var scrollingviaLHS = false;
var clickHandlerforLHSTab = function() {
    // $('.s-vtabs-contents-container #' + this.id).scrollIntoView();
    $( ".s-vtabs-tabs-container .s-vtabs-tab" ).removeClass( "s-vtab-active s-background-color-white s-background-color-pearl" );
    $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + this.id+'"]' ).addClass( "s-vtab-active s-background-color-white" );
    scrollingviaLHS = true;
    document.querySelector('.s-vtabs-contents-container [id="' + this.id+'"]').scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      $('.s-vtabs-contents-container').on("scrollend",function(){
        scrollingviaLHS = false;
     });
};

for (var i = 0; i < vTabs.length; i++) {
    vTabs[i].addEventListener('click', clickHandlerforLHSTab, false);
}
//<span class="a-size-mini a-color-base puis-normal-weight-text">1</span>
document.querySelector('.s-vtabs-contents-container').addEventListener('click',function(e){
    if(e.target.closest('.sf-filter-section a')){
        e.preventDefault();
        var tabsSelectedContent = $(e.target.closest('.s-vtabs-content'))[0];
        $( ".s-vtabs-tabs-container .s-vtabs-tab" ).removeClass( "s-vtab-active s-background-color-white s-background-color-pearl" );
        $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).addClass( "s-vtab-active s-background-color-white" );
        $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' )[0].scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        if($(e.target.closest('.sf-filter-section a.s-filter-item-selected'))[0]){
            $(e.target.closest('.sf-filter-section a')).removeClass('s-filter-item-selected');
            $(e.target.closest('.sf-filter-section a')).find('span').removeClass('a-color-link');
            $(e.target.closest('.sf-filter-section a')).find('.sf-icon-deselect').remove();
        }
        else {
            $(e.target.closest('.sf-filter-section a')).addClass('s-filter-item-selected');
            $(e.target.closest('.sf-filter-section a')).find('span').addClass('a-color-link');
            $(e.target.closest('.sf-filter-section a')).append('<div class="a-section sf-icon-deselect"><i class="a-icon a-icon-close" role="presentation"></i></div>')
        }
        var findSelectedCount = $(e.target.closest('.s-vtabs-content')).find('.s-filter-item-selected');
        if(findSelectedCount && findSelectedCount.length){
            if($( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).find('.countlength')[0]){
                $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).find('.countlength').remove();
            }
            $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).find('.sf-vtab').append('<span class="a-size-mini a-color-base puis-normal-weight-text countlength">'+ findSelectedCount.length +'</span>')
        }
        else {
            if($( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).find('.countlength')[0]){
                $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + tabsSelectedContent.id+'"]' ).find('.countlength').remove();
            }
        }
    }
})

const rootParent = document.querySelector(".s-vtabs-contents-container");

const allVtabsSection = document.querySelectorAll(".s-vtabs-contents-container .s-vtabs-content");
var timer = '';
const onIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !scrollingviaLHS) {
        $( ".s-vtabs-tabs-container .s-vtabs-tab" ).removeClass( "s-vtab-active s-background-color-white s-background-color-pearl" );
        $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + entry.target.id+'"]' ).addClass( "s-vtab-active s-background-color-white" );
        if(timer){
            clearTimeout(timer);
        }
        if(isElementVisible($( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + entry.target.id+'"]' )[0])){
            return;
        }
        timer = setTimeout(function() {
            $( '.s-vtabs-tabs-container .s-vtabs-tab[id="' + entry.target.id+'"]' )[0].scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
        },1000)
    }
  });
};

function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

for (var i = 0; i < allVtabsSection.length; i++) {
    var observer = new IntersectionObserver(onIntersect, {
        root: rootParent,
        rootMargin: '-1% 0% -99% 0%',
      });
      
    observer.observe(allVtabsSection[i]);
}

$('[data-action="super-filter-close"]').on('click', function(e){
    e.preventDefault();
    hideFilter();
});
$('[data-action="sf-clear-filters"]').on('click', function(e){
    e.preventDefault();
    hideFilter();
});
//a-sheet-web-container
$( document ).ready(function() {
    $('.a-sheet-web-container')[0].style.transform = "translateY(-"+window.innerHeight+"px)";
});

$('.filterbutton').on('click', function(e){
    e.preventDefault();
    showFilter();
});
$('.sf-show-results').on('click', function(e){
    e.preventDefault();
    hideFilter();
});

function showFilter(){
    $('.a-sheet-web-container')[0].style.transform = "translateY(0px)";
    $('.a-sheet-web-container')[0].style.height = window.innerHeight - 120 + 'px';
    $('.a-sheet-web-container').removeClass('aok-hidden');
    $('.a-sheet-web-container .a-sheet-web')[0].style.height = window.innerHeight - 120 + 'px';
    $('.sf-bottom-nav.sf-bottom-nav-current').removeClass('aok-hidden');
    $('.sf-bottom-nav.sf-bottom-nav-current').removeClass('aok-hidden');
    $('.a-sheet-lightbox.sf-lightbox').removeClass('aok-hidden');
    $('body')[0].style.overflow = 'hidden'; 
    document.querySelector('.s-vtabs-tabs-container').scrollTop = 0;
    document.querySelector('.s-vtabs-contents-container').scrollTop = 0;
    $( ".s-vtabs-tabs-container .s-vtabs-tab" ).removeClass( "s-vtab-active s-background-color-white s-background-color-pearl" );
    $('.s-vtabs-tabs-container #intermediateRefinements').addClass( "s-vtab-active s-background-color-white" );
}

function hideFilter(){
    $('.a-sheet-web-container')[0].style.transform = "translateY(-"+window.innerHeight+"px)";
    $('.a-sheet-web-container')[0].style.height = '0px';
    $('.a-sheet-web-container').addClass('aok-hidden');
    $('.a-sheet-web-container .a-sheet-web')[0].style.height = '0px';
    $('.sf-bottom-nav.sf-bottom-nav-current').addClass('aok-hidden');
    $('.sf-bottom-nav.sf-bottom-nav-current').addClass('aok-hidden');
    $('.a-sheet-lightbox.sf-lightbox').addClass('aok-hidden');
    $('body')[0].style.overflow = 'auto'; 
}