import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Query from "./components/Query/Query";
import AddProductForm from "./components/add_product/addProduct";
import SupplierForm from "./components/add_supplier/SupplierForm";
import CategoryForm from "./components/add_category/CategoryForm";
import UpdateProductForm from "./components/update_product/UpdateProductForm";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/query'}>
                    <Query/>
                </Route>

                <Route exact path={'/add-product'}>
                    <AddProductForm/>
                </Route>

                <Route exact path={'/add-supplier'}>
                    <SupplierForm/>
                </Route>

                <Route exact path={'/add-class'}>
                    <CategoryForm/>
                </Route>

                <Route exact path={'/update-product'}>
                    <UpdateProductForm/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
