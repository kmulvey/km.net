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


// =================================================================================

var uri ='http://img.kevinmulvey.net/images/';
var curr_img=14;
var images=new Array("images/small/seneca.jpg","images/small/bbp.jpg","images/small/halloween_zombie.jpg","images/small/bb_waterfall.jpg","images/small/olivia.jpg","images/small/event_horizon.jpg","images/small/lights.jpg","images/small/farted.jpg","images/small/grapes.jpg","images/small/top_rock_s.jpg","images/small/statue.jpg","images/small/statue_sunset.jpg","images/small/rockafeller.jpg","images/small/willie_wonka.jpg","images/small/lake_placid.jpg","images/small/metrocard.jpg","images/small/erp.jpg","images/small/guutz.jpg","images/small/rock_ctr.jpg","images/small/long_island.jpg","images/small/central_park_fall.jpg","images/small/180ml.jpg","images/small/snowman.jpg","images/small/pepsi.jpg","images/small/dc.jpg");		

$(document).ready(function(){
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
    var link = document.location.hash.replace("#/", uri);
    var img_wrap = $('.img-wrap');
		$('picture', img_wrap).remove();
		img_wrap.append('<picture><source srcset="' + link + '" media="(min-width: 1000px)"><source srcset="' + link + '" media="(min-width: 800px)"><source srcset="' + link + '" media="(min-width: 500px)"><img srcset="' + link + '" alt="180ml"></picture>');
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
