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
        axios.get('/rests').then(function(response) {
            console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h2>Gotted</h2>
            </div>
        )
    }
}

export default Data