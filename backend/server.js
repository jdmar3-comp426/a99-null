const express = require('express'); //Line 1
const app = express(); //Line 2
var request = require("request")
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/app/backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

// set up more parameters
app.get('/app/rests/:lat/:lon/:radius', (req,res) => {
    console.log(req.params)
    request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat}%2C${req.params.lon}&radius=${req.params.radius}&type=restaurant&key=AIzaSyDoh9FWT2OHgzc9GhHbNlMtvymkKx89mkU`,
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed = JSON.parse(body)
            res.send(parsed)
        }
    })
})

app.get('/app/place/:placeid', (req,res) => {
    console.log(req.params)
    request(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeid}&key=AIzaSyDoh9FWT2OHgzc9GhHbNlMtvymkKx89mkU`,
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed = JSON.parse(body)
            res.send(parsed)
        }
    })
})