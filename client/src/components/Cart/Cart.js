import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {CART} from "../../LocalStorageKey";
import CartItem from "./CartItem";
import "./Cart.css"
import {CartContext} from "../../context";

const Cart = () => {
    const [carts, setCarts] = useState(!JSON.parse(localStorage.getItem(CART)) ? []: JSON.parse(localStorage.getItem(CART)));
    if (carts.length === 0)
        return <h1>You haven't bought any thing</h1>

    return (
        <div className={"buy"}>
            <Form>
                <Form.Label>
                    <h1>Cart</h1>
                </Form.Label>
                <CartContext.Provider value={{carts, setCarts}}>
                    {carts.map(cart => (
                        <CartItem key={cart.id} id={cart.id} name={cart.name} buyAmount={cart.buyAmount} price={cart.price}/>
                    ))}
                </CartContext.Provider>
                <Button>Buy</Button>
            </Form>
        </div>
    );
};

export default Cart;
