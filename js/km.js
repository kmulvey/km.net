// build menu
var imgs = ['seneca.jpg','bbp.jpg','halloween_zombie.jpg','bb_waterfall.jpg','olivia.jpg','event_horizon.jpg','lights.jpg','farted.jpg','grapes.jpg','top_rock_s.jpg','statue.jpg','statue_sunset.jpg','rockafeller.jpg','willie_wonka.jpg','lake_placid.jpg','metrocard.jpg','erp.jpg','guutz.jpg','rock_ctr.jpg','long_island.jpg','central_park_fall.jpg','180ml.jpg','snowman.jpg','pepsi.jpg','dc.jpg'];

for(var i=0; i<imgs.length; i++){
	var img = document.createElement("img");
	img.src = "//img.kevinmulvey.net/images/small/" + imgs[i];
	var link = document.createElement("a");
	link.href = "#/" + imgs[i];
	link.appendChild(img);
	document.getElementById("menu").appendChild(link);
}


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
    var link = "url('" + document.location.hash.replace("#/", uri) + "')";
    $('#viewport').css('background-image', link);
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
  
  // disable right click
  $(document).on("contextmenu",function(e){
		return false;
	});
});
