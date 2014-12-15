var map, layer;

function initialize() {

	var iceland = new google.maps.LatLng(64.965003, -18.872854);

	map = new google.maps.Map(document.getElementById('googleMap'), {
		center: iceland,
		zoom: 10
	});

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