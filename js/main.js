(function ($) {
    "use strict";
    
    // common variable
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        headTag = $('head'),
        body = $('body'),
        mainNavbar = $('.header_area.navbar'),
        isMobile = windowWidth < 768;
    
    /*
     * Replace all SVG images with inline SVG
     */
    $('img.svg').each(function () {
        var $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');

    });
    
    // mobile Menu area
    $('nav.mobile_menu').meanmenu({
        meanScreenWidth: '767'
    });
    $('nav.mean-nav li > a:first-child').on('click', function () {
        $('a.meanmenu-reveal').click();
    });
    
    // Video Slider js
    $('.video_slider').tubular({
        videoId: 'wAcc0K04__s'
    });
    
    /*====== camera slider for Home-2 ======*/
    isMobile ? windowHeight = 648 : null;
    var camWraper = $('.camera_wraper');
    if (camWraper.length) {
        camWraper.camera({
            height: windowHeight + 'px',
            pagination: false,
            autoAdvance: false,
            thumbnails: false,
            loader: false,
            playPause: false,
            fx: 'random'
        });
    }
    // Jquery counterUp
    $('.counter').counterUp({
        time: 3000
    });
    
    // Owl Carousel for Main Slider
    var projectslider = $('.project_slider, .partner_slider');
    projectslider.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    
    $('ul.project_nav li').eq(0).on('click', function () {
        console.log('prev');
        projectslider.trigger('prev.owl.carousel');
    });
    $('ul.project_nav li').eq(1).on('click', function () {
                console.log('nxt');
        projectslider.trigger('next.owl.carousel');
    });
    // jQuery Venobox
    $('a.veno').venobox({
        numeratio: true,
        infinigall: true 
    });
    // Owl Carousel for Main Slider
        var patientslide = $('#patient_slide');
        patientslide.owlCarousel({
            loop: true,
            margin: 30,
            autoplay: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                992: {
                    items: 1
                }
            }
        });
    $('ul.client_nav li').eq(0).on('click', function () {
        patientslide.trigger('prev.owl.carousel');
    });
    $('ul.client_nav li').eq(1).on('click', function () {
        patientslide.trigger('next.owl.carousel');
    });
    // Owl Carousel for Main Slider
    var myblogslider = $('.myblog_slider');
    myblogslider.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    // --------- Google Map init ----------  //
    var googleMapSelector = $('#map'),
        myCenter = new google.maps.LatLng(40.789886, -74.056700);

    function initialize() {
        var mapProp = {
            center: myCenter,
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapProp);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE,
            icon: 'img/google-pin.png'
        });
        marker.setMap(map);
    }
    if (googleMapSelector.length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    
    //setTimeout function
    setTimeout(function () {

        // Jquery Scroll Spay
        body.scrollspy({
            target: '.navbar-collapse',
            offset: 81
        });
       
        //Affix
        mainNavbar.affix({
            offset: {
                top: 80
            }
        });
        
        // Jquery Smooth Scroll
        $('.smoth-scroll a, .go-down').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 80 + 'px'
            }, 1500, 'easeInOutCubic');
            event.preventDefault();
        });

    }, 500);
    
    // SKILLS JS
    
    function RXprogress(RXprogressClass) {
        RXprogressClass = $(RXprogressClass);
        RXprogressClass.each(function () {
            var $this = $(this),
                progressAnimate = function () {
                    $this.toggleClass('slideInLeft');
                };
            $this.waypoint(progressAnimate, { offset: '80'}).waypoint(progressAnimate, { offset: 'bottom-in-view'});

        });
    }
    
    // Jquery Parallax
    $(window).load(function () {
        // $('.subscribe_area').parallax('50%', 0.2);
        $('.faculty_area').parallax('50%', 0.2);
        $('.why_chosseme').parallax('50%', 0.2);
        $('.newslatter').parallax('50%', 0.2);
        $('.parallax_area').parallax('50%', 0.2);
        

        RXprogress('.progress-bar');
        /*skillAndVideoBgRight();*/
        
        
    });
    
    $(window).scroll(function () {
        //affix
        if ($(window).scrollTop() >= windowHeight - 81) {
            mainNavbar.addClass('sticky');
        } else {
            mainNavbar.removeClass('sticky');
        }
    });
    
})(jQuery);