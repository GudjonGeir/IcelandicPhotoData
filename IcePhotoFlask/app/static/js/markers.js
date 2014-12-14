$(document).ready(function() {
  var myLatLng = new google.maps.LatLng(64.965003, -18.872854);
  MYMAP.init('#googleMap', myLatLng, 7);
  // MYMAP.init('#googleMap', myLatLng, 10);
  
  $("#showmarkers").click(function(e){
		MYMAP.placeMarkers();
  });
});

var MYMAP = {
  map: null,
	bounds: null
}

MYMAP.init = function(selector, latLng, zoom) {
	var myOptions = {
		zoom:zoom,
		center: latLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	}
	this.map = new google.maps.Map($(selector)[0], myOptions);
	this.bounds = new google.maps.LatLngBounds();
	this.map.set('styles', [
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
			{ color: '#000000' },
			{ weight: 0.1 }
			]
		}, {
			featureType: 'road',
			elementType: 'labels',
			stylers: [
			{ visibility: "off"  },
			]
		}, {
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [
			{ visibility: 'off' }
			]
		}, {
			featureType: 'poi',
			elementType: 'labels',
			stylers: [
			{ visibility: 'off' }
			]
		}, {
			featureType: "administrative",
			elementType: "labels",
			stylers: [
			{ visibility: "off" }
			]
		}
	]);
}

MYMAP.placeMarkers = function() {
	var selectedYear = $("input[name=year]:checked").val();
	var selectedMonth = $("input[name=month]:checked").val();

	$.getJSON( "/getcoords", { nat: 1, year: selectedYear, month: selectedMonth	} )
		.done( function( data ) {
			$.each( data, function( key, val ) {
				var c = new google.maps.LatLng(parseFloat(val.lat),parseFloat(val.long));
				var point = new google.maps.Circle({
					center:c,
					radius:100,
					strokeColor:"#ff0000",
					strokeOpacity:0.8,
					strokeWeight:2,
					fillColor:"#ff0000",
					fillOpacity:1,
					map: MYMAP.map
				});
			})
		})
	$.getJSON( "/getcoords", { nat: 2, year: selectedYear, month: selectedMonth	} )
		.done( function( data ) {
			$.each( data, function( key, val ) {
				var c = new google.maps.LatLng(parseFloat(val.lat),parseFloat(val.long));
				var point = new google.maps.Circle({
					center:c,
					radius:100,
					strokeColor:"#0015ff",
					strokeOpacity:0.8,
					strokeWeight:2,
					fillColor:"#0015ff",
					fillOpacity:1,
					map: MYMAP.map
				});
			})
		})
	$.getJSON( "/getcoords", { nat: 3, year: selectedYear, month: selectedMonth	} )
		.done( function( data ) {
			$.each( data, function( key, val ) {
				var c = new google.maps.LatLng(parseFloat(val.lat),parseFloat(val.long));
				var point = new google.maps.Circle({
					center:c,
					radius:100,
					strokeColor:"#FFEA00",
					strokeOpacity:0.8,
					strokeWeight:2,
					fillColor:"#FFEA00",
					fillOpacity:1,
					map: MYMAP.map
				});
			})
		})
}

// 	$.get(filename, function(xml){
// 		$(xml).find("marker").each(function(){
// 			var name = $(this).find('name').text();
// 			var address = $(this).find('address').text();
			
// 			// create a new LatLng point for the marker
// 			var lat = $(this).find('lat').text();
// 			var lng = $(this).find('lng').text();
// 			var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
			
// 			// extend the bounds to include the new point
// 			MYMAP.bounds.extend(point);
			
// 			var marker = new google.maps.Marker({
// 				position: point,
// 				map: MYMAP.map
// 			});
			
// 			var infoWindow = new google.maps.InfoWindow();
// 			var html='<strong>'+name+'</strong.><br />'+address;
// 			google.maps.event.addListener(marker, 'click', function() {
// 				infoWindow.setContent(html);
// 				infoWindow.open(MYMAP.map, marker);
// 			});
// 			MYMAP.map.fitBounds(MYMAP.bounds);
// 		});
// 	});
// }









// var iceland=new google.maps.LatLng(64.965003, -18.872854);
// 		function initialize()
// 		{
// 			var mapProp = {
// 				center:iceland,
// 				zoom:7,
// 				mapTypeId:google.maps.MapTypeId.ROADMAP,
// 				disableDefaultUI: true
// 			};

// 			var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
// 			map.set('styles', [
// 				{
// 					featureType: 'road',
// 					elementType: 'geometry',
// 					stylers: [
// 					{ color: '#000000' },
// 					{ weight: 0.1 }
// 					]
// 				}, {
// 					featureType: 'road',
// 					elementType: 'labels',
// 					stylers: [
// 					{ visibility: "off"  },
// 					]
// 				}, {
// 					featureType: 'poi',
// 					elementType: 'geometry',
// 					stylers: [
// 					{ visibility: 'off' }
// 					]
// 				}, {
// 					featureType: 'poi',
// 					elementType: 'labels',
// 					stylers: [
// 					{ visibility: 'off' }
// 					]
// 				}, {
// 					featureType: "administrative",
// 					elementType: "labels",
// 					stylers: [
// 					{ visibility: "off" }
// 					]
// 				}
// 			]);

// 			$.getJSON( "/getcoords/icelandic", function( data ) {
// 				$.each( data, function( key, val ) {
// 					var c = new google.maps.LatLng(parseFloat(key.lat),parseFloat(key.long));
// 					var dot = new google.maps.Circle({
// 						center:c,
// 						radius:200000,
// 						strokeColor:"#ff0000",
// 						strokeOpacity:0.8,
// 						strokeWeight:2,
// 						fillColor:"#ff0000",
// 						fillOpacity:1
// 					});
// 					dot.setMap(map);
// 				})
// 			});
// 			  // for(var i = 0; i < 7; i+=2){
// 			  // 
// 			  // var dot = new google.maps.Circle({
// 			  //   center:c,
// 			  //   radius:2000,
// 			  //   strokeColor:"#0000FF",
// 			  //   strokeOpacity:0.8,
// 			  //   strokeWeight:2,
// 			  //   fillColor:"#0000FF",
// 			  //   fillOpacity:1
// 			  //   });
// 			  // dot.setMap(map);
// 			  // }
// 		}
// 		google.maps.event.addDomListener(window, 'load', initialize);