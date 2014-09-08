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

	var isMac = navigator.platform.match(/Mac/i),
		$invisibleTitle = $('.js-title-invText'),
		$invisibleTitleHome = $('.js-title-invText-home');

	if (isMac) {
		var test = parseInt($invisibleTitle.css('line-height')),
			after = ((test / 100) * 19);

		$invisibleTitle.css({
			'padding-top': after
		});
		$invisibleTitleHome.css({
			'left': '-10px'
		});
	}

});