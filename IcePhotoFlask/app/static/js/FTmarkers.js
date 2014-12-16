var map, layer;

var mapIds = [ '1ceNRCGP68VNVBhyII3Hl_cl2GZ0QkQdYxCuWCDu8',			// 2009
				'1ATlEA8QZATnjlx2XJZ_mGtstWEOKSIOSx20RhgXa',		// 2010
				'1A2M-KmL9Uk1uazOXNZqHI0PXrawBftVx1Cg1NMFe',		// 2011
				'1jdMUsqhaGRjEKD5YqPn_EbHwxAumjoi27stYqEQY',		// 2012
				'1C8bhgk_6hgaDwDvju3dT_artVl0WjzIoNo91cI9q',		// 2013
				'1ixS25C61lip5z-ILINGpsllo1j8yhj2a-1Uh9xxl' ];		// 2014



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
	var mapid = mapIds[year-2009]
	layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'lat',
			from: mapid
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