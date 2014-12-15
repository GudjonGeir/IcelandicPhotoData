var map, layer;

function initialize() {

	var iceland = new google.maps.LatLng(64.965003, -18.872854);

	map = new google.maps.Map(document.getElementById('googleMap'), {
		center: iceland,
		zoom: 10
	});
	map.set('styles', [
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
		"elementType": "all",
		"stylers": [
			{
				"color": "#898686"
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
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "labels.text",
		"stylers": [
			{
				"visibility": "off"
			},
			{
				"weight": "0.41"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			},
			{
				"saturation": "22"
			},
			{
				"color": "#ababab"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "administrative.province",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#111111"
			},
			{
				"lightness": 20
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"hue": "#ff0000"
			}
		]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "all",
		"stylers": [
			{
				"color": "#111111"
			},
			{
				"lightness": "20"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "all",
		"stylers": [
			{
				"lightness": "20"
			},
			{
				"color": "#111111"
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
		"featureType": "poi.park",
		"elementType": "all",
		"stylers": [
			{
				"hue": "#ff0000"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#111111"
			},
			{
				"lightness": "20"
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
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#000000"
			},
			{
				"lightness": 17
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
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#000000"
			},
			{
				"lightness": 18
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#000000"
			},
			{
				"lightness": 16
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#000000"
			},
			{
				"lightness": 19
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#406e88"
			},
			{
				"lightness": 17
			}
		]
	}
	]);

	layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'location1',
			from: '1bG5xg7TrN2O-0ra8O4Wel0w6SpPaPwke7EpIPPpa'
		},
		styles: [{
			markerOptions: {
				iconName: "small_red"
			}
		}]
	});
	layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);