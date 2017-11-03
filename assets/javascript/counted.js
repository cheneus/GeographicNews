function getCounted() {
	var state =  "IL", year = "2016", sex = "male";
  axios.get("https://thecountedapi.com/api/counted", {
    params: {
      state : state,
      year: year,
     	sex: sex,

    }
  })
  .then( function(response) {
  	console.log(response)
  })
}
