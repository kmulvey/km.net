var body_width = $('body').width();
var img_width = $('img').width();

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
function calcZoom(){
	var zoom = 1;
	var ratio = body_width/img_width;
	if(ratio < 1) zoom = ratio;
	return zoom*100 + "%";
}
var bouncedZoom = debounce(function() {
	body_width = $('body').width();
	$('body').css('zoom', calcZoom());
}, 250);

// do it once
$('body').css('zoom', calcZoom());
// do it again on resize
$(window).on('resize', bouncedZoom);
