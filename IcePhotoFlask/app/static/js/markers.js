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
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4fbff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c02c2c"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#428595"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
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

