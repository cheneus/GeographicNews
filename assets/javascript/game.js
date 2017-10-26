  var map, infoWindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
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


//-----------------------------Twitter-------------------------------------//


    //Global variables for news and twitter
    var nyTimes;
    var twitter;
    var latLocation;
    var longLocation;

      //Function to generate initial buttons from emotions array
      /* function news() {
        //Deleting the emotions prior to adding new emotions
        $("#news-view").empty();
        //Loop to go through the values in the emotions array
        for (var i = 0; i <                                               ; i++) {
          //Then dynamically create a <button> element for each
          var a = $("<div>");
          //Adding a class of emotion to the button
          a.addClass("newsClass");
          //Adding a data-attribute
          a.attr("data-news",                                        [i]);
          //Providing the initial button text
          a.text(emotions[i]);
          //Add the button to the HTML
          $("#news-view").append(a);
        }
      }; */

      //Call to create buttons
      // news();


/*---------AJAX call to access API and return still gifs----------*/
    
//     //Event listener to all buttons
//     $(document.body).on("click", ".emotion", function() {
//     //Create variable to hold the data from the button clicked to
//     //search in the API. Return is limited to 10

//   $.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?", {api_key:"097ee9426aa547eebab73b606dba9719", 
//   + $.param ({
//     'latitude': "latLocation",
//     'longitude': "longLocation"
// });, limit:"10"}).done(function(response){

//     //AJAX call to request gifs from API
//       $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).done(function(response) { 
//     //After data comes back console.log to see what return is
//     //recieved from the API
//           console.log(queryURL);
//           console.log(response);
//     //Once data is returned store the results in a variable
//     var results = response.data;

