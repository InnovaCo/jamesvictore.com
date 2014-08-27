$(document).ready(function() {
    function addBlurEffects(options){
        var wrappedElementsString = '.main > *',
            $wrappedElements = $(wrappedElementsString),
            wrapperString = '<div class="js-fixed-wrapper fixed-wrapper"></div>',
            $body = $('body'),
            bodyHeight = $body.height(),
            emptyFillString = '<div id="bodyEmptyFill"></div>';

        $body.append(emptyFillString);

        var $emptyFill = $('#bodyEmptyFill');

        $emptyFill.height(bodyHeight);

        $wrappedElements.wrapAll(wrapperString);

        var $fixedWrapper = $('.js-fixed-wrapper');

        function scrollHandler(evt){
            var offset, coefficient, opacity,
                windowScroll = $(window).scrollTop();

            if (evt.data.imageOffsetTop <  $(window).height() && windowScroll < evt.data.imageOffsetTop){
                opacity = 1 - windowScroll / 100;
            }
            else {
                // some magic...
                offset = (evt.data.imageOffsetTop - windowScroll) * 10;
                coefficient = (offset / (evt.data.imageHalfHeight / evt.data.initialBlur));
                opacity = coefficient / 100;
            }

            if (opacity >= 1) {
                opacity = 1;

                evt.data.$text.trigger('victore.text.shown');
            }

            if (opacity < 0) {
                opacity = 0;

                evt.data.$text.trigger('victore.text.hidden');
            }

            evt.data.$text.css({ opacity: opacity });
            evt.data.$shadowed.css({ opacity: opacity });
        }

        function textShownCallback(evt){
            $wrappedElements.prependTo('.main');
            $('.js-fixed-wrapper').remove();
            $emptyFill.show();
            $wrappedElements.wrapAll(wrapperString);

            evt.data.$text.one('victore.text.hidden', null, { $text: evt.data.$text }, textHiddenCallback);
        }

        function textHiddenCallback(evt){
            $wrappedElements.prependTo('.main');
            $('.js-fixed-wrapper').remove();
            $emptyFill.hide();

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

            var $thisParent = $this.parent();
            $('<div class="js-shadowed shadowed"></div>').appendTo($thisParent);

            function waypointCallback(direction){
                var data = {
                    direction: direction,
                    imageOffsetTop: imageOffsetTop,
                    imageHalfHeight: imageHalfHeight,
                    //filter: filter,
                    $img: $this,
                    $text: $text,
                    $shadowed: $('.js-shadowed', $thisParent)
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

    addBlurEffects({
        image: '.js-blurrr-image',
        text: '.js-blurrr-text'
    });
});