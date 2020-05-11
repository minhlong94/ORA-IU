import {Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {UserContext} from "../../context";

export default function NavigationBar() {
    const {validated, user} = useContext(UserContext);
    let username = '';
    if (user.username !== '') {
        username = user.username;
    }
    const renderImage = () => (
        <Navbar.Brand href="/">
            <img src="https://react-bootstrap.github.io/logo.svg"
                 width="30"
                 height="30"
                 className="d-inline-block align-top"
                 alt="React Bootstrap logo"/>
        </Navbar.Brand>
    )

    const renderNotAutheticated = () => (
        <React.Fragment>
            <Nav className="mr-auto">
                <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
        </React.Fragment>
    )

    const renderAuthenticated = () => (
        <React.Fragment>
            <Nav className="mr-auto">
                <Nav.Link eventKey={"disabled"} disabled>Hello {username}
                </Nav.Link>
                <Nav.Link href="/items">Items</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href={"/login"} onSelect={(selectedKey) => {
                    localStorage.removeItem("valid");
                    localStorage.removeItem("user");
                }}>Log Out</Nav.Link>
            </Nav>
        </React.Fragment>
    )
    return (
        <Navbar bg="dark" variant="dark">
            {renderImage()}
            {validated || localStorage.getItem("valid") ? renderAuthenticated() : renderNotAutheticated()}
        </Navbar>
    )
}