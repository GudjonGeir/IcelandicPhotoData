var byMonthChartElement;
var byMonthChart;
var byYearChartElement;
var byYearChart;
var byYearPieChartElement;
var byYearPieChart;

var pieChart = [
	{"iceland": 10408, "unknown": 15244, "foreign": 19967},
	{"iceland": 12242, "unknown": 15653, "foreign": 18892},
	{"iceland": 11104, "unknown": 16135, "foreign": 21748},
	{"iceland": 11870, "unknown": 21791, "foreign": 22762},
	{"iceland": 11731, "unknown": 24235, "foreign": 33967},
	{"iceland": 10102, "unknown": 20005, "foreign": 23752},
	{"iceland": 72500, "unknown": 123492, "foreign": 151057}
];

var byYearLineChart = {"iceland": [10408, 12242, 11104, 11870, 11731, 10102], "unknown": [15244, 15653, 16135, 21791, 24235, 20005], "foreign": [19967, 18892, 21748, 22762, 33967, 23752]};

var byMonthLineChart = [
	{
		"iceland": [1240, 958, 817, 1052, 1056, 1198, 1028, 745, 474, 639, 599, 602], 
		"unknown": [1071, 698, 1320, 952, 1335, 1190, 2882, 2255, 1365, 913, 751, 512], 
		"foreign": [617, 556, 1337, 955, 833, 2601, 3593, 4062, 1449, 2771, 557, 636]
	},
	{
		"iceland": [742, 755, 836, 1786, 1230, 998, 1275, 1015, 599, 1280, 918, 808], 
		"unknown": [741, 704, 1122, 958, 1133, 2085, 2568, 1679, 1131, 1660, 885, 987], 
		"foreign": [473, 545, 1060, 668, 2142, 2075, 3902, 3105, 983, 2154, 965, 820]
	},
	{
		"iceland": [1040, 1003, 934, 739, 841, 1101, 1426, 1249, 720, 455, 769, 827], 
		"unknown": [1185, 1041, 907, 1211, 1084, 2787, 2069, 2024, 988, 1128, 654, 1057], 
		"foreign": [1359, 1012, 1459, 1104, 702, 2633, 2600, 3359, 2600, 3621, 862, 437]
	},
	{
		"iceland": [1031, 870, 1041, 1401, 1490, 981, 1364, 691, 791, 791, 680, 739], 
		"unknown": [1099, 1835, 1599, 1554, 888, 3794, 1710, 2973, 2055, 1424, 1771, 1089], 
		"foreign": [903, 701, 1567, 1343, 1370, 2703, 3933, 4490, 1701, 1752, 1296, 1003]
	},
	{
		"iceland": [865, 1155, 1362, 1652, 858, 1063, 1263, 1127, 454, 1021, 349, 562], 
		"unknown": [655, 1091, 2695, 2330, 1274, 3347, 3491, 3931, 1830, 1353, 1173, 1065], 
		"foreign": [669, 1647, 2666, 1322, 2146, 4160, 6019, 4908, 2674, 3058, 2834, 1864]
	},
	{
		"iceland": [654, 800, 587, 1739, 871, 1039, 1066, 978, 895, 458, 916, 99], 
		"unknown": [584, 928, 2491, 1392, 1446, 3342, 3356, 2528, 1172, 1606, 1109, 51], 
		"foreign": [973, 2464, 1817, 1203, 2360, 2684, 3334, 4281, 2253, 1341, 941, 101]
	},
	{
		"iceland": [5799, 5769, 5663, 8456, 6476, 6854, 8340, 6455, 4202, 5070, 4353, 3964], 
		"unknown": [6367, 6668, 10537, 9410, 7694, 17261, 17963, 17150, 9063, 8298, 6881, 5243], 
		"foreign": [5240, 7074, 10635, 6689, 9914, 18085, 24592, 25868, 12275, 15161, 7794, 5303]
	}
];


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
	var index;
	if (clickedYear == "00") {
		index = 6;
	} else {
		index = (parseInt(clickedYear) - 2009);
	}
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
				data: byMonthLineChart[index].iceland
			},
			{
				label: "Foreign",
				fillColor: "rgba(254,101,101,0.4)",
				strokeColor: "rgba(236,54,54,1)",
				pointColor: "rgba(254,101,101,0.5)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(236,54,54,1)",
				data: byMonthLineChart[index].foreign
			},
			{
				label: "Unknown",
				fillColor: "rgba(240,173,78,0.5)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: byMonthLineChart[index].unknown
			}
		]
	};
	byMonthChart = new Chart(byMonthChartElement).Line(data, lineOptions);
	$("#byMonthLegend").html(byMonthChart.generateLegend());
}


function getCountByYear() {
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
				data: byYearLineChart.iceland
			},
			{
				label: "Foreign",
				fillColor: "rgba(92,184,94,0.8)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: byYearLineChart.foreign
			},
			{
				label: "Unknown",
				fillColor: "rgba(240,173,78,0.8)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: byYearLineChart.unknown
			}
		]
	};

	byYearChart = new Chart(byYearChartElement).Line(data, lineOptions);
	$("#byYearLegend").html(byYearChart.generateLegend());
}

function getPieCounts(clickedYear) {
	var index;
	if (clickedYear == "00") {
		index = 6;
	} else {
		index = (parseInt(clickedYear) - 2009);
	}

	var data = [
	    {
	        value: pieChart[index].iceland,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Icelandic"
	    },
	    {
	        value: pieChart[index].foreign,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Foreign"
	    },
	    {
	        value: pieChart[index].unknown,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Unknown"
	    }
	];

	$("#Icelanders_count").html(pieChart[index].iceland);
	$("#Foreigners_count").html(pieChart[index].foreign);
	$("#Unknown_count").html(pieChart[index].unknown);
	$("#Total_count").html(pieChart[index].iceland + pieChart[index].foreign + pieChart[index].unknown);

	byYearPieChart = new Chart(byYearPieChartElement).Pie(data, pieOptions);
	$("#byYearPieLegend").html(byYearPieChart.generateLegend());
}




