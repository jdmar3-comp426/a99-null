import React, {useState,createClass} from 'react'
import PageNavbar from './Navbar.js'
import {db, auth} from '../firebase-config'
import {Navigate,Link } from 'react-router-dom'
import axios from 'axios'
//import MapContainer from './MapContainer.jsx'
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {Popover,Button,Over} from 'react-bootstrap';

import '../App.css'

function FindPage () {

    const user = auth.currentUser;
    const [currentUser, setcurrentUser] = useState({})
    const [rating, setRating] = useState(0)
    const [name,setName] = useState(0)
    const[price,setPrice] = useState(0)
    const[address,setAddress] = useState(0)
    const[lat,setLat] = useState(0)
    const[long,setLong]= useState(0)
    const[display,setDisplay]=useState(0)
    const[showing,setShowing]= useState(false)
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
        setDisplay(({ showing: false }))

        // setShowing(true);
        // get radius
        // make the API call passing in the radius
        e.preventDefault()
        // setInput(e.target.value)
        let lat = 0
        let lon = 0
        let radius = document.getElementById('radius').value ? document.getElementById('radius').value : 1500

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
            setLat(response.data.results[i]["geometry"]["location"]["lat"]);
            setLong(response.data.results[i]["geometry"]["location"]["lng"]);




         }).catch(function (error) {
                console.log(error)
            })
        })

    }
    const Search =() =>{
        return(
            <div>
            { showing ? <Results /> : null }
            </div>
        )

    }

    const Results = () =>{
        return(
        <div className="find-info">
                    <p>Restaurant: {name}</p>
                    <p>Address: {address}</p>
                    <p>Rating: {rating} </p>
                    <p> Pricing (relative out of 5): {price}</p>
                    <a rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} target="_blank">Click for Map</a>

        </div>
        )



    }

    const onClick = () => setShowing(true);
    console.log(currentUser)
    if (currentUser) {
        return (
            <div className="findpage">
            <PageNavbar />
            {/* input form */}
            <div className="find-content">
                <div className="find-form">
                    <form onSubmit = {getRestaurant}>



                        <div className="find-form-content">
                            <label for="radius" className="find-form-content-radius">Radius (meters?) </label> <br/>
                            <input id="radius" type="number" placeholder="1500"></input><br/>
                            <button type="submit" onClick={onClick}>Get restaurant</button>


                        </div>

                    </form>
                </div>


                {/* information */}
               <Search />

            </div>
        </div>
        )} else {
        return <Navigate to="/" />
    }
}
export default FindPage;
