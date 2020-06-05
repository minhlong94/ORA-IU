import React from 'react';
import {NavDropdown} from "react-bootstrap";

const UpdateNav = () => {
    return (
        <NavDropdown title="Update..." id="collasible-nav-dropdown">
            <NavDropdown.Item href="/update-product">Update product...</NavDropdown.Item>
        </NavDropdown>
    );
};

export default UpdateNav;
