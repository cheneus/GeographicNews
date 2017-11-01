//---------------------Firebase--------------------------------------//
  var config = {
    apiKey: "AIzaSyAuR6SOo3-eO7apiuHGGI8Ga_D9l_gWDa8",
    authDomain: "group-project-1-50c82.firebaseapp.com",
    databaseURL: "https://group-project-1-50c82.firebaseio.com",
    projectId: "group-project-1-50c82",
    storageBucket: "",
    messagingSenderId: "345184424946"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#add-job").on('click', function(){
event.preventDefault();

  //grab user input
  var newJob = $("#user-input").val().trim();

  database.ref("jobs").push(newJob);
  console.log(newJob);

  //clear field of user input
  $("#user-input").val("");

});

$("#map").on('click', function(){
event.preventDefault();

  //grab user location selection
  var newLocation = $('#location').val().trim();

  database.ref("locations").push(newLocation);

});

//Call to NYTimes to get articles
function getLocation(event) {
//   event.preventdefault();
    console.log("it worked");
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json";
  queryURL += '?' + $.param({
    'api-key': "01779c7ce4234a8ab3ac8c8c29f9eeba",
    'latitude': "latLngInput.lat()",
    'longitude': "latLngInput.lng()"
      })
    //Ajax call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(r) {
    //Console.log data received
          //console.log(queryURL);
          console.log(r);
    //Once data is returned store the results in a variable
    var nyResults = r.response.docs;
          console.log(r.response)
    for (var i = 0; i < nyResults.length; i++) {
      var articles = $("<div>");
        articles.addClass("news");
        articles.attr("id", "newsSpot");
        $(".journalismContent").append(articles);

      //Add headline
      if (nyResults[i].headline.main !== "null") {
        $("#newsSpot").append("<h6 class='articleHeadline'>" + nyResults[i].headline.main);
        // Log the first article's headline to console
        console.log(nyResults[i].headline.main);
        };

      var date = moment('nyResults[i].pub_date', 'YYYY-DD-MMTHH:mm:ss.000').format('MM-DD-YYYY');

      //Add article date and URL
      $("#newsSpot").append("<h7>" + date + "</h7>" +
          nyResults[i].web_url + "</a>"
        );

      //Add snippet
      if (nyResults[i].snippet && nyResults[i].snippet) {
        $("#newsSpot").append("<h7 class='articleSnippet'>" + nyResults[i].snippet + "</h7>");
      };

    };
  });
};

//-----------------------------NYTimes-------------------------------------//
//NYTimes
  $("#location").on("click", getLocation());