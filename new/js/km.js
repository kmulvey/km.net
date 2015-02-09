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
		var zoom = 100;
		//var ratio = $('body').width()/$('picture').width();
		var ratio = $('body').width()/$('img').width()*100;
		if(ratio < 100) zoom = ratio;
		return zoom;
	}
	var bouncedZoom = debounce(function() {
		var ratio = calcZoom();
		$('body').css('zoom', ratio + "%");
		$('.helper, picture, img').css('-moz-transform', 'scale(' + ratio + ')');
		// this can break things
		$('.helper, picture, img').css('-moz-transform-origin', '0 0');
		$("img").removeClass("hidden");
	}, 250);
	
	// do it once
	//$('body').on("load", 'img', function() {
	  bouncedZoom();
	//});


// =================================================================================

var uri ='//img.kevinmulvey.net/images/patagonia/2k/';
var curr_img=0;
var images=new Array('IMG_0154.JPG','IMG_0157.JPG','IMG_0167.JPG','IMG_0171.JPG','IMG_0181.JPG','IMG_0187.JPG','IMG_0208.JPG','IMG_0252.JPG','IMG_0262.JPG','IMG_0270.JPG','IMG_0273.JPG','IMG_0284.JPG','IMG_0287.JPG','IMG_0288.JPG','IMG_0311.JPG','IMG_0324.JPG','IMG_0329.JPG','IMG_0335.JPG','IMG_0346.JPG','IMG_0387.JPG','IMG_0414.JPG','IMG_0423.JPG','IMG_0444.JPG','IMG_0447.JPG','IMG_0454.JPG','IMG_0469.JPG','IMG_0490.JPG','IMG_0497.JPG','IMG_0518.JPG','IMG_0519.JPG','IMG_0520.JPG','IMG_0545.JPG','IMG_0547.JPG','IMG_0563.JPG','IMG_0590.JPG','IMG_0593.JPG','IMG_0620.JPG','IMG_0641.JPG','IMG_0642.JPG','IMG_0656.JPG','IMG_0661.JPG','IMG_0670.JPG','IMG_0680.JPG','IMG_0681.JPG','IMG_0693.JPG','IMG_0695.JPG','IMG_0699.JPG','IMG_0704.JPG','IMG_0710.JPG','IMG_0711.JPG','IMG_0740.JPG','IMG_0746.JPG','IMG_0749.JPG','IMG_0763.JPG','IMG_0770.JPG','IMG_0782.JPG','IMG_0786.JPG','IMG_0789.JPG','IMG_0790.JPG','IMG_0791.JPG','IMG_0801.JPG','IMG_0804.JPG','IMG_0805.JPG','IMG_0807.JPG','IMG_0809.JPG','IMG_0840.JPG','IMG_0866.JPG','IMG_0874.JPG','IMG_0887.JPG','IMG_0893.JPG','IMG_0902.JPG');

	$(window).on('hashchange', function (e) {   
		console.log(curr_img);
		if(document.location.hash === ""){return;}
		else{
			// map the name in the uri to an index in the array
			var len=images.length;
			for(var i=0; i<len; i++) {
				if(images[i].indexOf(document.location.hash.replace("#/", "")) !== -1){
					curr_img=i;
					break;
				}
			}
			var link = document.location.hash.replace("#", '');
			var image = new Image();
			$(".current").addClass("hiding");
			image.addEventListener("load", function() {
				$(".current").remove();
				$(image).addClass("current");
				$(".img-wrap").append(image);
			}, false);
			image.src = uri+link;
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
			document.location.hash = "#/" + images[curr_img];
		}
		//left
		if(code === 37) {
			e.preventDefault();
			if(curr_img <= 0) curr_img = images.length;
			curr_img--;
			document.location.hash = "#/" + images[curr_img];
		}
	});
});
/*
			$(".current").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
  		});
*/
