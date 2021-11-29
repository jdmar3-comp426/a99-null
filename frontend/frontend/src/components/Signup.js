import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {Form, Button, Container, Row} from 'react-bootstrap'
import {Navigate } from 'react-router-dom'
import {db, auth} from '../firebase-config'
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'


function Signup() {
    const user = auth.currentUser;
    const [registerEmail, setregisterEmail] = useState("")
    const [registerPassword, setregisterPassword] = useState("")
    const [currentUser, setcurrentUser] = useState({})

    onAuthStateChanged(auth, (loggedin) => {
        setcurrentUser(loggedin)
      })

    // create new user
    const register = async () => {
        try{
        // peter - changed - 11/27/2022
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then(async(userRec) => {
            const userInfo = userRec.user;
            await setDoc(doc(db, "users", userInfo.uid), {
            email: registerEmail,
            password: registerPassword,
            picked: []
            })
        })
        // peter - changed - 11/27/2022
        //createAccount()
        } catch (error) {
        console.log(error.message)
        }
    }

    console.log(user)
    if (user) {
        return <Navigate to="/find" />
    } else {
        return (
                <div>
                <PageNavbar />

                <div class=".mt-n1">
                    <Container >
                    <Row className="justify-content-center">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setregisterEmail(e.target.value)}} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  onChange={(e) => {setregisterPassword(e.target.value)}} />
                        </Form.Group>
                        <Button  onClick={register} variant="primary" type="button">
                            Create user
                        </Button>
                    </Form>
                    </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Signup