import React, {useState} from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import {auth} from '../firebase-config'
import {Navigate } from 'react-router-dom'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'


function PageNavbar() {
    const user = auth.currentUser;
    const [currentUser, setcurrentUser] = useState({})

    const logout = async () => {
        await signOut(auth)
    }

    onAuthStateChanged(auth, (loggedin) => {
        setcurrentUser(loggedin)
    })
    //console.log(user)

    if (user) {
        return (
            <Navbar bg="light" collapseOnSelect expand="lg" >
            <Container>
            <Navbar.Brand href="/find">Find Restaurants</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">About</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link >User logged in: {currentUser?.email}</Nav.Link>
                <Nav.Link onClick={logout}>Log out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar> 
        )
    } else {
        return (
            <Navbar bg="light" collapseOnSelect expand="lg" >
            <Container>
            <Navbar.Brand href="/find">Find Restaurants</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">About</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Log in</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
}

export default PageNavbar
