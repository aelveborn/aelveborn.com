$(document).ready(function(){
	$(window).scroll(function () {
		if($('.nav-items').is(':visible')) {
			$('.nav-icon').removeClass('open');
			$('.nav-items').removeClass('open');
		}
	});

	$('.nav-btn').on('click', function(e){
		$(this).find('.nav-icon').toggleClass('open');
		$('.nav-items').toggleClass('open');
		e.preventDefault();
	});
});