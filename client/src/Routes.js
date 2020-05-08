import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Homepage/Home";
import NotFound from "./components/NotFound 404/NotFound";
import Signup from "./components/Registration/Signup";
import Login from "./components/Login/Login";
import DatatablePage from "./components/ShoppingTable/ShoppingTableSearchBar";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/signup">
                <Signup />
            </Route>

            <Route exact path="/items">
                <DatatablePage />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}