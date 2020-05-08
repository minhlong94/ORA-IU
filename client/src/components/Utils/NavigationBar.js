import {Button, Form, Nav, Navbar} from "react-bootstrap";
import React from "react";

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img src="https://react-bootstrap.github.io/logo.svg"
                     width="30"
                     height="30"
                     className="d-inline-block align-top"
                     alt="React Bootstrap logo"/>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/items">Items</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
        </Navbar>
    )
}