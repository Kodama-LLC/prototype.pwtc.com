$(document).foundation();
$('.slick').slick({
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    speed: 250,
    dots: true
});
$('.scroll-to-contact').click(function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".footer form").offset().top
    }, 2000, function() {
        $(".footer form [type='email']").focus();
    });
});
var is_prev_days_shown = false;
$('.toggle-previous-days').click(function(){
    $('.day.previous').toggle();
    is_prev_days_shown = !is_prev_days_shown;
    
    if(is_prev_days_shown) {
        $(this).html("Hide previous days in this month");
    } else {
        $(this).html("Show previous days in this month");
    }
});
$(window).on("scroll", function(){
    if($(document).scrollTop() > $(window).height()) {
        $('a.scroll-to-top').fadeIn();
    } else {
        $('a.scroll-to-top').fadeOut();
    }
});
$('a.scroll-to-top').on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});