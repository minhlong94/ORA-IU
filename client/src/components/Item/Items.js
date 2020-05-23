import React, {useEffect, useState} from 'react';
import {CardColumns} from 'react-bootstrap';
import ProductItem from "./ProductItem";
import {IS_LOGGED_IN, IS_REGISTERED} from "../../LocalStorageKey";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {ITEM} from "../../api_config";

const Items = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(ITEM);
            setItems(response.data);
        }
        loadData();
    }, [])
    if (!localStorage.getItem(IS_LOGGED_IN))
        return <Redirect to={"/login"}/>
    if (!localStorage.getItem(IS_REGISTERED) || localStorage.getItem(IS_REGISTERED) === "false")
        return <Redirect to={"/account"}/>
    return (
        <CardColumns>
            {items.map(item => <ProductItem key={item.item_id}
                                            id={item.item_id}
                                            name={item.item_name}
                                            price={item.price}
                                            supply_name={item.supplier_name}
                                            class_name={item.class_name}
                                            maxCount={item.amount}/>)}
        </CardColumns>
    );
};

export default Items;
