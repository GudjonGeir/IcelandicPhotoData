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
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bd8383"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#685050"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a68585"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "20"
            },
            {
                "visibility": "simplified"
            },
            {
                "color": "#494949"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#535353"
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
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
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
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a01b1b"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dc9110"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b72222"
            },
            {
                "lightness": "21"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ababab"
            },
            {
                "lightness": 16
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
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#afafaf"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#40e5e3"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b5deef"
            },
            {
                "lightness": 17
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

