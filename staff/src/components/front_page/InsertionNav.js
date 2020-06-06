import React from 'react';
import {NavDropdown} from "react-bootstrap";

const InsertionNav = () => {
    return (
        <NavDropdown title="Insertion..." id="collasible-nav-dropdown">
            <NavDropdown.Item href="/add-product">Add new product...</NavDropdown.Item>
            <NavDropdown.Item href="/add-supplier">Add Supplier...</NavDropdown.Item>
            <NavDropdown.Item href="/add-class">Add Categories...</NavDropdown.Item>
        </NavDropdown>
    );
};

export default InsertionNav;
