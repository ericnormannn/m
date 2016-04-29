var Schedule = (function($) {

	var	scheduleSlider;

	var init = function() {

		// set up royal slider 
		scheduleSlider = $('.schedule-slider').royalSlider({
			fadeinLoadedSlide: true,
			numImagesToPreload: 20,
			addActiveClass: true,
			arrowsNav: false,
			arrowsNavAutoHide: false,
			controlNavigation: 'none',
			slidesSpacing: 0,
			navigateByClick: false,
			loop: false,
		}).data('royalSlider');

	};

	// schedule next
	var next = function() {

		scheduleSlider.next();

	};

	// schedule prev
	var previous = function() {

		scheduleSlider.prev();
		
	};

	return {
		init: init,
		next: next,
		previous: previous
	};

}(jQuery));