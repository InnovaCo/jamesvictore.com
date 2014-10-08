$(function() {
	$('.link--preview').livePreview();

	// video frame resize

	var $videoBlock = $('.js-video-wrapper');

	function videoResize(e) {
		var videoHeight = e.height(),
			videoWidth = e.width();
		videoHeight = videoWidth / 1.77;
		e.css({
			'height': videoHeight
		});
	}

	videoResize($videoBlock);

	$(window).on('resize', function() {
		videoResize($videoBlock);
	});

	// titles

	var isMac = navigator.platform.match(/Mac/i),
		macFF = navigator.userAgent.search(/Firefox/i),
		notPC = navigator.platform.match(/Mac|Win/i),
		$invisibleTitle = $('.js-title-invText'),
		$invisibleTitleHome = $('.js-title-invText-home'),
		$invisibleText = $('#text'),
		$deviceImg = $('.js-device-img');

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

	if (!notPC) {
		$deviceImg.show();
		$invisibleText.hide();
	}

	if (isMac && macFF) {
		$('.image_block__title--home').addClass('mac-firefox');
	}


	var $form = $('form').submit(function() {
		var firstMailInput = $('.jsFirstName', $form);
		var emailInput = $('.jsEmail', $form);
		var submitBtn = $('.jsSubmit', $form);

		var hasError = false;

		if (!emailInput.val().match(/.+@.+\..+/i)) {
			emailInput.addClass('input-invalid');
			hasError = true;
		} else {
			emailInput.removeClass('input-invalid');
		}


		if (!$.trim(firstMailInput.val())) {
			firstMailInput.addClass('input-invalid');
			hasError = true;
		} else {
			firstMailInput.removeClass('input-invalid');
		}

		if (hasError) {
			submitBtn.addClass('invalid-form');
		} else {
			submitBtn.removeClass('invalid-form');
		}

	});

});