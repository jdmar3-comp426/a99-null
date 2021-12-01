import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {Form, Button, Container, Row} from 'react-bootstrap'
import {Navigate } from 'react-router-dom'
import {db, auth} from '../firebase-config'
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'


function Login() {

    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const [currentUser, setcurrentUser] = useState({})

    const user = auth.currentUser;

    onAuthStateChanged(auth, (loggedin) => {
        setcurrentUser(loggedin)
    })

      const login = async () => {
        try{
          // const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          console.log(user)
          // get the user data
          const docRef = doc(db, "users", user.user.uid)
          const docSnap = await getDoc(docRef)
        //   console.log(docSnap)
        //   console.log(docSnap._document.data.value.mapValue.fields.picked.arrayValue.values[0])
        //   console.log(user.user.uid)
    
        } catch (error) {
          console.log(error.message)
        }
      }




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
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setloginEmail(e.target.value)}} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  onChange={(e) => {setloginPassword(e.target.value)}} />
                    </Form.Group>
                    <Button  onClick={login} variant="primary" type="button">
                    Login
                    </Button>
                </Form>
                </Row>
                </Container>
                </div>
            </div>
        )
    }
}

export default Login