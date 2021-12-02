import React, {useState, useEffect} from 'react'
import PageNavbar from './Navbar.js'
import SearchHistoryRow from './SearchHistoryRow.js'
import {ListGroup, Container} from 'react-bootstrap'
import {db, auth} from '../firebase-config'
import {onAuthStateChanged} from 'firebase/auth'
import { getAuth } from "firebase/auth";
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'
import {Navigate } from 'react-router-dom'

import '../App.css'

function SearchHistory(props) {
    const [historyEntries, sethistoryEntries] = useState([])
    const [currentUser, setcurrentUser] = useState({})
    onAuthStateChanged(auth, (user) => {
        setcurrentUser(user)
    });

    useEffect(async () => {
        if (currentUser && !(Object.keys(currentUser).length === 0)){
            const docRef = doc(db, "users", currentUser.uid)
            const docSnap = await getDoc(docRef)
            let historyArray = docSnap._document.data.value.mapValue.fields.picked.arrayValue.values
            let historyRows = []
            if (historyArray) {
                for (let i = 0; i < historyArray.length; i++) {
                    console.log(historyArray[i].mapValue.fields.restaurant_name)
                    
                    let curRowInfo = {}
                    curRowInfo.title = historyArray[i].mapValue.fields.restaurant_name.stringValue
                    let curRowDiv = <SearchHistoryRow key = {i} title={curRowInfo.title} />
                    historyRows.push(curRowDiv)
                }
                sethistoryEntries(historyRows)
            }
        }
    }, [currentUser])

    if (currentUser) {
        return (
            <div className="search-history">
                <PageNavbar />
                <Container >
                    <div>
                        <h1>
                            My Search History
                        </h1>
                    </div>
                    <ListGroup>
                        {historyEntries}
                    </ListGroup>
                </Container>
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default SearchHistory