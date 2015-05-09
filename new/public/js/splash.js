var show;

$("#toc").on("click", "a", function(e){
	show = new slideshow(this.id);
	$("#" + e.delegateTarget.id).hide();
	$("#img-wrap").removeClass("hide");
});
