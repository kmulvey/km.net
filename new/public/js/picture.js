$(document).ready(function(){
	'use strict';

	var region, img_id;
	var curr_img=0;
	var preload_img=1;
	var known = false; // hack

	$("#toc").on("click", "a", function(e){
		region = this.id;
		$("#" + e.delegateTarget.id).hide();
		$("#img-wrap").removeClass("hide");
	});
	function init(){
		if(document.location.hash.trim() !== ""){
			var params = document.location.hash.trim().split("/");
			region = params[0].replace("#", "");
			else if (region !== "patagonia" || region !== ""){
				return; // typed some crap
			}
			$("picture." + region)[0].className = "current";
			if(params.length > 1){
				// map the name in the uri to an index in the array
				var len=images[region].length;
				for(var i=0; i<len; i++) {
					if(images[region][i].indexOf(parmas[1] !== -1){
						curr_img=i;
						preload_img = curr_img + 1;
						break;
					}
				}
			}
		}
		// they hit index, show the splash screen
		else{
			return;
		}
	}
	$(window).on('hashchange', function (e) {   
		else if(!known){
		}
			$("picture").removeClass("current");
			var curr = images[region][curr_img];
			if($("#" + curr).length === 1){
				$("#" + curr).addClass("current");
			} else{
				var $img = $('<picture id="' + curr + '" class="current"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/IMG_' + curr + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/IMG_' + curr + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/IMG_' + curr + '.JPG" alt=""></picture>');
				$('#img-wrap').append($img);
			}
			var link = document.location.hash.replace("#", '');
			e.preventDefault();
			
			// preloading
			var next = images[region][preload_img];
			if($("#" + next).length === 0){
				var $next_img = $('<picture id="' + next + '"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/IMG_' + next + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/IMG_' + next + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/IMG_' + next + '.JPG" alt=""></picture>');
				$('#img-wrap').append($next_img);
			}
	});
	
	// get it started for this page load
	$(window).trigger( 'hashchange' );
	
	//listen to keypress
	$(window).keydown(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		//right
		if(code === 39 || code === 38) {
			e.preventDefault();
			if(curr_img >= images[region].length-1) {
				curr_img = -1;
			}
			curr_img++;	
			if(curr_img === images[region].length - 1) preload_img = 0; // dont go out of bounds
			else preload_img = curr_img + 1;
			known = true;
			document.location.hash = "#" + images[region][curr_img];
		}
		//left
		if(code === 37 || code === 40) {
			e.preventDefault();
			if(curr_img <= 0) {
				curr_img = images[region].length;
			}
			
			curr_img--;
			if(curr_img === 0) preload_img = images[region].length - 1;
			else preload_img = curr_img - 1;
			known = true;
			document.location.hash = "#" + images[region][curr_img];
		}
	});
});
