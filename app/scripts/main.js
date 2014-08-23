$(document).ready(function() {
    $('.link--preview').livePreview();

    addBlurEffects({
        image: '.js-blurrr-image',
        text: '.js-blurrr-text',
        maxBlur: 5
    });
});

function addBlurEffects(options){
    var wrappedElementsString = '.header, .header + div';
    var $wrappedElements = $(wrappedElementsString);
    var wrapperString = '<div class="js-fixed-wrapper fixed-wrapper"></div>';

    $wrappedElements.wrapAll(wrapperString);

    var $fixedWrapper = $('.js-fixed-wrapper');

    function scrollHandler(evt){
        var offset, coefficient, blur, opacity,
            windowScroll = $(window).scrollTop();

        if (evt.data.imageOffsetTop <  $(window).height() && windowScroll < evt.data.imageOffsetTop){
            blur = Math.floor(evt.data.initialBlur - windowScroll / 10);
            opacity = 1 - windowScroll / 100;
        }
        else {
            // some magic...
            offset = (evt.data.imageOffsetTop - windowScroll) * 10;

            coefficient = (offset / (evt.data.imageHalfHeight / evt.data.initialBlur));

            blur = (evt.data.initialBlur + coefficient) / 10;
            opacity = coefficient / 100;
        }

        if (blur <= 0) {
            blur = 0;
        }

        if (blur >= options.maxBlur) {
            blur = options.maxBlur;
        }

        if (opacity >= 1) {
            opacity = 1;

            evt.data.$text.trigger('victore.text.shown');
        }

        if (opacity < 0) {
            opacity = 0;

            evt.data.$text.trigger('victore.text.hidden');
        }

        //evt.data.filter.setStdDeviation(blur, blur);

        var blurString = 'blur(' + blur + 'px)';

        evt.data.$img.css({
            'filter'         : blurString,
            '-webkit-filter' : blurString,
            '-moz-filter'    : blurString,
            '-o-filter'      : blurString,
            '-ms-filter'     : blurString
        });

        evt.data.$text.css({ opacity: opacity });
    }

    function textShownCallback(evt){
        $wrappedElements.prependTo('.main');
        $('.js-fixed-wrapper').remove();
        $wrappedElements.wrapAll(wrapperString);

        evt.data.$text.one('victore.text.hidden', null, { $text: evt.data.$text }, textHiddenCallback);
    }

    function textHiddenCallback(evt){
        $wrappedElements.prependTo('.main');
        $('.js-fixed-wrapper').remove();

        console.log('text.hidden');

        evt.data.$text.one('victore.text.shown', null, { $text: evt.data.$text }, textShownCallback);
    }

    var $image = $(options.image);

    $image.each(function(){
        var $this = $(this);
        var imageOffsetTop = $this.offset().top;
        var imageHeight = $this.height();
        var imageHalfHeight = imageHeight / 2;

        var $text = $this.nextAll(options.text + ':first');
        var textData = { $text: $text };

        $text.one('victore.text.shown', null, textData, textShownCallback);
        $text.one('victore.text.hidden', null, textData, textHiddenCallback);

       // var filter = $('> filter', $this).get(0).firstElementChild;
        var initialBlur = options.maxBlur;//parseInt(filter.getAttribute('stdDeviation'));

        function waypointCallback(direction){
            var data = {
                direction: direction,
                imageOffsetTop: imageOffsetTop,
                imageHalfHeight: imageHalfHeight,
                initialBlur: initialBlur,
                //filter: filter,
                $img: $this,
                $text: $text
            };

            $(window).on('scroll', data, scrollHandler);
        }

        var offsetTop;

        if (imageOffsetTop < $(window).height() / 2){
            offsetTop = imageOffsetTop;
        }
        else {
            offsetTop = imageHalfHeight;
        }

        $this.waypoint(waypointCallback, { offset: offsetTop });
        $this.waypoint(waypointCallback, { offset: -imageHalfHeight });
    });
}