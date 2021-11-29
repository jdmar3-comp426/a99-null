import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {Form, Button, Container, Row} from 'react-bootstrap'
import {Navigate } from 'react-router-dom'
import {db, auth} from '../firebase-config'
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'
import {onAuthStateChanged, updatePassword} from 'firebase/auth'


function UpdateAccount() {

    const [password, setpassword] = useState("")
    const [repeartedPassword, setrepeartedPassword] = useState("")
    const [currentUser, setcurrentUser] = useState({})
    const [prompt, setprompt] = useState("")

    onAuthStateChanged(auth, (loggedin) => {
        setcurrentUser(loggedin)
    })

      const update = async () => {
          if (password != repeartedPassword) {
            setprompt("Not match, try again.")
          } else if (password.length < 6){
            setprompt("Invalid, at least 6 characters.")
          } else {
            setprompt("")
            const curUser = auth.currentUser;
            updatePassword(curUser, password).then(() => {
                setprompt("Update successful.")
              }).catch((error) => {
                console.log(error.message)
              });
          }
          
      }




    return (
            <div>
                <PageNavbar />
                <div class=".mt-n1">
                <Container >
                <Row className="justify-content-center">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" onChange={(e) => {setpassword(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Repeat New Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat new password"  onChange={(e) => {setrepeartedPassword(e.target.value)}} />
                    </Form.Group>
                    <Button  onClick={update} variant="primary" type="button">
                    Update password
                    </Button>
                    {prompt}
                </Form>
                </Row>
                </Container>
                </div>
            </div>
        )

}

export default UpdateAccount