$(document).ready(function(){
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
	var ratio = $('body').width()/$('picture').width();
	if(ratio < 1) zoom = ratio;
	return zoom;
}
var bouncedZoom = debounce(function() {
	$('body').css('zoom', calcZoom()*100 + "%");
	$('.helper, picture, img').css('-moz-transform', 'scale(' + calcZoom() + ')');
	// this can break things
	$('.helper, picture, img').css('-moz-transform-origin', '0 0');
}, 250);

// do it once
bouncedZoom();
// do it again on resize
$(window).on('resize', bouncedZoom);


// =================================================================================

var uri ='//img.kevinmulvey.net/images/patagonia/';
var curr_img=0;
var images=new Array('IMG_0154.JPG','IMG_0157.JPG','IMG_0167.JPG','IMG_0171.JPG','IMG_0181.JPG','IMG_0187.JPG','IMG_0208.JPG','IMG_0252.JPG','IMG_0262.JPG','IMG_0270.JPG','IMG_0273.JPG','IMG_0284.JPG','IMG_0287.JPG','IMG_0288.JPG','IMG_0311.JPG','IMG_0324.JPG','IMG_0329.JPG','IMG_0335.JPG','IMG_0346.JPG','IMG_0387.JPG','IMG_0414.JPG','IMG_0423.JPG','IMG_0444.JPG','IMG_0447.JPG','IMG_0454.JPG','IMG_0469.JPG','IMG_0490.JPG','IMG_0497.JPG','IMG_0518.JPG','IMG_0519.JPG','IMG_0520.JPG','IMG_0545.JPG','IMG_0547.JPG','IMG_0563.JPG','IMG_0590.JPG','IMG_0593.JPG');

  // fire image load from menu
  $('#menu').on('click', 'a', function(event) {
		var clicked = $(this);
		var count = 0;
		$('#menu a').each(function( index ) {
			if($(this) === clicked) {
				curr_img = count;
				return false;
			}
			count++;
		});
  });
  $(window).on('hashchange', function (e) {
    if(document.location.hash === ""){return;}
    else{
      var len=images.length;
      for(var i=0; i<len; i++) {
        if(images[i].indexOf(document.location.hash.replace("#/", "")) !== -1){
          curr_img=i;
          break;
        }
      }
    var link = document.location.hash.replace("#", '');
    var img_wrap = $('.img-wrap');
		$('picture', img_wrap).remove();
		img_wrap.append('<picture><source srcset="' + uri + '3k/' + link + '" media="(min-width: 2500px)"><source srcset="' + uri + '2k/' + link + '" media="(min-width: 1500px)"><source srcset="' + uri + '1k/' + link + '" media="(min-width: 500px)"><img srcset="' + uri + '2k/' + link + '" alt="Kevin Mulvey\'s Photography"></picture>');
    e.preventDefault();
    }
  });
  $(window).trigger( 'hashchange' );
  //listen to keypress
  $(window).keydown(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);

    //right
    if(code === 39) {
      e.preventDefault();
      if(curr_img >= images.length-1) curr_img = -1;
      curr_img++;
      document.location.hash = images[curr_img].replace("images/small/", "#/");
    }
    //left
    if(code === 37) {
      e.preventDefault();
      if(curr_img <= 0) curr_img = images.length;
      curr_img--;
      document.location.hash = images[curr_img].replace("images/small/", "#/");
    }
  });
});
