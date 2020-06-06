import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import InsertionNav from "./InsertionNav";
import UpdateNav from "./UpdateNav";

const FrontPage = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Staff</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <InsertionNav/>
                    <UpdateNav/>
                    <Nav.Link href="/query">Custom Query...</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default FrontPage;
