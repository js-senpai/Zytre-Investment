document.addEventListener("DOMContentLoaded", function() {
    $(".video-slider").owlCarousel({
        items: 3,
        nav: true,
        dots: true,
        loop: true,
        navText : ["",""],
        autoWidth: true,
        autoplayHoverPause: true,
        lazyLoad: true,
        autoplay: true,
        margin: 40
    });
});