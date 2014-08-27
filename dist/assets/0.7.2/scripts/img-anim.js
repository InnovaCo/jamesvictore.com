$(document).ready(function() {
    var $window = $(window);
    var $shadow = $('#shadow');
    var $text = $('#text');
    var opacity = 1;
    var mathCoeff = 0.07;
    var eventsString = 'mousewheel.victore touchmove.victore scroll.victore';

    var scrollCallback = function(e){
        if (opacity <= 0 || $window.scrollTop() > 50){
            opacity = 0.0;

            $text.css({ opacity: opacity });
            $shadow.css({ opacity: opacity });

            $window.off(eventsString);

            return;
        }

        if (opacity > 1){ opacity = 1; }

        if (opacity >= 0 && opacity <= 1){
            var down = (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0);

            opacity = (down ? opacity-mathCoeff : opacity+mathCoeff);

            $text.css({ opacity: opacity });
            $shadow.css({ opacity: opacity });
        }

        if (opacity >= 0){
            return false;
        }
    };

    $window.on(eventsString, scrollCallback);
});