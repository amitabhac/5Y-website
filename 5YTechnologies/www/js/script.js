﻿/**
 * Global variables*/
//sharat
var userDetail = null;
  var CommonCDN_URL = "http://common.5ytechnologies.com";
  var ProductCDN_URL = "http://product.5ytechnologies.com";
  var CommonServices_URL = "http://bos.services.5ytechnologies.com";// "http://192.168.2.13:8040";
  var RealtimeServer_URL = "http://bos.realtimeservices.5ytechnologies.com";
  var UploadService_URL = "http://bos.uploadutility.5ytechnologies.com";

//var CommonCDN_URL = "http://192.168.2.13:8020";
//var ProductCDN_URL = "http://192.168.2.13:8030";
 // var CommonServices_URL = "http://localhost:2268";// "http://192.168.2.13:8040";
//var RealtimeServer_URL = "http://192.168.2.13:8070";
//var UploadService_URL = "http://192.168.2.14:8010";



  var HomeUrl = '';
  var GoogleClientID = '827260551295-qcu4l87408eobpj5bop6ml1t8lfg508c.apps.googleusercontent.com';
  var OutlookClientID = '0000000040175597';
  var FacebookAppID = '1617225365204598';
   //sharat
/**
 * Global variables*/

 
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),

    isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window,

    plugins = {
        pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
        smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
        bootstrapTooltip: $("[data-toggle='tooltip']"),
        bootstrapTabs: $(".tabs"),
        rdParallax: $(".rd-parallax"),
        rdAudioPlayer: $(".rd-audio"),
        rdVideoPlayer: $(".rd-video-player"),
        responsiveTabs: $(".responsive-tabs"),
        rdGoogleMaps: $("#rd-google-map"),
        rdInputLabel: $(".form-label"),
        rdNavbar: $(".rd-navbar"),
        rdVideoBG: $(".rd-video"),
        regula: $("[data-constraints]"),
        stepper: $("input[type='number']"),
        radio: $("input[type='radio']"),
        checkbox: $("input[type='checkbox']"),
        textRotator: $(".text-rotator"),
        owl: $(".owl-carousel"),
        swiper: $(".swiper-slider"),
        counter: $(".counter"),
        photoSwipeGallery: $("[data-photo-swipe-item]"),
        flickrfeed: $(".flickr"),
        twitterfeed: $(".twitter"),
        progressBar: $(".progress-linear"),
        circleProgress: $(".progress-bar-circle"),
        isotope: $(".isotope"),
        countDown: $(".countdown"),
        stacktable: $(".table-custom"),
        customToggle: $("[data-custom-toggle]"),
        customWaypoints: $('[data-custom-scroll-to]'),
        resizable: $(".resizable"),
        selectFilter: $("select"),
        calendar: $(".rd-calendar"),
        productThumb: $(".product-thumbnails"),
        imgZoom: $(".img-zoom"),
        facebookfeed: $(".facebook"),
        pageLoader: $(".page-loader"),
        searchResults: $(".rd-navbar-search-results"),
        instafeed: $(".instafeed"),
        rdMailForm: $(".rd-mailform"),
        iframeEmbed: $("iframe.embed-responsive-item"),
        bootstrapDateTimePicker: $("[date-time-picker]")
    };

/**
 * Initialize All Scripts
 */
$document.ready(function () {
/***********sharat************************/
    var delay = 500; //1 seconds
    setTimeout(function () {
        getUserProfile();
        if (userDetail == undefined) {
            //if Notloged in redirect him to login page if no access
            //window.location.href = "login.html";
            $("#loginNav").removeClass("none");
            $("#userloggedinDiv").removeClass("none").addClass("none");

        }

        else {
            $("#loginNav").removeClass("none").addClass("none");
            $("#userloggedinDiv").removeClass("none");
            debugger;

            $("#Username").text(" Hello   " + userDetail.DisplayName);            
            $("#userloggedinDiv img:first").attr("src", "" + (userDetail.UserPhoto != "" && userDetail.UserPhoto != null) ? userDetail.UserPhoto : "images/users/user-amanda-smith-90x90.jpg");
        }
    }, delay);

    $(document).on("click", "#footerblogpostDiv", function (event) {
        window.location.href = "blog.html";

    });

    GetPublicUserVirtualGroups();

    $(document).off("click", "#emailSubscribe");
    $(document).on("click", "#emailSubscribe", ScribeToNewsLetter);



    $(document).off("click", "#Logout");
    $(document).on("click", "#Logout", function () {
        window.sessionStorage.clear();
        $("#loginNav").removeClass("none");
        $("#userloggedinDiv").removeClass("none").addClass("none");
    });



/*********************************************************************



    /**
     * isScrolledIntoView
     * @description  check the element whas been scrolled into the view
     */
    function isScrolledIntoView(elem) {
        var $window = $(window);
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
    }


    /**
     * initOnView
     * @description  calls a function when element has been scrolled into the view
     */
    function lazyInit(element, func) {
        var $win = jQuery(window);
        $win.on('load scroll', function () {            
            if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
                func.call(element);
                element.addClass('lazy-loaded');
            }
        });
    }

    /**
     * resizeOnImageLoad
     * @description  calls a resize event when imageloaded
     */
    function resizeOnImageLoad(image) {
        image.onload = function () {
            $window.trigger("resize");
        }
    }


    /**
     * getSwiperHeight
     * @description  calculate the height of swiper slider basing on data attr
     */
    function getSwiperHeight(object, attr) {
        var val = object.attr("data-" + attr),
            dim;

        if (!val) {
            return undefined;
        }

        dim = val.match(/(px)|(%)|(vh)$/i);

        if (dim.length) {
            switch (dim[0]) {
                case "px":
                    return parseFloat(val);
                case "vh":
                    return $(window).height() * (parseFloat(val) / 100);
                case "%":
                    return object.width() * (parseFloat(val) / 100);
            }
        } else {
            return undefined;
        }
    }


    /**
     * toggleSwiperInnerVideos
     * @description  toggle swiper videos on active slides
     // */
    function toggleSwiperInnerVideos(swiper) {
        var videos;

        $.grep(swiper.slides, function (element, index) {
            var $slide = $(element),
                video;

            if (index === swiper.activeIndex) {
                videos = $slide.find("video");
                if (videos.length) {
                    videos.get(0).play();
                }
            } else {
                $slide.find("video").each(function () {
                    this.pause();
                });
            }
        });
    }


    /**
     * toggleSwiperCaptionAnimation
     * @description  toggle swiper animations on active slides
     */
    function toggleSwiperCaptionAnimation(swiper) {
        if (isIE && isIE < 10) {
            return;
        }

        var prevSlide = $(swiper.container),
            nextSlide = $(swiper.slides[swiper.activeIndex]);

        prevSlide
            .find("[data-caption-animate]")
            .each(function () {
                var $this = $(this);
                $this
                    .removeClass("animated")
                    .removeClass($this.attr("data-caption-animate"))
                    .addClass("not-animated");
            });

        nextSlide
            .find("[data-caption-animate]")
            .each(function () {
                var $this = $(this),
                    delay = $this.attr("data-caption-delay");

                setTimeout(function () {
                    $this
                        .removeClass("not-animated")
                        .addClass($this.attr("data-caption-animate"))
                        .addClass("animated");
                }, delay ? parseInt(delay) : 0);
            });
    }

    /**
     * makeParallax
     * @description  create swiper parallax scrolling effect
     */
    function makeParallax(el, speed, wrapper, prevScroll) {
        var scrollY = window.scrollY || window.pageYOffset;

        if (prevScroll != scrollY) {
            prevScroll = scrollY;
            el.addClass('no-transition');
            el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
            el.height();
            el.removeClass('no-transition');

            if (el.attr('data-fade') === 'true') {
                var bound = el[0].getBoundingClientRect(),
                    offsetTop = bound.top * 2 + scrollY,
                    sceneHeight = wrapper.outerHeight(),
                    sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
                    layerDevider = offsetTop + el.outerHeight() / 2.0,
                    pos = sceneHeight / 6.0,
                    opacity;
                if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
                    el[0].style["opacity"] = 1;
                } else {
                    if (sceneDevider - pos < layerDevider) {
                        opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
                    } else {
                        opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
                    }
                    el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
                }
            }
        }

        requestAnimationFrame(function () {
            makeParallax(el, speed, wrapper, prevScroll);
        });
    }

    /**
     * IE Polyfills
     * @description  Adds some loosing functionality to IE browsers
     */
    if (isIE) {
        if (isIE < 10) {
            $html.addClass("lt-ie-10");
        }

        if (isIE < 11) {
            if (plugins.pointerEvents) {
                $.getScript(plugins.pointerEvents)
                    .done(function () {
                        $html.addClass("ie-10");
                        PointerEventsPolyfill.initialize({});
                    });
            }
        }

        if (isIE === 11) {
            $("html").addClass("ie-11");
        }

        if (isIE === 12) {
            $("html").addClass("ie-edge");
        }
    }


    /**
     * Copyright Year
     * @description  Evaluates correct copyright year
     */
    var o = $("#copyright-year");
    if (o.length) {
        o.text(initialDate.getFullYear());
    }


    /**
     * Circle Progress
     * @description Enable Circle Progress plugin
     */
    if (plugins.circleProgress.length) {
        var i;
        for (i = 0; i < plugins.circleProgress.length; i++) {
            var circleProgressItem = $(plugins.circleProgress[i]);
            $document
                .on("scroll", function () {
                    if (!circleProgressItem.hasClass('animated')) {

                        var arrayGradients = circleProgressItem.attr('data-gradient').split(",");

                        circleProgressItem.circleProgress({
                            value: circleProgressItem.attr('data-value'),
                            size: circleProgressItem.attr('data-size') ? circleProgressItem.attr('data-size') : 175,
                            fill: { gradient: arrayGradients, gradientAngle: Math.PI / 4 },
                            startAngle: -Math.PI / 4 * 2,
                            emptyFill: $(this).attr('data-empty-fill') ? $(this).attr('data-empty-fill') : "rgb(245,245,245)"

                        }).on('circle-animation-progress', function (event, progress, stepValue) {
                            $(this).find('span').text(String(stepValue.toFixed(2)).replace('0.', '').replace('1.', '1'));
                        });
                        circleProgressItem.addClass('animated');
                    }
                })
                .trigger("scroll");
        }
    }

    /**
     * Progress bar
     * @description  Enable progress bar
     */
    if (plugins.progressBar.length) {
        for (i = 0; i < plugins.progressBar.length; i++) {
            var progressBar = $(plugins.progressBar[i]);
            $window
                .on("scroll load", $.proxy(function () {
                    var bar = $(this);
                    if (!bar.hasClass('animated-first') && isScrolledIntoView(bar)) {
                        var end = bar.attr("data-to");
                        bar.find('.progress-bar-linear').css({ width: end + '%' });
                        bar.find('.progress-value').countTo({
                            refreshInterval: 40,
                            from: 0,
                            to: end,
                            speed: 500
                        });
                        bar.addClass('animated-first');
                    }
                }, progressBar));
        }
    }

    /**
     * jQuery Countdown
     * @description  Enable countdown plugin
     */
    if (plugins.countDown.length) {
        var i, j;
        for (i = 0; i < plugins.countDown.length; i++) {
            var countDownItem = plugins.countDown[i],
                $countDownItem = $(countDownItem),
                d = new Date(),
                type = countDownItem.getAttribute('data-type'),
                time = countDownItem.getAttribute('data-time'),
                format = countDownItem.getAttribute('data-format'),
                settings = [];

            d.setTime(Date.parse(time)).toLocaleString();
            settings[type] = d;
            settings['format'] = format;

            if ($countDownItem.parents('.countdown-modern').length) {
                settings['onTick'] = function () {
                    var section = $(this).find(".countdown-section");
                    for (j = 0; j < section.length; j++) {
                        $(section[section.length - j - 1]).append('<span class="countdown-letter">' + format[format.length - j - 1] + '</span>')
                    }
                }
            }

            $countDownItem.countdown(settings);
        }
    }

    /**
     * Smooth scrolling
     * @description  Enables a smooth scrolling for Google Chrome (Windows)
     */
    if (plugins.smoothScroll) {
        $.getScript(plugins.smoothScroll);
    }

    /**
     * Bootstrap tabs
     * @description Activate Bootstrap Tabs
     */
    if (plugins.bootstrapTabs.length) {
        var i;
        for (i = 0; i < plugins.bootstrapTabs.length; i++) {
            var bootstrapTab = $(plugins.bootstrapTabs[i]);

            bootstrapTab.on("click", "a", function (event) {
                event.preventDefault();
                $(this).tab('show');
            });
        }
    }

    /**
     * Bootstrap Tooltips
     * @description Activate Bootstrap Tooltips
     */
    if (plugins.bootstrapTooltip.length) {
        plugins.bootstrapTooltip.tooltip();
    }


    /**
     * RD Audio player
     * @description Enables RD Audio player plugin
     */
    if (plugins.rdAudioPlayer.length) {
        var i;
        for (i = 0; i < plugins.rdAudioPlayer.length; i++) {
            $(plugins.rdAudioPlayer[i]).RDAudio();
        }
        var playlistButton = $('.rd-audio-playlist-button');
        var playlist = plugins.rdAudioPlayer.find('.rd-audio-playlist-wrap');
        if (playlistButton.length) {
            playlistButton.on('click', function (e) {
                e.preventDefault();
                plugins.rdAudioPlayer.toggleClass('playlist-show');
                if (playlist.is(':hidden')) {
                    playlist.slideDown(300);
                } else {
                    playlist.slideUp(300);
                }
            });
            $document.on('click', function (e) {
                if (!$(e.target).is(playlist) && playlist.find($(e.target)).length == 0 && !$(e.target).is(playlistButton)) {
                    playlist.slideUp(300);
                }
            });


        }
    }


    /**
     * RD Video Player
     * @description Enables RD Video player plugin
     */
    function hidePlaylist() {
        $(".rd-video-player").removeClass("playlist-show");
    }

    function showPlaylist() {
        $(".rd-video-player").addClass("playlist-show");
    }

    if (plugins.rdVideoPlayer.length) {
        var i;
        for (i = 0; i < plugins.rdVideoPlayer.length; i++) {
            var videoItem = $(plugins.rdVideoPlayer[i]);

            $window.on("scroll", $.proxy(function () {
                var video = $(this);
                if (isDesktop && !video.hasClass("played") && video.hasClass('play-on-scroll') && isScrolledIntoView(video)) {
                    video.find("video")[0].play();
                    video.addClass("played");
                }
            }, videoItem));

            videoItem.RDVideoPlayer({
                callbacks: {
                    onPlay: hidePlaylist,
                    onPaused: showPlaylist,
                    onEnded: showPlaylist
                }
            });
            $window.on('load', showPlaylist);

            var volumeWrap = $(".rd-video-volume-wrap");

            volumeWrap.on("mouseenter", function () {
                $(this).addClass("hover")
            });

            volumeWrap.on("mouseleave", function () {
                $(this).removeClass("hover")
            });

            if (isTouch) {
                volumeWrap.find(".rd-video-volume").on("click", function () {
                    $(this).toggleClass("hover")
                });
                $document.on("click", function (e) {
                    if (!$(e.target).is(volumeWrap) && $(e.target).parents(volumeWrap).length == 0) {
                        volumeWrap.find(".rd-video-volume").removeClass("hover")
                    }
                })
            }
        }
    }


    /**
     * Responsive Tabs
     * @description Enables Responsive Tabs plugin
     */
    if (plugins.responsiveTabs.length) {
        var i = 0;
        for (i = 0; i < plugins.responsiveTabs.length; i++) {
            var $this = $(plugins.responsiveTabs[i]);
            $this.easyResponsiveTabs({
                type: $this.attr("data-type"),
                tabidentify: $this.find(".resp-tabs-list").attr("data-group") || "tab"
            });
        }
    }


    /**
     * RD Google Maps
     * @description Enables RD Google Maps plugin
     */
    if (plugins.rdGoogleMaps.length) {
        $.getScript("http://maps.google.com/maps/api/js?sensor=false&libraries=geometry&v=3.7", function () {
            var head = document.getElementsByTagName('head')[0],
                insertBefore = head.insertBefore;

            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };

            lazyInit(plugins.rdGoogleMaps, function () {
                var styles = plugins.rdGoogleMaps.attr("data-styles");

                plugins.rdGoogleMaps.googleMap({
                    styles: styles ? JSON.parse(styles) : {}
                })
            });
        });
    }

    /**
     * RD Flickr Feed
     * @description Enables RD Flickr Feed plugin
     */
    if (plugins.flickrfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.flickrfeed.length; i++) {
            var flickrfeedItem = $(plugins.flickrfeed[i]);
            flickrfeedItem.RDFlickr({
                callback: function () {
                    var items = flickrfeedItem.find("[data-photo-swipe-item]");

                    if (items.length) {
                        for (var j = 0; j < items.length; j++) {
                            var image = new Image();
                            image.setAttribute('data-index', j);
                            image.onload = function () {
                                items[this.getAttribute('data-index')].setAttribute('data-size', this.naturalWidth + 'x' + this.naturalHeight);
                            };
                            image.src = items[j].getAttribute('href');
                        }
                    }
                }
            });
        }
    }

    /**
     * RD Twitter Feed
     * @description Enables RD Twitter Feed plugin
     */
    if (plugins.twitterfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.twitterfeed.length; i++) {
            var twitterfeedItem = plugins.twitterfeed[i];
            $(twitterfeedItem).RDTwitter({
                hideReplies: false,
                localTemplate: {
                    avatar: "images/features/rd-twitter-post-avatar-48x48.jpg"
                },
                callback: function () {
                    $window.trigger("resize");
                }
            });
        }
    }


    /**
     * RD Input Label
     * @description Enables RD Input Label Plugin
     */
    if (plugins.rdInputLabel.length) {
        plugins.rdInputLabel.RDInputLabel();
    }


    /**
     * Stepper
     * @description Enables Stepper Plugin
     */
    if (plugins.stepper.length) {
        plugins.stepper.stepper({
            labels: {
                up: "",
                down: ""
            }
        });
    }

    /**
     * Radio
     * @description Add custom styling options for input[type="radio"]
     */
    if (plugins.radio.length) {
        var i;
        for (i = 0; i < plugins.radio.length; i++) {
            var $this = $(plugins.radio[i]);
            $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
        }
    }

    /**
     * Checkbox
     * @description Add custom styling options for input[type="checkbox"]
     */
    if (plugins.checkbox.length) {
        var i;
        for (i = 0; i < plugins.checkbox.length; i++) {
            var $this = $(plugins.checkbox[i]);
            $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
        }
    }


    /**
     * Regula
     * @description Enables Regula plugin
     */
    if (plugins.regula.length) {
        for (var i = 0; i < plugins.regula.length; i++) {
            var o = $(plugins.regula[i]), v;
            o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
            v = o.parent().find(".form-validation");
            if (v.is(":last-child")) {
                o.addClass("form-control-last-child");
            }
        }

        plugins.regula
            .on('input change propertychange blur', function (e) {
                var $this = $(this), results;

                if (e.type != "blur") {
                    if (!$this.parent().hasClass("has-error")) {
                        return;
                    }
                }

                if ((results = $this.regula('validate')).length) {
                    for (i = 0; i < results.length; i++) {
                        $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
                    }
                } else {
                    $this.siblings(".form-validation").text("").parent().removeClass("has-error")
                }
            })
            .regula('bind');
    }


    /**
     * WOW
     * @description Enables Wow animation plugin
     */
    if ($html.hasClass('desktop') && $html.hasClass("wow-animation") && $(".wow").length) {
        new WOW().init();
    }


    /**
     * Text Rotator
     * @description Enables Text Rotator plugin
     */
    if (plugins.textRotator.length) {
        var i;
        for (i = 0; i < plugins.textRotator.length; i++) {
            var textRotatorItem = $(plugins.textRotator[i]);
            textRotatorItem.rotator();
        }
    }

    /**
     * jQuery Count To
     * @description Enables Count To plugin
     */
    if (plugins.counter.length) {
        var i;
        for (i = 0; i < plugins.counter.length; i++) {
            var counterItem = $(plugins.counter[i]);

            $window.on("scroll load", $.proxy(function () {
                var counter = $(this);
                if ((!counter.hasClass("animated-first")) && (isScrolledIntoView(counter))) {
                    counter.countTo({
                        refreshInterval: 40,
                        speed: counter.attr("data-speed") || 1000
                    });
                    counter.addClass('animated-first');
                }
            }, counterItem))
        }
    }


    /**
     * Owl carousel
     * @description Enables Owl carousel plugin
     */
    if (plugins.owl.length) {
        var k;
        for (k = 0; k < plugins.owl.length; k++) {
            var c = $(plugins.owl[k]),
                responsive = {};

            var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
                values = [0, 480, 768, 992, 1200],
                i, j;

            for (i = 0; i < values.length; i++) {
                responsive[values[i]] = {};
                for (j = i; j >= -1; j--) {
                    if (!responsive[values[i]]["items"] && c.attr("data" + aliaces[j] + "items")) {
                        responsive[values[i]]["items"] = j < 0 ? 1 : parseInt(c.attr("data" + aliaces[j] + "items"));
                    }
                    if (!responsive[values[i]]["stagePadding"] && responsive[values[i]]["stagePadding"] !== 0 && c.attr("data" + aliaces[j] + "stage-padding")) {
                        responsive[values[i]]["stagePadding"] = j < 0 ? 0 : parseInt(c.attr("data" + aliaces[j] + "stage-padding"));
                    }
                    if (!responsive[values[i]]["margin"] && responsive[values[i]]["margin"] !== 0 && c.attr("data" + aliaces[j] + "margin")) {
                        responsive[values[i]]["margin"] = j < 0 ? 30 : parseInt(c.attr("data" + aliaces[j] + "margin"));
                    }
                    if (!responsive[values[i]]["dotsEach"] && responsive[values[i]]["dotsEach"] !== 0 && c.attr("data" + aliaces[j] + "dots-each")) {
                        responsive[values[i]]["dotsEach"] = j < 0 ? false : parseInt(c.attr("data" + aliaces[j] + "dots-each"));
                    }
                }
            }

            // Create custom Pagination
            if (c.attr('data-dots-custom')) {
                c.on("initialized.owl.carousel", function (event) {
                    var carousel = $(event.currentTarget),
                        customPag = $(carousel.attr("data-dots-custom")),
                        active = 0;

                    if (carousel.attr('data-active')) {
                        active = parseInt(carousel.attr('data-active'));
                    }

                    carousel.trigger('to.owl.carousel', [active, 300, true]);
                    customPag.find("[data-owl-item='" + active + "']").addClass("active");

                    customPag.find("[data-owl-item]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
                    });

                    carousel.on("translate.owl.carousel", function (event) {
                        customPag.find(".active").removeClass("active");
                        customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
                    });
                });
            }

            // Create custom Navigation
            if (c.attr('data-nav-custom')) {
                c.on("initialized.owl.carousel", function (event) {
                    var carousel = $(event.currentTarget),
                        customNav = $(carousel.attr("data-nav-custom"));

                    customNav.find("[data-owl-prev]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('prev.owl.carousel', [300]);
                    });

                    customNav.find("[data-owl-next]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('next.owl.carousel', [300]);
                    });
                });
            }

            c.owlCarousel({
                autoplay: c.attr("data-autoplay") === "true",
                loop: c.attr("data-loop") === "true",
                items: 1,
                autoplaySpeed: 600,
                autoplayTimeout: 3000,
                dotsContainer: c.attr("data-pagination-class") || false,
                navContainer: c.attr("data-navigation-class") || false,
                mouseDrag: c.attr("data-mouse-drag") === "true",
                nav: c.attr("data-nav") === "true",
                dots: c.attr("data-dots") === "true",
                dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
                responsive: responsive,
                animateOut: c.attr("data-animation-out") || false,
                navText: $.parseJSON(c.attr("data-nav-text")) || [],
                navClass: $.parseJSON(c.attr("data-nav-class")) || ['owl-prev', 'owl-next']
            });

        }
    }


    /**
     * Swiper 3.1.7
     * @description  Enable Swiper Slider
     */
    if (plugins.swiper.length) {
        plugins.swiper.each(function () {
            var s = $(this);

            var pag = s.find(".swiper-pagination"),
                next = s.find(".swiper-button-next"),
                prev = s.find(".swiper-button-prev"),
                bar = s.find(".swiper-scrollbar"),
                h = getSwiperHeight(plugins.swiper, "height"), mh = getSwiperHeight(plugins.swiper, "min-height"),
                parallax = s.parents('.rd-parallax').length;

            s.find(".swiper-slide")
                .each(function () {
                    var $this = $(this),
                        url;

                    if (url = $this.attr("data-slide-bg")) {
                        $this.css({
                            "background-image": "url(" + url + ")",
                            "background-size": "cover"
                        })
                    }

                })
                .end()
                .find("[data-caption-animate]")
                .addClass("not-animated")
                .end()
                .swiper({
                    autoplay: s.attr('data-autoplay') === "true" ? 5000 : 7000,
                    direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
                    effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
                    speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
                    keyboardControl: s.attr('data-keyboard') === "true",
                    mousewheelControl: s.attr('data-mousewheel') === "true",
                    mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
                    nextButton: next.length ? next.get(0) : null,
                    prevButton: prev.length ? prev.get(0) : null,
                    pagination: pag.length ? pag.get(0) : null,
                    simulateTouch: false,
                    paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
                    paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    } : null : null,
                    scrollbar: bar.length ? bar.get(0) : null,
                    scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
                    scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
                    loop: s.attr('data-loop') !== "false",
                    loopAdditionalSlides: 0,
                    loopedSlides: 0,
                    onTransitionStart: function (swiper) {
                        toggleSwiperInnerVideos(swiper);
                    },
                    onTransitionEnd: function (swiper) {
                        toggleSwiperCaptionAnimation(swiper);
                        $(window).trigger("resize");
                    },

                    onInit: function (swiper) {
                        toggleSwiperInnerVideos(swiper);
                        toggleSwiperCaptionAnimation(swiper);

                        if (plugins.pageLoader.length) {
                            var srcFirst = $("#page-loader").attr("data-slide-bg"),
                              image = document.createElement('img');

                            image.src = srcFirst;
                            image.onload = function () {
                                plugins.pageLoader.addClass("loaded");
                            };
                        }

                        // Create parallax effect on swiper caption
                        s.find(".swiper-parallax")
                            .each(function () {
                                var $this = $(this),
                                    speed;

                                if (parallax && !isIE && !isMobile) {
                                    if (speed = $this.attr("data-speed")) {
                                        makeParallax($this, speed, s, false);
                                    }
                                }
                            });
                        $(window).on('resize', function () {
                            swiper.update(true);
                        })
                    },
                    onSlideChangeStart: function (swiper) {
                        var activeSlideIndex, slidesCount, thumbsToShow = 3;

                        activeSlideIndex = swiper.activeIndex;
                        slidesCount = swiper.slides.not(".swiper-slide-duplicate").length;

                        //If there is not enough slides
                        if (slidesCount < thumbsToShow)
                            return false;

                        //Fix index count
                        if (activeSlideIndex === slidesCount + 1) {
                            activeSlideIndex = 1;
                        } else if (activeSlideIndex === 0) {
                            activeSlideIndex = slidesCount;
                        }

                        //Lopp that adds background to thumbs
                        for (var i = -thumbsToShow; i < thumbsToShow + 1; i++) {
                            if (i === 0)
                                continue;

                            //Previous btn thumbs
                            if (i < 0) {
                                //If there is no slides before current
                                if ((activeSlideIndex + i - 1) < 0) {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[slidesCount + i + 1].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }

                                //Next btn thumbs
                            } else {
                                //If there is no slides after current
                                if (activeSlideIndex + i - 1 > slidesCount) {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[i].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }
                            }
                        }
                    },
                    on2SlideChangeStart: function (swiper) {
                        var activeSlideIndex, slidesCount, thumbsToShow = 3;

                        activeSlideIndex = swiper.activeIndex;
                        slidesCount = swiper.slides.not(".swiper-slide-duplicate").length;

                        //If there is not enough slides
                        if (slidesCount < thumbsToShow)
                            return false;

                        //Fix index count
                        if (activeSlideIndex === slidesCount + 1) {
                            activeSlideIndex = 1;
                        } else if (activeSlideIndex === 0) {
                            activeSlideIndex = slidesCount;
                        }

                        //Loop that adds background to thumbs
                        for (var i = -thumbsToShow; i < thumbsToShow + 1; i++) {
                            if (i === 0)
                                continue;

                            //Previous btn thumbs
                            if (i < 0) {
                                //If there is no slides before current
                                if ((activeSlideIndex + i - 1) < 0) {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[slidesCount + i + 1].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }

                                //Next btn thumbs
                            } else {
                                //If there is no slides after current
                                if (activeSlideIndex + i - 1 > slidesCount) {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[i].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }
                            }
                        }
                    }
                });

            $(window)
                .on("resize", function () {
                    var mh = getSwiperHeight(s, "min-height"),
                        h = getSwiperHeight(s, "height");
                    if (h) {
                        s.css("height", mh ? mh > h ? mh : h : h);
                    }
                })
                .load(function () {
                    s.find("video").each(function () {
                        if (!$(this).parents(".swiper-slide-active").length) {
                            this.pause();
                        }
                    });
                })
                .trigger("resize");
        });
    }

    /**
     * Isotope
     * @description Enables Isotope plugin
     */

    if (plugins.isotope.length) {
        var i, isogroup = [];
        for (i = 0; i < plugins.isotope.length; i++) {
            var isotopeItem = plugins.isotope[i]
                , iso = new Isotope(isotopeItem, {
                    itemSelector: '.isotope-item',
                    layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
                    filter: '*'
                });

            isogroup.push(iso);
        }

        $(window).on('load', function () {
            setTimeout(function () {
                var i;
                for (i = 0; i < isogroup.length; i++) {
                    isogroup[i].element.className += " isotope--loaded";
                    isogroup[i].layout();
                }
            }, 600);
        });

        var resizeTimout;

        $("[data-isotope-filter]").on("click", function (e) {
            e.preventDefault();
            var filter = $(this);
            clearTimeout(resizeTimout);
            filter.parents(".isotope-filters").find('.active').removeClass("active");
            filter.addClass("active");
            var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');
            iso.isotope({
                itemSelector: '.isotope-item',
                layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
                filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]'
            });
            //resizeTimout = setTimeout(function () {
            //  $window.trigger('resize');
            //}, 300);
        }).eq(0).trigger("click")
    }


    /**
     * RD Video
     * @description Enables RD Video plugin
     */
    if (plugins.rdVideoBG.length) {
        for (i = 0; i < plugins.rdVideoBG.length; i++) {
            var videoItem = $(plugins.rdVideoBG[i]);
            videoItem.RDVideo({});
        }
    }


    /**
     * RD Navbar
     * @description Enables RD Navbar plugin
     */
    if (plugins.rdNavbar.length) {
        plugins.rdNavbar.RDNavbar({
            stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
            stickUpOffset: (plugins.rdNavbar.attr("data-stick-up-offset")) ? plugins.rdNavbar.attr("data-stick-up-offset") : 1
        });
    }


    /**
     * PhotoSwipe Gallery
     * @description Enables PhotoSwipe Gallery plugin
     */
    if (plugins.photoSwipeGallery.length) {

        // init image click event
        $document.delegate("[data-photo-swipe-item]", "click", function (event) {
            event.preventDefault();

            var $el = $(this),
                $galleryItems = $el.parents("[data-photo-swipe-gallery]").find("a[data-photo-swipe-item]"),
                pswpElement = document.querySelectorAll('.pswp')[0],
                encounteredItems = {},
                pswpItems = [],
                options,
                pswpIndex = 0,
                pswp;

            if ($galleryItems.length == 0) {
                $galleryItems = $el;
            }

            // loop over the gallery to build up the photoswipe items
            $galleryItems.each(function () {
                var $item = $(this),
                    src = $item.attr('href'),
                    size = $item.attr('data-size').split('x'),
                    pswdItem;

                if ($item.is(':visible')) {

                    // if we have this image the first time
                    if (!encounteredItems[src]) {
                        // build the photoswipe item
                        pswdItem = {
                            src: src,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10),
                            el: $item // save link to element for getThumbBoundsFn
                        };

                        // store that we already had this item
                        encounteredItems[src] = {
                            item: pswdItem,
                            index: pswpIndex
                        };

                        // push the item to the photoswipe list
                        pswpItems.push(pswdItem);
                        pswpIndex++;
                    }
                }
            });

            options = {
                index: encounteredItems[$el.attr('href')].index,

                getThumbBoundsFn: function (index) {
                    var $el = pswpItems[index].el,
                        offset = $el.offset();

                    return {
                        x: offset.left,
                        y: offset.top,
                        w: $el.width()
                    };
                }
            };

            // open the photoswipe gallery
            pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpItems, options);
            pswp.init();
        });
    }

    /**
     * Stacktable
     * @description Enables Stacktable plugin
     */
    if (plugins.stacktable.length) {
        var i;
        for (i = 0; i < plugins.stacktable.length; i++) {
            var stacktableItem = $(plugins.stacktable[i]);
            stacktableItem.stacktable();
        }
    }


    /**
     * Select2
     * @description Enables select2 plugin
     */
    if (plugins.selectFilter.length) {
        var i;
        for (i = 0; i < plugins.selectFilter.length; i++) {
            var select = $(plugins.selectFilter[i]);

            select.select2({
                theme: "bootstrap"
            }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
        }
    }

    /**
     * Product Thumbnails
     * @description Enables product thumbnails
     */
    if (plugins.productThumb.length) {
        var i;
        for (i = 0; i < plugins.productThumb.length; i++) {
            var thumbnails = $(plugins.productThumb[i]);

            thumbnails.find("li").on('click', function () {
                var item = $(this);
                item.parent().find('.active').removeClass('active');
                var image = item.parents(".product").find(".product-image-area");
                image.removeClass('animateImageIn');
                image.addClass('animateImageOut');
                item.addClass('active');
                setTimeout(function () {
                    var src = item.find("img").attr("src");
                    if (item.attr('data-large-image')) {
                        src = item.attr('data-large-image');
                    }
                    image.attr("src", src);
                    image.removeClass('animateImageOut');
                    image.addClass('animateImageIn');
                }, 300);
            })
        }
    }


    /**
     * RD Calendar
     * @description Enables RD Calendar plugin
     */
    if (plugins.calendar.length) {
        for (i = 0; i < plugins.calendar.length; i++) {
            var calendarItem = $(plugins.calendar[i]);

            calendarItem.rdCalendar({
                days: calendarItem.attr("data-days") ? c.attr("data-days").split(/\s?,\s?/i) : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                month: calendarItem.attr("data-months") ? c.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            });
        }
    }

    /**
     * jQuery elevateZoom
     * @description Enables jQuery elevateZoom plugin
     */
    if (plugins.imgZoom.length) {
        for (i = 0; i < plugins.imgZoom.length; i++) {
            var zoomItem = $(plugins.imgZoom[i]);

            zoomItem.elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 300,
                zoomWindowFadeOut: 300,
                scrollZoom: true
            });
        }
    }

    /**
     * RD Facebook
     * @description Enables RD Facebook plugin
     */
    if (plugins.facebookfeed.length > 0) {
        for (i = 0; i < plugins.facebookfeed.length; i++) {
            var facebookfeedItem = plugins.facebookfeed[i];
            $(facebookfeedItem).RDFacebookFeed({
                callbacks: {
                    postsLoaded: function () {
                        var posts = $('.post-facebook');
                        var i = 0;
                        for (i = 0; i < posts.length; i++) {
                            var $this = $(posts[i]);
                            var commentBlock = $this.find('.post-comments');
                            var commentBlockItem = $this.find('.post-comments [data-fb-comment]');
                            var j = 0;
                            for (j = 0; j < commentBlockItem.length; j++) {
                                var commentItem = commentBlockItem[j];
                                if (commentItem.innerHTML.trim().length == 0) {
                                    $(commentItem).remove();
                                }
                            }
                            if (commentBlock.find('[data-fb-comment]').length == 0) {
                                commentBlock.remove();
                            }
                        }

                        $window.trigger("resize");
                    }
                }
            })
        }
    }

    /**
     * Page loader
     * @description Enables Page loader
     */
    if (plugins.pageLoader.length > 0) {

        $window.on("load", function () {
            var loader = setTimeout(function () {
                plugins.pageLoader.addClass("loaded");
                $window.trigger("resize");
            }, 200);
        });

    }

    /**
     * Search Results
     * @description Enables Search results page
     */
    if (plugins.searchResults.length > 0) {
        var handler = "bat/rd-search.php";

        var term = location.search.replace(/^\?.*s=([^&]+)/, "$1");
        $.get(handler, { s: decodeURI(term), liveSearch: "false", dataType: "html" }, function (data) {
            plugins.searchResults.html(data);
        })
    }

    /**
     * RD Instafeed
     * @description Enables Instafeed
     */
    if (plugins.instafeed.length > 0) {
        var i;
        for (i = 0; i < plugins.instafeed.length; i++) {
            var instafeedItem = $(plugins.instafeed[i]);
            instafeedItem.RDInstafeed({});
        }
    }

    /**
     * UI To Top
     * @description Enables ToTop Button
     */
    if (isDesktop) {
        $().UItoTop({
            easingType: 'easeOutQuart',
            containerClass: 'ui-to-top icon icon-xs icon-circle icon-darker-filled mdi mdi-chevron-up'
        });
    }


    /**
     * RD Mailform
     */

    if (plugins.rdMailForm.length) {
        var i, j, k,
            msg = {
                'MF000': 'Successfully sent!',
                'MF001': 'Recipients are not set!',
                'MF002': 'Form will not work locally!',
                'MF003': 'Please, define email field in your form!',
                'MF004': 'Please, define type of your form!',
                'MF254': 'Something went wrong with PHPMailer!',
                'MF255': 'Aw, snap! Something went wrong.'
            };
        for (i = 0; i < plugins.rdMailForm.length; i++) {
            var $form = $(plugins.rdMailForm[i]);

            $form.attr('novalidate', 'novalidate').ajaxForm({
                data: {
                    "form-type": $form.attr("data-form-type") || "contact",
                    "counter": i
                },
                beforeSubmit: function () {
                    var form = $(plugins.rdMailForm[this.extraData.counter]);
                    var inputs = form.find("[data-constraints]"), results;
                    var errors = 0;
                    for (j = 0; j < inputs.length; j++) {

                        var $input = $(inputs[j]);

                        if ((results = $input.regula('validate')).length) {
                            for (k = 0; k < results.length; k++) {
                                errors++;
                                $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                            }
                        } else {
                            $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                        }
                    }

                    if (errors != 0) return false;

                    var output = $("#" + form.attr("data-form-output"));

                    if (output.hasClass("snackbars")) {
                        output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
                        output.addClass("active");
                    }
                },
                error: function (result) {
                    var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));
                    output.text(msg[result]);
                },
                success: function (result) {
                    var form = $(plugins.rdMailForm[this.extraData.counter]);
                    var output = $("#" + form.attr("data-form-output"));
                    result = result.length == 5 ? result : 'MF255';
                    output.text(msg[result]);
                    if (result === "MF000") {
                        if (output.hasClass("snackbars")) {
                            output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
                        } else {
                            output.addClass("success");
                            output.addClass("active");
                        }
                    } else {
                        if (output.hasClass("snackbars")) {
                            output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
                        } else {
                            output.addClass("error");
                            output.addClass("active");
                        }
                    }
                    form.clearForm();

                    setTimeout(function () {
                        output.removeClass("active");
                    }, 5000);
                }
            });
        }
    }

    /**
     * Custom Toggles
     */
    if (plugins.customToggle.length) {
        var i;
        for (i = 0; i < plugins.customToggle.length; i++) {
            var $this = $(plugins.customToggle[i]);
            $this.on('click', function (e) {
                e.preventDefault();
                $("#" + $(this).attr('data-custom-toggle')).add(this).toggleClass('active');
            });

            if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
                $("body").on("click", $this, function (e) {
                    if (e.target !== e.data[0] && $("#" + e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
                        $("#" + e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
                    }
                })
            }
        }
    }

    /**
     * Custom Waypoints
     */
    if (plugins.customWaypoints.length) {
        var i;
        for (i = 0; i < plugins.customWaypoints.length; i++) {
            var $this = $(plugins.customWaypoints[i]);

            $this.on('click', function (e) {
                e.preventDefault();
                $("body, html").stop().animate({
                    scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
                }, 1000, function () {
                    $(window).trigger("resize");
                });
            });
        }
    }

    /**
     * Custom Waypoints
     */
    if (plugins.bootstrapDateTimePicker.length) {
        var i;
        for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
            var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
            var options = {};

            options['format'] = 'dddd DD MMMM YYYY - HH:mm';
            if ($dateTimePicker.attr("date-time-picker") == "date") {
                options['format'] = 'dddd DD MMMM YYYY';
                options['minDate'] = new Date();
            } else if ($dateTimePicker.attr("date-time-picker") == "time") {
                options['format'] = 'HH:mm';
            }

            options["time"] = ($dateTimePicker.attr("date-time-picker") != "date");
            options["date"] = ($dateTimePicker.attr("date-time-picker") != "time");
            options["shortTime"] = true;

            $dateTimePicker.bootstrapMaterialDatePicker(options);
        }
    }


    /**
     * RD Parallax
     * @description Enables RD Parallax plugin
     */
    if (plugins.rdParallax.length) {
        var i;
        $.RDParallax();

        if (!isIE && !isMobile) {
            $(window).on("scroll", function () {
                for (i = 0; i < plugins.rdParallax.length; i++) {
                    var parallax = $(plugins.rdParallax[i]);
                    if (isScrolledIntoView(parallax)) {
                        parallax.find(".rd-parallax-inner").css("position", "fixed");
                    } else {
                        parallax.find(".rd-parallax-inner").css("position", "absolute");
                    }
                }
            });
        }

        $("a[href='#']").on("click", function (e) {
            setTimeout(function () {
                $(window).trigger("resize");
            }, 300);
        });
    }
});



/******************************************Sharat************************************/

function getUserProfile() {
    try {
        var userProfile = window.sessionStorage.getItem("userDetail");//, JSON.stringify(userDetail));
        userDetail = JSON.parse(userProfile);
        if (userDetail.UserPhoto == undefined || userDetail.UserPhoto == "") {
            $("#FW_userPhoto").addClass("user-default");
        }
        else {
            $("#FW_userPhoto").css("background", "url(" + userDetail.UserPhoto + ")");
        }
        if (userDetail.DisplayName != undefined) {
            $("#FW_userDisplayName").text(userDetail.DisplayName);
        }
    }
    catch (ex) {

    }
};






var properties = new Object();
properties.PlaceHolder = 'blog_postSection';
properties.ClientID = (userDetail != null) ? ((userDetail.ClientID != "" && typeof userDetail.ClientID != "undefined" && userDetail.ClientID != null) ? userDetail.ClientID : "08AD21B8-A8CD-45CF-B8EA-04DF3C0A376A") : "08AD21B8-A8CD-45CF-B8EA-04DF3C0A376A";
properties.UserUniqueID = (userDetail != null) ? ((userDetail.UserID != "" && typeof userDetail.UserID != "undefined" && userDetail.UserID != null) ? userDetail.UserID : "2FECB025-A9B7-40FC-85D7-6A31538D49F5") : "2FECB025-A9B7-40FC-85D7-6A31538D49F5";
properties.AppCode = 'BLOG';
//properties.AppType = 'BLOG';
properties.TokenID = (userDetail != null) ? ((userDetail.TokenID != "" && typeof userDetail.TokenID != "undefined" && userDetail.TokenID != null) ? userDetail.TokenID : "E86765C8-56EF-41DB-9001-03166CE2B1CE") : "E86765C8-56EF-41DB-9001-03166CE2B1CE";
properties.serviceUrl = CommonServices_URL; //"http://localhost:2268"; //

function FetchTimezoneName() {
    var timeSummer = new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0));
    var summerOffset = -1 * timeSummer.getTimezoneOffset();

    var timeWinter = new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0));

    var winterOffset = -1 * timeWinter.getTimezoneOffset();

    var timeZoneHiddenField;

    if (-720 == summerOffset && -720 == winterOffset) { timeZoneHiddenField = 'Dateline Standard Time'; }

    else if (-660 == summerOffset && -660 == winterOffset) { timeZoneHiddenField = 'UTC-11'; }

    else if (-420 == summerOffset && -480 == winterOffset) { timeZoneHiddenField = 'Pacific Standard Time'; }

    else if (-420 == summerOffset && -420 == winterOffset) { timeZoneHiddenField = 'US Mountain Standard Time'; }

    else if (-360 == summerOffset && -420 == winterOffset) { timeZoneHiddenField = 'Mountain Standard Time'; }

    else if (-360 == summerOffset && -360 == winterOffset) { timeZoneHiddenField = 'Central America Standard Time'; }

    else if (-300 == summerOffset && -360 == winterOffset) { timeZoneHiddenField = 'Central Standard Time'; }

    else if (-240 == summerOffset && -300 == winterOffset) { timeZoneHiddenField = 'Eastern Standard Time'; }

    else if (-120 == summerOffset && -180 == winterOffset) { timeZoneHiddenField = 'America/Godthab'; }

    else if (60 == summerOffset && 0 == winterOffset) { timeZoneHiddenField = 'GMT Standard Time'; }

    else if (330 == summerOffset && 330 == winterOffset) { timeZoneHiddenField = 'India Standard Time'; }

    else if (660 == summerOffset && 660 == winterOffset) { timeZoneHiddenField = 'West Pacific Standard Time'; }

    else if (690 == summerOffset && 690 == winterOffset) { timeZoneHiddenField = 'Central Pacific Standard Time'; }

    else { timeZoneHiddenField = 'US/Pacific'; }
    return timeZoneHiddenField;
}
function GetPublicUserVirtualGroups() {
    var userTimezone = FetchTimezoneName();
    var clientid = properties.ClientID;
    var UserId = properties.UserUniqueID;
        userVGroups = [];
        var svcUserMgmt = CommonServices_URL + "/svcUserManagementService.svc/"      
        $.ajax({
            type: "POST",
            url: svcUserMgmt + "FetchAllPublicVirtualGroups",
            data: '{"UserID":"' + UserId + '","ClientId":"' + clientid + '","timeZone":"' + userTimezone + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                if (response.FetchAllPublicVirtualGroupsResult.RData != undefined) {
                    if (response.FetchAllPublicVirtualGroupsResult.RData.length > 0) {
                        userVGroups = response.FetchAllPublicVirtualGroupsResult.RData;
                        fetchLatestBlogFeed(userVGroups);
                    }                    
                }
            },
            processdata: false, //True or False
            crossdomain: true,
            failure: function (response) {
                // alert("failure in fetch call");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert("error in fetch call");
            }
        });
};


function fetchLatestBlogFeed(userVGroups) {

    var vGroupIds = ""; 
    $.each(userVGroups, function (i, vg) {
        vGroupIds = vGroupIds + "" + vg.VirtualGroupID + ",";
    });

    if (vGroupIds.substring(vGroupIds.length - 1) == ",") {
        vGroupIds = vGroupIds.substr(0, vGroupIds.length - 1);
    }
    
    JsonData = JSON.stringify({ clientId: properties.ClientID, uniqueId: properties.UserUniqueID, View: "MyFeeds", OffSet: 0, postsPerPage: 5, pagination: 1, tokenID: properties.TokenID, timezoneName: '' + FetchTimezoneName(), IsSearch: 0, virtualGroupIDs: vGroupIds });
        callUrl = properties.serviceUrl + "/svcBlog.svc/FetchAllPostForView";

    var ajaxReq = $.ajax({
        type: "POST",
        url: callUrl,
        data: JsonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (r1data) {

            if (r1data.FetchAllPostForViewResult != null) {
                if (r1data.FetchAllPostForViewResult.Status == 0 && r1data.FetchAllPostForViewResult.RData[0] != null) {                 
                     
                           var latestBlogData = r1data.FetchAllPostForViewResult.RData;
                           repaintBlogInFooter(latestBlogData);
          
                  
                }
            }


        },
        failure: function (response) {
            try {
                StopLoadingPanel();
                //displayDialog("Fetch blog posts operation Failed. Error:" + errorThrown + " Status:" + textStatus, "information");
            } catch (err) {
                console.log("" + err.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            try {
                StopLoadingPanel();
                //  displayDialog("Fetch blog posts operation Error. Error:" + errorThrown + " Status:" + textStatus, "error");
            } catch (err) {
                console.log("" + err.message);
            }
        }
    });

}

function repaintBlogInFooter(arraydata) {
    if (arraydata.length >= 1) {
        $("#footerBlog").empty();
        $("#footerBlog").append('<h6 class="text-uppercase text-spacing-60">Blog</h6>');
        for (i = 0; (i < arraydata.length && i < 3) ; i++) {
            var data = arraydata[i];
            var element = '<article id=' + data.PostID + ' class="post widget-post text-left footerblogpostDiv">'
                                               + '<a href="../blog.html">'
                                                   + '<div class="unit unit-horizontal unit-spacing-xs unit-middle">'
                                                       + '<div class="unit-body">'
                                                           + '<div class="post-meta">'
                                                               + '<span class="icon-xxs text-picton-blue mdi mdi-arrow-right"></span>'
                                                              + '<time datetime="2016-01-01" class="text-dark">' + data.PublishDateTime + '</time>'
                                                           + '</div>'
                                                           + '<div class="post-title">'
                                                               + '<h6 class="text-regular">' + data.PostTitle + '</h6>'
                                                          + '</div>'
                                                       + '</div>'
                                                   + '</div>'
                                               + '</a>'
                                           + '</article>';
            $("#footerBlog").append($(element));
        }






    }



};



function ScribeToNewsLetter() {
    
    var obj = {};
    obj.Email = $("#emailsub_input").val();
    obj.ClientID = properties.ClientID;

    if (obj.Email != "" && obj.Email != null) {
        var Newletter = {};
        var subscribe = JSON.stringify(obj);
        var svcUserMgmt = CommonServices_URL + "/svcUserManagementService.svc/"
        $.ajax({
            type: "POST",
            url: svcUserMgmt + "SubscribeToNewLetter",
            data: '{"newLetter":'+subscribe+'}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                if (response.SubscribeToNewLetterResult.RData != undefined) {
                    if (response.SubscribeToNewLetterResult.RData.length > 0) {
                        Newletter = response.SubscribeToNewLetterResult.RData;
                        
                        alert("You have successfully subscribed to 5Y Newsletter!");
                        $("#emailsub_input").val("");
                    }
                }
            },
            processdata: false, //True or False
            crossdomain: true,
            failure: function (response) {
                // alert("failure in fetch call");
                $("#emailsub_input").val("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert("error in fetch call");
                $("#emailsub_input").val("");
            }
        });

    }
   
}