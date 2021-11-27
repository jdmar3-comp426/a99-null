const express = require('express'); //Line 1
const app = express(); //Line 2
// var cors = require('cors')
// app.use(cors())
var request = require("request")
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.get('/rests', (req,res) => {
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyDoh9FWT2OHgzc9GhHbNlMtvymkKx89mkU',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed = JSON.parse(body)
            res.send(parsed)
        }
    }
    )
})

// get current device location
/*
  let lat
  let lon

  const successLocation = position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getRestaurant()
    .then(data => 
      console.log(data))
  
  }

  const errorLocation = error => {
    console.error(error);
  }

  const watchID = navigator.geolocation.getCurrentPosition(successLocation, errorLocation);

  const getRestaurant = async () => {
    const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyDoh9FWT2OHgzc9GhHbNlMtvymkKx89mkU')
    //const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lon + '&radius=1500&type=restaurant&key=AIzaSyDoh9FWT2OHgzc9GhHbNlMtvymkKx89mkU');
    const data = await response.json();
    return data;
  }

  console.log(getRestaurant())
*/