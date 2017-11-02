function drawRegionsMap() {
  // var data = google.visualization.arrayToDataTable([
  // ]);
  var dimension = "count";
  axios.get("https://thecountedapi.com/api/counted", {
      params: {
        // state : state,
        year: year,
        sex: sex,

      }
    })
    .then(function(response) {
      console.log(response)
      var statesArray = [
        ["State", dimension]
      ];
      $.each(response.data)

    })

  var options = {
    region: "US",
    resolution: "provinces"
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
// function drawRegionsMap(response) {
//   var data =  new google.visualization.DataTable(response)

//   var options = {
//   	region: "US",
//   	resolution: "provinces"
//   };

//   var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

//   chart.draw(data, options);
// }
function drawStatesMap() {
		  var state = "IL",
    year = "2016",
    sex = "male";
  var options = { region: 'US', resolution: 'provinces' };
  var dimension = "population";
  axios.get("https://thecountedapi.com/api/counted", {
      params: {
        // state : state,
        year: year,
        sex: sex,

      }
    })
    .then(function(response) {
      console.log(response)

      var statesArray = [
        ["State", "count"]
      ];
      $.each(response.data.states, function() {
        var stateitem = [us+state, this[dimension]];
        statesArray.push(stateitem);

      })
      var statesData = google.visualization.arrayToDataTable(statesArray);
      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(statesData, options);
      $("h3").append(" Sorted by  " + dimension);
    });
}
