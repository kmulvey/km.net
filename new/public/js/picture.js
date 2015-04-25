$(document).ready(function(){
	'use strict';

	var uri ='//img.kevinmulvey.net/images/patagonia/2k/';
	var curr_img=0;
	var preload_img=1;
	var known = false; // hack
	var images=new Array('IMG_0154','IMG_0157','IMG_0167','IMG_0171','IMG_0181','IMG_0187','IMG_0208','IMG_0252','IMG_0262','IMG_0270','IMG_0273','IMG_0284','IMG_0287','IMG_0288','IMG_0311','IMG_0324','IMG_0329','IMG_0335','IMG_0346','IMG_0387','IMG_0414','IMG_0423','IMG_0444','IMG_0447','IMG_0454','IMG_0469','IMG_0490','IMG_0497','IMG_0518','IMG_0519','IMG_0520','IMG_0545','IMG_0547','IMG_0563','IMG_0590','IMG_0593','IMG_0620','IMG_0641','IMG_0642','IMG_0656','IMG_0661','IMG_0670','IMG_0680','IMG_0681','IMG_0693','IMG_0695','IMG_0699','IMG_0704','IMG_0710','IMG_0711','IMG_0740','IMG_0746','IMG_0749','IMG_0763','IMG_0770','IMG_0782','IMG_0786','IMG_0789','IMG_0790','IMG_0791','IMG_0801','IMG_0804','IMG_0805','IMG_0807','IMG_0809','IMG_0840','IMG_0866','IMG_0874','IMG_0887','IMG_0893','IMG_0902');

	$(window).on('hashchange', function (e) {   
		if(document.location.hash.trim() === ""){return;}
		else if(!known){
			// map the name in the uri to an index in the array
			var len=images.length;
			for(var i=0; i<len; i++) {
				if(images[i].indexOf(document.location.hash.replace("#/", "")) !== -1){
					curr_img=i;
					preload_img = curr_img + 1;
					break;
				}
			}
		}
			$("picture").removeClass("current");
			var curr = images[curr_img];
			if($("#" + curr).length === 1){
				$("#" + curr).addClass("current");
			} else{
				var $img = $('<picture id="' + curr + '" class="current"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/' + curr + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/' + curr + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/' + curr + '.JPG" alt=""></picture>');
				$('#img-wrap').append($img);
			}
			var link = document.location.hash.replace("#", '');
			e.preventDefault();
			
			// preloading
			var next = images[preload_img];
			if($("#" + next).length === 0){
				var $next_img = $('<picture id="' + next + '"><source srcset="//img.kevinmulvey.net/images/patagonia/3k/' + next + '.JPG" media="(min-width: 3000px)"><source srcset="//img.kevinmulvey.net/images/patagonia/2k/' + next + '.JPG" media="(min-width: 2000px)"><img src="//img.kevinmulvey.net/images/patagonia/1k/' + next + '.JPG" alt=""></picture>');
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
			if(curr_img >= images.length-1) {
				curr_img = -1;
			}
			curr_img++;	
			if(curr_img === images.length - 1) preload_img = 0; // dont go out of bounds
			else preload_img = curr_img + 1;
			known = true;
			document.location.hash = "#/" + images[curr_img];
		}
		//left
		if(code === 37 || code === 40) {
			e.preventDefault();
			if(curr_img <= 0) {
				curr_img = images.length;
			}
			
			curr_img--;
			if(curr_img === 0) preload_img = images.length - 1;
			else preload_img = curr_img - 1;
			known = true;
			document.location.hash = "#/" + images[curr_img];
		}
	});
});
