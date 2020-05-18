// TODO: Generate a list of cards of item
import React, {useEffect, useState} from 'react';
import {CardColumns} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import axios from "axios";

import ProductItem from "./ProductItem";
import {IS_LOGGED_IN} from "../../LocalStorageKey";
import {ITEM} from "../../api_config";

const Items = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(ITEM);
            setItems(response.data)
        }
        loadData();
    }, [])
    if (!localStorage.getItem(IS_LOGGED_IN))
        return <Redirect to={"/login"}/>
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
