$(document).ready(function($) {
	$(".step1 .answ-btn").click(function(event) {
		$(".step1").fadeOut('300', function() {
			$(".step2").fadeIn(300).addClass('animated bounceIn');
		});
	});
});
$(window).load(function() {
	$(".nd-main-bg, .nd-main-bg__text").addClass('active');
	$(window).scroll(function () {
	   $('.js-animation:not(.active)').each(function () {
	      if (isScrolledIntoView(this) === true) {
	          $(this).addClass('active');
	      }
	   });
	});
	$(window).trigger("scroll");
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom - (0.6*$(elem).height()) <= docViewBottom));
}