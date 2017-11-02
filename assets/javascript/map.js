function initMap() {
  const options = {
    start: {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6
    }
  };
  // let map, infoWindow, marker;
  let infoWindow = new google.maps.InfoWindow;
  let geocoder = new google.maps.Geocoder;
  console.log(geocoder)
  // creating a map
  let map = new google.maps.Map(document.getElementById('map'), options.start);
  let markerArr;


  // google.maps.event.addListener(map, 'click', function(event) {
  //   var latLng = event.latLng
  //   addMarker({ coords: latLng },
  //     // { content: }
  //   );
  //   console.log("lat: " + latLng.lat() + ",lng: " + latLng.lng());
  //   console.log(event)
  // });



  function addSample() {
    let markerArr = [{
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
  }



  // for (i = 0; i < markerArr.length; i++) {
  //   addMarker(markerArr[i]);
  // }


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
      const location = "60626"
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

  google.maps.event.addListener(map, 'click', function(event) {
    var latLngInput = event.latLng;
    var lat = latLngInput.lat();
    console.log(lat);
    var lon = latLngInput.lng();
    console.log(lon);
    getLocation(lat, lon);
    // var latLngGeo = event
    addMarker({ coords: latLngInput },
      // { content: }
    );
    console.log("lat: " + latLngInput.lat() + ",lng: " + latLngInput.lng());
    console.log(event)
    gmapDo.getLatLng(latLngInput, geocoder, map, infoWindow)
  });


  gmapDo.getGeocode();
  // $('#geolocation').on('click', function() {

  // })
};
