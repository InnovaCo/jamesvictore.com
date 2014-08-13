$(document).ready(function() {
    $('.link--preview').livePreview();

    blurFilter('.js-blurrr-image', '.js-blurrr-text');
});

function blurFilter(image, text){
    var $image = $(image);
    var $text = $(text);
    var $body = $('body');

    $image.appear();

    $body.on('appear', image, function(evt, $img){
        var scroll = $(window).scrollTop();
        var imageOffsetTop = $img.offset().top;
        var imageHeight = $img.height();
        var triggeringOffset = (imageOffsetTop - imageHeight * 2);
        var triggeringBottomOffset = (imageOffsetTop + imageHeight * 2);

        if (scroll >= triggeringOffset && scroll <= triggeringBottomOffset){
            var coeff = (scroll - imageOffsetTop) / 5;

            if (coeff > 0) { coeff = 0 }
            if (coeff < -15) { coeff = -15 }

            var imageBlur = -coeff;
            var imageBlurValue = 'blur(' + imageBlur + 'px)';

            $img.css({
                'filter'         : imageBlurValue,
                '-webkit-filter' : imageBlurValue,
                '-moz-filter'    : imageBlurValue,
                '-o-filter'      : imageBlurValue,
                '-ms-filter'     : imageBlurValue
            });

            var textBlur = 15 - imageBlur;
            var textBlurValue = 'blur(' + textBlur + 'px)';
            var textOpacity = 1 - (textBlur / 15);

            $text.css({
                'filter'         : textBlurValue,
                '-webkit-filter' : textBlurValue,
                '-moz-filter'    : textBlurValue,
                '-o-filter'      : textBlurValue,
                '-ms-filter'     : textBlurValue,
                'opacity'        : textOpacity
            });
        }
    });
}