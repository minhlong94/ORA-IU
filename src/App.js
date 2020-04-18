import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Nav, Navbar, NavItem } from "react-bootstrap";
import Signup from "./containers/Registration/Signup";
import Routes from "./Routes";

import "./App.css";

function App() {
    return (
        <div className="App container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
                <Form inline>
                    <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="info">Search</Button>
                </Form>
            </Navbar>
            <Routes />
        </div>
    );
}

export default App;