$(document).ready(function() {
	$("#wrapper").toggleClass("toggled");
});
$( document ).on( "mousemove", function( event ) {
	if(event.pageX < 10){
		console.log(event.pageX);
		$("#wrapper").toggleClass("toggled");
	}
});
$("#menu-toggle").on('click',function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});




