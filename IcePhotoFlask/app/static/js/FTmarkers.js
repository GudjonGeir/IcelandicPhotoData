var map, layer;

var id2014 = '1EFNyT0DhEpO852m6d1ulyrV9FWz6QHupE6eqSKE9';
var id2013 = '1bjdFPV9EKvNJeAFiZaj-EF8HQOn2HtWZln4MwMoz';
var id2012 = '1A1bcSWqMO7xLDssnQWudsVNvWXXLGKoF8haBhYED';
var id2011 = '1IXWSYzCKzqqBuPsW3Unrq5iGsx2y03C889DNDCOt';
var id2010 = '1BW2DBPXNaYKB-NPiCLEzesBfURcMl5ef9kLrk3_x';
var id2009 = '14fN9oSI49A8W5r1hbeiGirg4izEXkNQSJ5G5J45u';



function initialize() {
	var year = $("#header").attr('year');
	var iceland = new google.maps.LatLng(64.965003, -18.872854);

	map = new google.maps.Map(document.getElementById('googleMap'), {
		center: iceland,
		zoom: 7
	});
	map.set('styles', [
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
	if (year == "00") {
		for (var i = 2009; i < 2015; i++) {
			addLayer(i.toString(), map);
			console.log(i.toString());
		};
	} else {
		addLayer(year, map);
		console.log(year);
	}
}

function addLayer(year, map) {
	layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'lat',
			from: 'id' + year
		},
		styles: [{
			where: 'nat = 1',
			markerOptions: {
				iconName: "measle_turquoise"
			}
		}, {
			where: 'nat = 2',
			markerOptions: {
				iconName: "small_red"
			}
		}, {
			where: 'nat = 3',
			markerOptions: {
				iconName: "small_yellow"
			}
		}]
	});
	layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);