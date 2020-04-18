import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Homepage/Home";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Registration/Signup";
import Login from "./containers/Login/Login";

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

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}