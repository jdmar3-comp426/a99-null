import React, {useState, useEffect} from 'react'
import PageNavbar from './Navbar.js'
import SearchHistoryRow from './SearchHistoryRow.js'
import {ListGroup, Container} from 'react-bootstrap'
import {db, auth} from '../firebase-config'
import {onAuthStateChanged} from 'firebase/auth'
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'


function SearchHistory(props) {
    const [historyEntries, sethistoryEntries] = useState([])
    const [currentUser, setcurrentUser] = useState({})
    onAuthStateChanged(auth, (user) => {
        setcurrentUser(user)
    });

    useEffect(async () => {
        if (!(Object.keys(currentUser).length === 0)){
            const docRef = doc(db, "users", currentUser.uid)
            const docSnap = await getDoc(docRef)
            let historyArray = docSnap._document.data.value.mapValue.fields.picked.arrayValue.values
            let historyRows = []
            for (let i = 0; i < historyArray.length; i++) {
                let curRowInfo = {}
                curRowInfo.title = historyArray[i].stringValue
                let curRowDiv = <SearchHistoryRow key = {i} title={curRowInfo.title} />
                historyRows.push(curRowDiv)
            }
            sethistoryEntries(historyRows)
        }
    }, [currentUser])

    return (
        <div>
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
}

export default SearchHistory