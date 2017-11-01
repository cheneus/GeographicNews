var map, markers = [];

function initMap() {
  const options = {
    start: {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6
    }
  };

  var infoWindow = new google.maps.InfoWindow;
  var geocoder = new google.maps.Geocoder;
  // creating a map
  var haightAshbury = { lat: 37.769, lng: -122.446 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: 'terrain'
  });

  google.maps.event.addListener(map, 'click', function(event) {
    var latLngInput = event.latLng
    //   addMarker({ coords: latLngInput },
    //     // { content: }

    //   );

    //   // gMarker.display();
    console.log("lat: " + latLngInput.lat() + ",lng: " + latLngInput.lng());
    console.log(event)
    gmapDo.getLatLng(latLngInput, geocoder, map, infoWindow)

  });


  gmapDo.getGeocode();
  // $('#geolocation').on('click', function() {

  // })
};

function addSample() {
  var markers = [{
      coords: { lat: -37.8136, lng: 144.9631 },
      content: "Melbourne"
    },
    {
      coords: { lat: -41.2865, lng: 174.7762 },
      content: "Wellington"
    }
  ]
  // addMarker({
  //   coords: { lat: -37.8136, lng: 144.9631 },
  //   content: "Melbourne"
  // });
};
// marker
// var marker =  new google.maps.Marker({
//   position:{lat:33.8688, lng:151.2093},
//   map:map,
// })
// Try HTML5 geolocation.
function browserGeocode() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function addMarker(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
  });
  // check for new icons
  if (props.iconImage) {
    // set icon image
    marker.setIcon(props.iconImage)
  }
  if (props.content) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    })
    marker.addListener('click', function() {
      infoWindow.open(map, marker)
    });
  }

  markers.push(marker);
}

function setMapOnAll(map) {
  console.log(map + "lol")
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  console.log("clear")
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Delete all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// your gmap interactive method
var gmapDo = {
  getLatLng: function(coords, geocoder, map, infowindow) {

    // var input = document.getElementById('latlng').value;
    // var latlngStr = latLngGeo.split(',', 2);
    var latlng = { lat: parseFloat(coords.lat()), lng: parseFloat(coords.lng()) };
    // var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
    geocoder.geocode({ 'location': latlng }, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          // map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          console.log(results)
          infowindow.setContent(results[0].formatted_address);
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
          markers.push(marker);
          $('#location').text(results[3].address_components[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  },

  getGeocode: function() {
    // const location = "60626"
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: 'AIzaSyD1Uqd8fvNhgRklbA6UVIr5Mmf23Ns0aGA'
        }
      })
      .then(function(response) {
        console.log(response)
        console.log(response.data.results[0].formatted_address);

        var formattedAddress = response.data.results[0].formatted_address;
        var formattedAddressOutput = '<ul class="list-group"><li class="list-group-item">${formattedAddress}</li></ul>';
        var addressComp = response.data.results[0].address_components;
        var addressCompOutput = '<ul class="list-group">';
        for (var i = 0; i < addressComp.length; i++) {
          // addressCompOutput += '<li class="list-group-item">${addressComp[i].types[0]}<strong>${addressComp[i].long_name}</strong></li>';
          addressCompOutput += '<li class="list-group-item">' + addressComp[i].types[0] + ': <strong>' + addressComp[i].long_name + '</strong></li>';
        }
        addressCompOutput += '</ul>';
        console.log(formattedAddress);
        console.log(addressCompOutput);
        document.getElementById('address').innerHTML = formattedAddress;
        document.getElementById('address_comp').innerHTML = addressCompOutput;


      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
