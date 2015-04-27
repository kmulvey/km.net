$(document).ready(function(){
	'use strict';

	var region, img_id;
	var curr_img=0;
	var preload_img=1;
	var known = false; // hack
	var images = {
		patagonia : ['0154','0157','0167','0171','0181','0187','0208','0252','0262','0270','0273','0284','0287','0288','0311','0324','0329','0335','0346','0387','0414','0423','0444','0447','0454','0469','0490','0497','0518','0519','0520','0545','0547','0563','0590','0593','0620','0641','0642','0656','0661','0670','0680','0681','0693','0695','0699','0704','0710','0711','0740','0746','0749','0763','0770','0782','0786','0789','0790','0791','0801','0804','0805','0807','0809','0840','0866','0874','0887','0893','0902'],
		nz : ['0042','0043','0047','0058','0071','0076','0081','0084','0087','0089','0090','0105','0106','0114','0124','0132','0133','0134','0136','0140','0161','0166','0170','0173','0179','0200','0201','0221','0248','0259','0277','0286','0288','0296','0299','0303','0307','0308','0310','0315','0316','0317','0318','0323','0333','0339','0343','0346','0347','0356','0367','0415','0421','0434','0451','0455','0457','0460','0463','0464','0468','0482','0497','0498','0501','0511','0512','0526','0549','0555','0566','0580','0586','0598','0599','0600','0606','0610','0621','0642','0715','0717','0729','0739','0744','0758','0767','0770','0775','0777','0792','0810','0822','0827','0829','0833','0838','0851','0859','0871','0897','0913','0915','0919','0924','0926','0937','0949','0952','0963','0967','0979','0980','0985','0987','0997','0998','1000','1016','1019','1026','1028','1029','1031','1033','1038','1044','1069','1073','1079','1081','1109','1112','1136','1160','1172','1185','1199','1203','1224','1225']
	};

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
