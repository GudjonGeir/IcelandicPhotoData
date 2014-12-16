var byMonthChartElement;
var byMonthChart;
var byYearChartElement;
var byYearChart;
var byYearPieChartElement;
var byYearPieChart;

var lineOptions = {
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

var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    //legendTemplate :"<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><div style=\"color:<%=segments[i].fillColor%>\"><div></div><%if(segments[i].label){%><%=segments[i].label%><%}%></div><%}%></div>"
    legendTemplate :"<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}

$(document).ready(function() {
	byMonthChartElement = document.getElementById("byMonth").getContext("2d");
	byYearChartElement = document.getElementById("byYear").getContext("2d");
	byYearPieChartElement = document.getElementById("byYearPie").getContext("2d");

	getCountByMonth($("#header").attr('year'));
	getCountByYear();
	getPieCounts($("#header").attr('year'));
});





function getCountByMonth(clickedYear) {
	$.getJSON( "/getcountbymonth", { year: clickedYear } )
		.done(function( result ) {
			var data = {
			labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			datasets: [
				{
					label: "Icelandic",
					fillColor: "rgba(151,253,253,0.4)",
					strokeColor: "rgba(31,178,178,1)",
					pointColor: "rgba(151,253,253,0.5)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(31,178,178,1)",
					data: result.iceland
				},
				{
					label: "Foreign",
					fillColor: "rgba(254,101,101,0.4)",
					strokeColor: "rgba(236,54,54,1)",
					pointColor: "rgba(254,101,101,0.5)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(236,54,54,1)",
					data: result.foreign
				}/*,
				{
					label: "Unknown",
					fillColor: "rgba(240,173,78,0.5)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: result.unknown
				}*/
			]
		};
		if (byMonthChart) {
			byMonthChart.destroy();
			$("#byMonth").attr('width', '800');
			$("#byMonth").attr('height', '400');
		};
		byMonthChart = new Chart(byMonthChartElement).Line(data, lineOptions);
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
						fillColor: "rgba(151,253,253,0.8)",
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

		byYearChart = new Chart(byYearChartElement).Line(data, lineOptions);
		$("#byYearLegend").html(byYearChart.generateLegend());
	});
}

function getPieCounts(clickedYear) {
	$.getJSON( "/getcountbyyear", { year: clickedYear} )
		.done(function( result ) {
			var ice_cnt = parseInt(result.iceland[0]);
			var for_cnt = parseInt(result.foreign[0]);
			var unk_cnt = parseInt(result.unknown[0]);
			var tot_cnt = ice_cnt + for_cnt + unk_cnt;
			$("#Icelanders_count").html(ice_cnt);
			$("#Foreigners_count").html(for_cnt);
			$("#Unknown_count").html(unk_cnt);
			$("#Total_count").html(tot_cnt);
			var data = [
			    {
			        value: result.iceland[0],
			        color:"#97fdfd",
			        highlight: "#4cfcfc",
			        label: "Icelanders"
			    },
			    {
			        value: result.foreign[0],
			        color: "#fe6565",
			        highlight: "#fd5858",
			        label: "Foreigners"
			    },
			    {
			        value: result.unknown[0],
			        color: "#fbff99",
			        highlight: "#f9ff66",
			        label: "Unknown"
			    }
			];

		byYearPieChart = new Chart(byYearPieChartElement).Pie(data, pieOptions);
		$("#byYearPieLegend").html(byYearPieChart.generateLegend());
	});
}




