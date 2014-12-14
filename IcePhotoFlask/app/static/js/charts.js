$(document).ready(function() {
	$(".getCount").click(function(e){
		getCount($(this).attr('year'));
	});
});

function getCount(clickedYear) {
	$.getJSON( "/getcount", { nat: 1, year: clickedYear } )
		.done(function( data ) {
			$("#Jan1").html(data[0]);
			$("#Feb1").html(data[1]);
			$("#Mar1").html(data[2]);
			$("#Apr1").html(data[3]);
			$("#May1").html(data[4]);
			$("#Jun1").html(data[5]);
			$("#Jul1").html(data[6]);
			$("#Aug1").html(data[7]);
			$("#Sep1").html(data[8]);
			$("#Oct1").html(data[9]);
			$("#Nov1").html(data[10]);
			$("#Des1").html(data[11]);
	});
	$.getJSON( "/getcount", { nat: 2, year: clickedYear } )
		.done(function( data ) {
			$("#Jan2").html(data[0]);
			$("#Feb2").html(data[1]);
			$("#Mar2").html(data[2]);
			$("#Apr2").html(data[3]);
			$("#May2").html(data[4]);
			$("#Jun2").html(data[5]);
			$("#Jul2").html(data[6]);
			$("#Aug2").html(data[7]);
			$("#Sep2").html(data[8]);
			$("#Oct2").html(data[9]);
			$("#Nov2").html(data[10]);
			$("#Des2").html(data[11]);
	});
	$.getJSON( "/getcount", { nat: 3, year: clickedYear } )
		.done(function( data ) {
			$("#Jan3").html(data[0]);
			$("#Feb3").html(data[1]);
			$("#Mar3").html(data[2]);
			$("#Apr3").html(data[3]);
			$("#May3").html(data[4]);
			$("#Jun3").html(data[5]);
			$("#Jul3").html(data[6]);
			$("#Aug3").html(data[7]);
			$("#Sep3").html(data[8]);
			$("#Oct3").html(data[9]);
			$("#Nov3").html(data[10]);
			$("#Des3").html(data[11]);
	});
}










