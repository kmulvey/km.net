(function(exports){
	function Gallery(images){	
		'use strict';

		this.images = images;

		var img_id;
		var curr_img=0;
		var preload_img=1;
		var known = false; // hack
	}
	Gallery.prototype.applyHandlers = function (hash) {
		'use strict';
		$(window).on('hashchange', function(e){
			e.preventDefault();
			var updates = processParams(document.window.hash);
			hashChangeView(e, updates);
		});
	};

	Gallery.prototype.processParams = function (hash) {
		'use strict';
		var returnVals = {};

		if(hash !== ""){
			var params = hash.split("/");
			var region = params[0].replace("#", "");
			if (region === "patagonia" || region === "nz"){
				returnVals.region=region;
				// $("picture." + region)[0].className = "current"; // move this to caller
				if(params.length > 1){
					// map the name in the uri to an index in the array
					var len=this.images[region].length;
					for(var i=0; i<len; i++) {
						if(this.images[region][i].indexOf(params[1]) !== -1){
							returnVals.curr_img=i;
							if(returnVals.curr_img !== this.images[region].length-1)
								returnVals.preload_img = returnVals.curr_img + 1;
							else
								returnVals.preload_img = 0;
							break;
						}
					}
					return returnVals;
				} else{
					return returnVals; // take them to the region index
				}
			} else{
				return 0; // typed some crap
			}
		}	
		// they hit index, show the splash screen
		else{
			return 0;
		}
	}; // end processParams()
	

	Gallery.prototype.hashChangeView = function(e, updates){
		'use strict';
		$("picture").removeClass("current");
		var curr = images[updates.region][updates.curr_img];
		if($("#" + curr).length === 1){
			$("#" + curr).addClass("current");
		} else{
			var $img = $('<picture id="' + curr + '" class="current"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/IMG_' + curr + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/IMG_' + curr + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/IMG_' + curr + '.JPG" alt=""></picture>');
			$('#img-wrap').append($img);
		}
		
		// preloading
		var next = images[region][preload_img];
		if($("#" + next).length === 0){
			var $next_img = $('<picture id="' + next + '"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/IMG_' + next + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/IMG_' + next + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/IMG_' + next + '.JPG" alt=""></picture>');
			$('#img-wrap').append($next_img);
		}
	};
	
	exports = Gallery;

})(typeof exports === 'undefined'? this['mymodule']={}: exports);
	
	/*

//})(typeof exports === 'undefined'? this['mymodule']={}: exports);
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

*/
