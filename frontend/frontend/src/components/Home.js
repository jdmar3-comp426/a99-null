import React, {useState} from 'react'
import PageNavbar from './Navbar.js'


function Home() {
    return (
        <div className="home">
            <PageNavbar />
            <div className="home-content">
                <h1>Random restaurant finder</h1>
                <br />
                <h2>Hello! Signup or login first.</h2>
            </div>
        </div>
    )
}

export default Home