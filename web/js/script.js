$(document).ready(function($) {
	$(".step1 .answ-btn").click(function(event) {
		if ($(this).hasClass('positive')) {
			$(".nd-frame .graph").addClass('positive');
		}
		else {
			$(".nd-frame .graph").removeClass('positive');
		}
		$(".nd-frame .graph").addClass('active');
		$(" .nd-frame .line").fadeIn(300);
		$(".step1, .nd-dialog .wrapper").fadeOut('300');
		setTimeout(function(){
			$(".step2, .nd-dialog .wrapper").fadeIn(300);
			$(".step2").addClass('animated bounceIn');
		}, 4000)
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