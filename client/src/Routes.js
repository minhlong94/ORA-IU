import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import {IS_LOGGED_IN} from "./LocalStorageKey";

import Signup from "./components/Registration/Signup";
import Login from "./components/Login/Login";
import Items from "./components/Item/Items";
import Cart from "./components/Cart/Cart";
import Account from "./components/Account/Account";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}>
                    {localStorage.getItem(IS_LOGGED_IN) === "true" ? <Redirect to={"/items"}/>: <Redirect to={"/login"}/>}
                </Route>

                <Route exact path="/items">
                    <Items/>
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/signup">
                    <Signup />
                </Route>

                <Route exact path={"/cart"}>
                    <Cart/>
                </Route>

                <Route exact path={"/account"}>
                    <Account/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}