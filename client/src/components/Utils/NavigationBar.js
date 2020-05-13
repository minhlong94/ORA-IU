import {Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {UserContext} from "../../context";
import {CURRENT_USER} from "../../LocalStorageKey";

export default function NavigationBar() {
    const {validated} = useContext(UserContext);
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

    const renderAuthenticated = () => {
        const user = JSON.parse(localStorage.getItem(CURRENT_USER));
        const username = user.username;
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    <Nav.Link eventKey={"disabled"} disabled>Hello {username}</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                    <Nav.Link href="/items">Items</Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Nav.Link href={"/login"} onSelect={(selectedKey) => {
                        localStorage.clear()
                    }}>Log Out</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    return (
        <Navbar bg="dark" variant="dark">
            {renderImage()}
            {validated || localStorage.getItem("valid") ? renderAuthenticated() : renderNotAutheticated()}
        </Navbar>
    )
}