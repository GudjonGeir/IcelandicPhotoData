var byMonthChartElement;
var byMonthChart;
var byYearChartElement;
var byYearChart;

var options = {
	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : false,

	//Boolean - Whether the line is curved between points
	bezierCurve : true,

	//Boolean - Whether to show a dot for each point
	pointDot : true,

	//Number - Radius of each point dot in pixels
	pointDotRadius : 4,

	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,

	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	pointHitDetectionRadius : 20,

	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,

	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,

	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,

	//String - A legend template
	legendTemplate : "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><span style=\"color:<%=datasets[i].strokeColor%>\"><span></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span><%}%></span>"
}

$(document).ready(function() {
	byMonthChartElement = document.getElementById("byMonth").getContext("2d");
	byYearChartElement = document.getElementById("byYear").getContext("2d");

	getCountByMonth($("#header").attr('year'));
	getCountByYear();
});





function getCountByMonth(clickedYear) {
	$.getJSON( "/getcountbymonth", { year: clickedYear } )
		.done(function( result ) {
			var data = {
			labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			datasets: [
				{
					label: "Icelandic",
					fillColor: "rgba(51,122,183,0.5)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: result.iceland
				},
				{
					label: "Foreign",
					fillColor: "rgba(92,184,94,0.5)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: result.foreign
				},
				{
					label: "Unknown",
					fillColor: "rgba(240,173,78,0.5)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: result.unknown
				}
			]
		};
		if (byMonthChart) {
			byMonthChart.destroy();
			$("#byMonth").attr('width', '800');
			$("#byMonth").attr('height', '400');
		};
		byMonthChart = new Chart(byMonthChartElement).Line(data, options);
		$("#byMonthLegend").html(byMonthChart.generateLegend());
	});


	
}


function getCountByYear() {
	$.getJSON( "/getcountbyyear", {} )
		.done(function( result ) {
			var data = {
				labels: ["2009", "2010", "2011", "2012", "2013", "2014"],
				datasets: [
					{
						label: "Icelandic",
						fillColor: "rgba(51,122,183,0.8)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: result.iceland
					},
					{
						label: "Foreign",
						fillColor: "rgba(92,184,94,0.8)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: result.foreign
					},
					{
						label: "Unknown",
						fillColor: "rgba(240,173,78,0.8)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: result.unknown
					}
				]
			};

		byYearChart = new Chart(byYearChartElement).Line(data, options);
		$("#byYearLegend").html(byYearChart.generateLegend());

			// $("#i2007").html(data.iceland[0]);
			// $("#i2008").html(data.iceland[1]);
			// $("#i2009").html(data.iceland[2]);
			// $("#i2010").html(data.iceland[3]);
			// $("#i2011").html(data.iceland[4]);
			// $("#i2012").html(data.iceland[5]);
			// $("#i2013").html(data.iceland[6]);
			// $("#i2014").html(data.iceland[7]);

			// $("#f2007").html(data.foreign[0]);
			// $("#f2008").html(data.foreign[1]);
			// $("#f2009").html(data.foreign[2]);
			// $("#f2010").html(data.foreign[3]);
			// $("#f2011").html(data.foreign[4]);
			// $("#f2012").html(data.foreign[5]);
			// $("#f2013").html(data.foreign[6]);
			// $("#f2014").html(data.foreign[7]);

			// $("#u2007").html(data.unknown[0]);
			// $("#u2008").html(data.unknown[1]);
			// $("#u2009").html(data.unknown[2]);
			// $("#u2010").html(data.unknown[3]);
			// $("#u2011").html(data.unknown[4]);
			// $("#u2012").html(data.unknown[5]);
			// $("#u2013").html(data.unknown[6]);
			// $("#u2014").html(data.unknown[7]);

	});
}




