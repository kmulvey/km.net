$(document).ready(function(){
  // fire image load from menu
  $('a.dock-item').on('click', function(event) {
		var clicked = $(this);
		var count = 0;
		$('a.dock-item').each(function( index ) {
			if($(this) === clicked) {
				curr_img = count;
				return false;
			}
			count++;
		});
  });
  $(window).on('hashchange', function (e) {
    if(document.location.hash===""){return;}
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
