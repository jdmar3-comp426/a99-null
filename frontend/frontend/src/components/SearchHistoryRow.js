import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {ListGroup, Row, Col} from 'react-bootstrap'


function SearchHistoryRow(props) {
    return (
        <div className="search-history-row">
            <Row>
                <Col
                    className="justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{props.date}</div>
                    </div>
                </Col>
                <Col
                    className="justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{props.title}</div>
                    </div>
                </Col>
                <Col
                    className="justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <a className="his-map-link" href={props.map_link}><img src="magnifier.png" width = "20" height = "20"></img></a>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SearchHistoryRow