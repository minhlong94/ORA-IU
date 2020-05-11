import React, {useContext} from "react";
import { BrowserRouter ,Route, Switch, Redirect } from "react-router-dom";

import Signup from "./components/Registration/Signup";
import Login from "./components/Login/Login";
import DatatablePage from "./components/ShoppingTable/ShoppingTableSearchBar";
import {UserContext} from "./context";

export default function Routes() {
    const {validated} = useContext(UserContext);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/items">
                    <DatatablePage />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/signup">
                    <Signup />
                </Route>

                <Route exact path={"/"}>
                    {validated || localStorage.getItem("valid") ? <Redirect to={"/items"}/>: <Redirect to={"/login"}/>}
                </Route>
            </Switch>
        </BrowserRouter>

    );
}