import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Nav, Navbar, NavItem } from "react-bootstrap";
import Signup from "./components/Registration/Signup";
import Routes from "./Routes";

import "./App.css";
import NavigationBar from "./components/Utils/NavigationBar";

function App() {
    return (
        <div className="App container">
            <NavigationBar/>
            <Routes />
        </div>
    );
}

export default App;