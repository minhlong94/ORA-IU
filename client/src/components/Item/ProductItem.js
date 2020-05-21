import React, {useState} from 'react';
import {Card, Button, Form, Col} from "react-bootstrap"
import {CART} from "../../LocalStorageKey";

const ProductItem = ({id, name, price, maxCount, supply_name, class_name}) => {
    const [buyAmount, setBuyAmount] = useState(0);

    const handleIncrement = () => buyAmount === maxCount ? setBuyAmount(0) : setBuyAmount(buyAmount+1);

    const handleDecrement = () => buyAmount === 0 ? setBuyAmount(maxCount) : setBuyAmount(buyAmount - 1);

    const handleAddToCart = event => {
        event.preventDefault();
        let carts = !localStorage.getItem(CART) ? [] : JSON.parse(localStorage.getItem(CART));
        let idx = carts.findIndex(el => el.id === id);
        if (idx !== -1) {
            carts[idx].buyAmount = buyAmount;
        } else {
            carts.push({id, name, supply_name, class_name, price, buyAmount})
        }
        localStorage.setItem(CART, JSON.stringify(carts));
        setBuyAmount(0);
    }


    return (
        <Card style={{ width: '18rem' }} key={id}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <b>Price:</b> {price}
                </Card.Text>
                <Card.Text>
                    <b>Supplied by:</b> {supply_name}
                </Card.Text>
                <Card.Text>
                    <b>Category:</b> {class_name}
                </Card.Text>
                <Form onSubmit={handleAddToCart}>
                    <Form.Row>
                        <Form.Group>
                            <Button variant={"primary"} type={"button"} onClick={handleIncrement}>+</Button>
                        </Form.Group>
                        <Col>
                            <Form.Control type={'text'} placeholder={0} value={buyAmount} disabled/>
                        </Col>
                        <Col>
                            <Button variant={"primary"} type={"button"} onClick={handleDecrement}>-</Button>
                        </Col>
                    </Form.Row>
                    <Button variant="primary" type={"submit"} disabled={buyAmount === 0}>Add to cart</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
