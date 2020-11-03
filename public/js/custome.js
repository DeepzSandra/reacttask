	$(window).scroll(function(e) {
		if ($(this).scrollTop() > 200) {
			$('.menu_fix').addClass("scroll-to-fixed-fixed");
		}
	});
	$(window).scroll(function(e) {
		if ($(this).scrollTop() < 200) {
			$('.menu_fix').removeClass("scroll-to-fixed-fixed");
		}
	});
	
	$(document).ready(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scrollToTop').fadeIn();
			} else {
				$('.scrollToTop').fadeOut();
			}
		});
		$('.scrollToTop').click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});	
	
	