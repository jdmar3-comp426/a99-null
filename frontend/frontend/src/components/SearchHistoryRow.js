import React, {useState} from 'react'
import PageNavbar from './Navbar.js'
import {ListGroup} from 'react-bootstrap'


function SearchHistoryRow(props) {
    return (
        <div className="search-history-row">
            <ListGroup as="ol" numbered>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{props.title}</div>
                    {props.info}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default SearchHistoryRow