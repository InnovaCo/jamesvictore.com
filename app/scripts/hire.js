$(function(){
    $('.video').appear();
    var $body = $('body');

    $body.on('appear', '.video', function(evt, $video){
        var videoOffsetTop = $video.offset().top;
        var videoHalfHeight = ($video.height() / 2);

        var videoTopTriggeringOffset = videoOffsetTop - videoHalfHeight;
        var videoBottomTriggeringOffset = videoOffsetTop + videoHalfHeight;
        var bodyOffset = $body.scrollTop();

        if (bodyOffset >= videoTopTriggeringOffset &&
            bodyOffset <= videoBottomTriggeringOffset){
            $f($video[0]).api('play');
        }
    });

    $body.on('disappear', '.video', function(evt, $video){
        $f($video[0]).api('pause');
    });
});