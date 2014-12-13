$(document).ready(function() {
  var myLatLng = new google.maps.LatLng(64.965003, -18.872854);
  MYMAP.init('#googleMap', myLatLng, 7);
  
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
}

MYMAP.placeMarkers = function() {
	$.getJSON( "/getcoords/icelandic", function( data ) {
		$.each( data, function( key, val ) {
			var c = new google.maps.LatLng(parseFloat(val.lat),parseFloat(val.long));
			console.log(val.lat);
			var point = new google.maps.Circle({
				center:c,
				radius:150,
				strokeColor:"#aaaaaa",
				strokeOpacity:1,
				strokeWeight:0.5,
				fillColor:"#ffe400",
				fillOpacity:1,
				map: MYMAP.map
			});
			// var marker = new google.maps.Marker({
			// 	position: c,
			// 	map: MYMAP.map
			// });
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