Template.registerHelper('active', function (routeName) {
    // add a 'highlighting' class to the sidebar menu items if they match with the currentRoute
    var currentRoute = Router.current().route.getName();
    return currentRoute.indexOf(routeName) > -1 ? "body-sidebar-menu-item-is-active" : '';
});

Template.registerHelper('convertToMoment', function (dateString) {
    return moment(dateString).format('Do MMM YYYY, h:mm a');
});


/*
 ============================
 LoginLayout Template
 (events and helpers)
 ============================
 */

Template.LoginLayout.rendered = function () {
    // Show video as a background
    // More details: http://www.coverr.co/

    scaleVideoContainer();

    initBannerVideoSize('.login-video .poster img');
    initBannerVideoSize('.login-video .login-filter');
    initBannerVideoSize('.login-video video');

    $(window).on('resize', function () {
        scaleVideoContainer();
        scaleBannerVideoSize('.login-video .poster img');
        scaleBannerVideoSize('.login-video .login-filter');
        scaleBannerVideoSize('.login-video video');
    });

    // Randomize the selection of the video being shown in the background

    var videos = [
        ['/videos/comfy.mp4', '/videos/comfy.webm', '/img/comfy.jpg'],
        ['/videos/birds.mp4', '/videos/birds.webm', '/img/birds.jpg']
    ];

    var randomNumber = Math.floor(Math.random() * videos.length);
    var video = $('.login-video video');

    video.append('<source src="' + videos[randomNumber][0] + '" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.');
    video.append('<source src="' + videos[randomNumber][1] + '" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.');

    $('.poster').append('<img src="' + videos[randomNumber][2] + '" alt="Welcome back to Dentio">');


    function scaleVideoContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        $('.login').css('height', unitHeight);

    }

    function initBannerVideoSize(element) {

        $(element).each(function () {
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element) {

        var windowWidth = $(window).width(),
            windowHeight = $(window).height() + 5,
            videoWidth,
            videoHeight;

        $(element).each(function () {
            var videoAspectRatio = $(this).data('height') / $(this).data('width');

            $(this).width(windowWidth);

            if (windowWidth < 1000) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                $(this).css({'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px'});

                $(this).width(videoWidth).height(videoHeight);
            }

            $('.login .login-video video').addClass('fadeIn animated');

        });
    }
};