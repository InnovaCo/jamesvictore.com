$(function() {
	$('.link--preview').livePreview();

	// video frame resize

	var $videoBlock = $('.js-video-wrapper');

	function videoResize(e) {
		var videoHeight = e.height(),
			videoWidth = e.width();
		videoHeight = videoWidth / 1.77;
		e.css({
			'height':videoHeight
		});
	}

	videoResize($videoBlock);

	$(window).on('resize', function() {
		videoResize($videoBlock);
	});

	// ios titles

	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		$('h1').addClass('ios-title');
	}

});