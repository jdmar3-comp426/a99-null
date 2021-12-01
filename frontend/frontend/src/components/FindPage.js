import React, {useState,createClass} from 'react'
import PageNavbar from './Navbar.js'
import {db, auth} from '../firebase-config'
import {Navigate } from 'react-router-dom'
import axios from 'axios'
//import MapContainer from './MapContainer.jsx'
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {Popover,Button,Over} from 'react-bootstrap';

function FindPage () {

    const user = auth.currentUser;
    const [currentUser, setcurrentUser] = useState({})
    const [rating, setRating] = useState(0)
    const [name,setName] = useState(0)
    const[price,setPrice] = useState(0)
    const[address,setAddress] = useState(0)
    onAuthStateChanged(auth, (user) => {
        setcurrentUser(user);
    });

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

    const getRestaurant = (e) => {
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

            //picking a restaurant based on a random number
            //need to change this based on array length size later
         axios.get(`/app/rests/${lat}/${lon}/${radius}`).then(function(response){
            // picking a random index from the array of nearby restaurants
            let i = Math.floor(Math.random() * (response.data.results.length));
            console.log(response.data.results)
            addSearchHistory(response.data.results[i].place_id, response.data.results[i].name)

            //saving desired data from randomly selected restaurant
            setRating(response.data.results[i]["rating"]);
            setName(response.data.results[i]["name"]);
            setPrice(response.data.results[i]["price_level"]);
            setAddress(response.data.results[i]["vicinity"]);


         }).catch(function (error) {
                console.log(error)
            })
        })

    }

    console.log(currentUser)
    if (currentUser) {
        return (
            <div>
            <PageNavbar />
            <form onSubmit = {getRestaurant}>
                 <label for="radius">Radius (meters?) </label>
                 <input id="radius" type="number" placeholder="1500"></input>
                 <button type="submit">Get restaurant</button>
            </form>



            <p>Restaurant: {name}</p>
            <p>Address: {address}</p>
            <p>Rating: {rating} </p>
            <p> Pricing (relative out of 5): {price}</p>


            </div>

        )} else {
        return <Navigate to="/" />
    }
}
export default FindPage;
