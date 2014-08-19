$(function(){
    var $videos = $('.video');

    var topScrollCallback = function(direction){
        var v = $f(this);

        if (direction === 'down'){
            v.api('play');
        }
        else {
            v.api('pause');
        }

        console.log(direction);
    };

    var bottomScrollCallback = function(direction){
        var v = $f(this);

        if (direction === 'up'){
            v.api('play');
        }
        else {
            v.api('pause');
        }
    };

    $videos.waypoint(topScrollCallback, { offset: 0 });
    $videos.waypoint(bottomScrollCallback, { offset: '-100%' });
});