import React from 'react';
import {Card} from "react-bootstrap";

const BillItem = ({id, bank_account, items, timestamp, bank_name, address}) => {
    let totalPrice = 0;
    for (let i=0; i<items.length; ++i) {
        totalPrice += items[i].price * items[i].amount;
    }
    return (
        <Card style={{ width: '21rem' }} key={id}>
            <Card.Body>
                <Card.Title>
                    <b>Bill ID:</b> {id}
                </Card.Title>
                <Card.Text>
                    <b>Bank Name: </b> {bank_name}
                </Card.Text>
                <Card.Text>
                    <b>Bank Account:</b> {bank_account}
                </Card.Text>
                <Card.Text>
                    <b>Items:</b>
                    {items.map(val => <p>{val.item_name} {val.amount} {val.price}</p>)}
                </Card.Text>
                <Card.Text>
                    <b>Total price: </b> {totalPrice}
                </Card.Text>
                <Card.Text>
                    <b>Time: </b> {new Date(parseInt(timestamp)).toDateString()}
                </Card.Text>
                <Card.Text>
                    <b>Delivered to: </b> {address}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default BillItem;
