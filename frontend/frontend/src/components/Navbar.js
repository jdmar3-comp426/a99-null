import React, {useState} from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
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
        const dropdownTitle = "User logged in: " + currentUser?.email;
        return (
            <Navbar bg="light" collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand href="/find">Find Restaurants</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">About</Nav.Link>
                </Nav>
                <Nav>
                <NavDropdown title={dropdownTitle} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/history">Search History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/updateaccount">
                    Account Setting
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    } else {
        return (
            <Navbar bg="light" collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand href="/find">Find Restaurants</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
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
