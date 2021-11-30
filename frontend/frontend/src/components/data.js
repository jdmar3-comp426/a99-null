import React, {useState} from 'react'
import axios from 'axios'

import {db, auth} from '../firebase-config'
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";


function Data() {

    // const [input, setInput] = useState("")
    // this code is used for retrieiving restaurants info nearby.
    const getRestaurants = (e) => {
        // get radius
        // make the API call passing in the radius
        e.preventDefault()
        // setInput(e.target.value)
        let lat = 0
        let lon = 0
        let radius = document.getElementById('radius').value
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude

            console.log(lat)
            console.log(lon)
            console.log(radius)
            // add parameters (and pass the stuff from above)
            axios.get(`/app/rests/${lat}/${lon}/${radius}`).then(function(response) {
                console.log(response.data)
                addSearchHistory(response.data.results[0].place_id, response.data.results[0].name)
            })
            //.then(addSearchHistory(response.results[0].place_id, response.results[0].name))
            .catch(function (error) {
                console.log(error)
            })  

        })

        
        // console.log(currentUser)
    }

    // this code will be used for moving to google map.
    const searchRestaurant = (e) => {
        e.preventDefault()
        let place_id = document.getElementById('place_id').value
        console.log(place_id)

        axios.get(`/app/place/${place_id}`).then(function(response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const addSearchHistory = async (place_id, restaurant_name) => {

        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const searchHistoryRef = doc(db, "users", user.uid)
            console.log(place_id)
            console.log(restaurant_name)
            await updateDoc(searchHistoryRef, {
                picked: arrayUnion({"date": new Date(), "place_id": place_id, "restaurant_name": restaurant_name})
            });
        } else {
            console.log("No user signed-in.")
        }
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
                 <input id="radius" type="number" placeholder="1500"></input>
                 <button type="submit">Get restaurant</button>
            </form>

            <form onSubmit = {searchRestaurant}>
                <label for="place_id">Place ID </label>
                <input id="place_id" type="text" placeholder="ChIJQ4wPfPk_cDURiVY9Wjv52AM"></input>
                <button type="search">Search a place</button>
            </form>

            <br/>

        </div>
    )
}

export default Data