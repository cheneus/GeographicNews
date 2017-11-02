function getCounted() {

  axios.get("https://thecountedapi.com/api/counted", {
      params: {
        // state : state,
        year: year,
        sex: sex,

      }
    })
    .then(function(response) {
      console.log(response)
      drawRegionsMap(response.data)

    })
}

function drawChart() {
	  var state = "IL",
    year = "2016",
    sex = "male";
  var jsonData = axios.get("https://thecountedapi.com/api/counted", {
      params: {
        // state : state,
        year: year,
        sex: sex,

      }
    })
    .then(function(response) {
      console.log(response)
      console.log(jsonData)
    });

  var data = new google.visualization.DataTable(jsonData);
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, { width: 400, height: 240 });
}
