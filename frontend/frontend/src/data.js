import React, {useState} from 'react'
import axios from 'axios'

import {db, auth} from './firebase-config'
import {doc, updateDoc, arrayUnion} from 'firebase/firestore'

function Data() {

    // const [input, setInput] = useState("")

    const getRestaurants = (e) => {
        // get radius
        // make the API call passing in the radius
        e.preventDefault()
        // setInput(e.target.value)
        let lat = 0
        let lon = 0
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude
            console.log(lat)
            console.log(lon)

            // console.log the radius value to test here...

            // add parameters (and pass the stuff from above)
            axios.get(`/rests/${lat}/${lon}`).then(function(response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })  
        })
        // console.log(currentUser)
    }

    const searchRestaurant = (e) => {
        e.preventDefault()
        let place_id = "ChIJQ4wPfPk_cDURiVY9Wjv52AM"
        console.log(place_id)

        axios.get(`/place/${place_id}`).then(function(response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    // const addRestaurant = (e) => {
    //     const user = getAuth.currentUser;
    //     if (user != null) {
    //         let docRef = doc(db, 'users', "PcecP0IkayM8Sy4VST3gItTwjiC2");
    //         console.log(user.uid)
    //         updateDoc(docRef, {
    //             picked: arrayUnion("ChIJQ4wPfPk_cDURiVY9Wjv52AM")
    //         });
    //     }
    // }

    return (
        <div>
             <h2>Gotted</h2>

             <form onSubmit = {getRestaurants}>
                 <label for="radius">Radius (meters?) </label>
                 <input type="number" placeholder="1500"></input>
                 <button type="submit">Get restaurant</button>
            </form>

            <form onSubmit = {searchRestaurant}>
                <label for="place_id">Place ID </label>
                <input type="text" placeholder="ChIJQ4wPfPk_cDURiVY9Wjv52AM"></input>
                <button type="search">Search a place</button>
            </form>

            <br/>

        </div>
    )
}

export default Data