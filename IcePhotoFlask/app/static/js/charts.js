


var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

$(document).ready(function() {
	getCountByYear();
	$(".getCount").click(function(e){
		getCountByMonth($(this).attr('year'));
	});

	var ctx = document.getElementById("myChart").getContext("2d");
	var myNewChart = new Chart(ctx).Line(data);
});







function getCountByMonth(clickedYear) {
	$.getJSON( "/getcountbymonth", { nat: 1, year: clickedYear } )
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
	$.getJSON( "/getcountbymonth", { nat: 2, year: clickedYear } )
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
	$.getJSON( "/getcountbymonth", { nat: 3, year: clickedYear } )
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


function getCountByYear() {
	$.getJSON( "/getcountbyyear", {} )
		.done(function( data ) {
			$("#i2007").html(data.iceland[0]);
			$("#i2008").html(data.iceland[1]);
			$("#i2009").html(data.iceland[2]);
			$("#i2010").html(data.iceland[3]);
			$("#i2011").html(data.iceland[4]);
			$("#i2012").html(data.iceland[5]);
			$("#i2013").html(data.iceland[6]);
			$("#i2014").html(data.iceland[7]);

			$("#f2007").html(data.foreign[0]);
			$("#f2008").html(data.foreign[1]);
			$("#f2009").html(data.foreign[2]);
			$("#f2010").html(data.foreign[3]);
			$("#f2011").html(data.foreign[4]);
			$("#f2012").html(data.foreign[5]);
			$("#f2013").html(data.foreign[6]);
			$("#f2014").html(data.foreign[7]);

			$("#u2007").html(data.unknown[0]);
			$("#u2008").html(data.unknown[1]);
			$("#u2009").html(data.unknown[2]);
			$("#u2010").html(data.unknown[3]);
			$("#u2011").html(data.unknown[4]);
			$("#u2012").html(data.unknown[5]);
			$("#u2013").html(data.unknown[6]);
			$("#u2014").html(data.unknown[7]);

	});
}




