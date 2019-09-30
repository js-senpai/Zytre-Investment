document.addEventListener("DOMContentLoaded", function() {
    // Слайдер видео
    $(".video-slider").owlCarousel({
        loop: true,
        navText : ["",""],
        autoplayHoverPause: true,
        lazyLoad: true,
        autoplay: true,
        nav: false,
        dots: true,
        responsive: {
            0:{
                items: 1,
                margin: 0,
                autoWidth: false,
                nav: false,
                dots: true
            },
            680:{
                items: 2,
                margin: 20,
                autoWidth: false,
                nav: false,
                dots: true
            },
            993: {
                items: 3,
                margin: 40,
                autoWidth: true,
                center: false,
                nav: false,
                dots: true
            }
        }
    });
    $('.youtube').click(function () {
        $('.video-slider').trigger('stop.owl.autoplay');
    });
    // Слайдер отзывов
    $(".rewiews-slider").owlCarousel({
        items: 3,
        nav: false,
        dots: true,
        loop: true,
        autoplayHoverPause: true,
        lazyLoad: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                margin: 0,
                autoWidth: false,
                center: true
            },
            993: {
                items: 3,
                margin: 30,
                autoWidth: true,
                center: true
            }
        }
    });
    // Попапы
    $(document).on('click','.btn-tarif',function (e) {
        e.preventDefault();
        let link = $(this).attr('href');
        $('.popup-background').fadeIn('slow');
        $(link).fadeIn('slow');
    });
    $('.popup-close').click(function () {
        $(this).parent().parent().fadeOut('slow');
        $('.popup-background').fadeOut('slow');
    });
    // Активация анимации
    new WOW().init();
   // Мобильное меню
   $('.toggle-menu').click(function () {
       if($(this).hasClass('active')){
           $(this).addClass('disabled');
           $(this).removeClass('active');
           $('.header-nav').slideUp('slow');
       }else{
           $(this).addClass('active');
           $(this).removeClass('disabled');
           $('.header-nav').slideDown('slow');
       }
   });
   // Плавный скролл
    $("a.scroll-to").on("click", function(e){
        e.preventDefault();
        var anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 60
        }, 3500);
    });
});