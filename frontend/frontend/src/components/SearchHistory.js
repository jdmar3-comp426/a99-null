import React, {useState, useEffect} from 'react'
import PageNavbar from './Navbar.js'
import SearchHistoryRow from './SearchHistoryRow.js'
import {Row, Col, Container} from 'react-bootstrap'
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
            console.log(historyArray)
            if (historyArray) {
                for (let i = 0; i < historyArray.length; i++) {
                    let curRowInfo = {}
                    curRowInfo.title = historyArray[i].mapValue.fields.restaurant_name.stringValue
                    curRowInfo.date = historyArray[i].mapValue.fields.date.timestampValue
                    curRowInfo.placeId = historyArray[i].mapValue.fields.place_id.stringValue
                    let map_link = "https://www.google.com/maps/place/?q=place_id:" + curRowInfo.placeId
                    let curRowDiv = <SearchHistoryRow key = {i} title={curRowInfo.title} date={curRowInfo.date} map_link={map_link}/>
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
                <Container className="search-history-container">
                    <div>
                        <h1 className="search-history-title">
                            Search History
                        </h1>
                    </div>
                    <div className="search-history-row-title">
                        <Row>
                            <Col
                                className="justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Search Date</div>
                                </div>
                            </Col>
                            <Col
                                className="justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Restaurant Name</div>
                                {props.info}
                                </div>
                            </Col>
                            <Col
                                className="justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Open in Google Map</div>
                                {props.info}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        {historyEntries}
                    </div>
                </Container>
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default SearchHistory