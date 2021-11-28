import React, {Component} from 'react'
import axios from 'axios'

class Data extends Component {
    constructor() {
        super()
        this.state = {
            stuff: []
        }
    }

    componentDidMount() {
        let lat = 0
        let lon = 0
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude
            console.log(lat)
            console.log(lon)

            // add parameters (and pass the stuff from above)
            axios.get(`/rests/${lat}/${lon}`).then(function(response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })  
        })
    }

    // event listener to generate random restaurant in the API call when a button is pressed

    render() {
        return (
            <div>
                <h2>Gotted</h2>
            </div>
        )
    }
}

export default Data