$(document).ready(function() {
    var $window = $(window),
        $hiddable = $('#text, #shadow'),
        opacity = 1,
        oldScroll = 0;

    $window.scroll(function(){
        var scroll = $window.scrollTop();

        if (opacity > 1) { opacity = 1; }
        if (opacity < 0) { opacity = 0; }

        $hiddable.css({ opacity: (1 - scroll / 100) });

        oldScroll = scroll;
    });

    /*var opacity = 1;
    var mathCoeff = 0.001;
    var eventsString = 'mousewheel.victore touchmove.victore scroll.victore';

    var scrollCallback = function(e){
        console.log(Math.abs(e.originalEvent.wheelDelta));

        if (opacity <= 0 || $window.scrollTop() > 50){
            opacity = 0.0;

            $hiddable.css({ opacity: opacity });
            $window.off(eventsString);

            return;
        }

        if (opacity > 1){ opacity = 1; }

        if (opacity >= 0 && opacity <= 1){
            var down = (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0);

            mathCoeff = Math.abs(e.originalEvent.wheelDelta || 0.5) * mathCoeff;
            opacity = (down ? opacity-mathCoeff : opacity+mathCoeff);

            $hiddable.css({ opacity: opacity });
        }

        if (opacity >= 0){
            return false;
        }
    };

    $window.on(eventsString, scrollCallback);
    */
});