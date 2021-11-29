import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {db, auth} from '../firebase-config'
import {Navigate } from 'react-router-dom'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import Data from './data'

function FindPage() {
    const user = auth.currentUser;
    const [currentUser, setcurrentUser] = useState({})
    onAuthStateChanged(auth, (user) => {
        setcurrentUser(user)
    });

    console.log(currentUser)
    if (currentUser) {
        return (
            <div>
                <PageNavbar />
                 find restaurant;
                 <Data />
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default FindPage