import React, {useContext} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {CART} from "../../LocalStorageKey";
import {CartContext} from "../../context";

const CartItem = ({id, name, buyAmount, price}) => {
    const {setCarts} = useContext(CartContext);
    const handleRemove = () => {
        let carts = !localStorage.getItem(CART) ? [] : JSON.parse(localStorage.getItem(CART));
        let filterCarts = carts.filter(value => value.id !== id);
        localStorage.setItem(CART, JSON.stringify(filterCarts));
        setCarts(filterCarts);
    };
    return (
        <Row>
            <Col>
                <Form.Control plaintext readOnly defaultValue={name}/>
            </Col>
            <Col>
                <Form.Control plaintext readOnly defaultValue={buyAmount}/>
            </Col>
            <Col>
                <Form.Control plaintext readOnly defaultValue={price}/>
            </Col>
            <Button type={'button'} onClick={handleRemove}>Remove</Button>
        </Row>
    );
};

export default CartItem;
