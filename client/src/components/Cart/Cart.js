//TODO: Implement bill-generation

import React, {useEffect, useState} from 'react';
import {Button, CardColumns, Col, Form} from "react-bootstrap";
import {CART, CURRENT_USER} from "../../LocalStorageKey";
import axios from "axios";

import CartItem from "./CartItem";
import BillItem from "./BillItem";
import {CartContext} from "../../context";
import {BANK, BILL} from "../../api_config";

import "./Cart.css"

const initialField = {
    bank_name: '',
    bank_number: '',
    address: '',
    account_options: []
}

const Cart = () => {
    const [carts, setCarts] = useState(!JSON.parse(localStorage.getItem(CART))
        ? [] : JSON.parse(localStorage.getItem(CART)));

    const [available, setAvailable] = useState([]);

    const [bills, setBills] = useState([]);

    const [field, setField] = useState(initialField);

    useEffect(() => {
        const loadData = async () => {
            const user = JSON.parse(localStorage.getItem(CURRENT_USER));
            const response = await axios.get(`${BANK}?user_id=${user.user_id}`);
            let newAvailable = response.data;
            setAvailable(newAvailable);
        }
        loadData();
    }, []);
    useEffect(() => {
        let newField = {...field};
        newField.account_options = available.filter(val => val.name === field.bank_name)
        setField(newField)
    }, [field.bank_name])

    useEffect(() => {
        const loadData = async () => {
            let user = JSON.parse(localStorage.getItem(CURRENT_USER));
            const response = await axios.get(`${BILL}?user_id=${user.user_id}`);
            let newBill = response.data;
            for (let i=0; i<newBill.length; ++i) {
                newBill[i].items = (await axios.get(`${BILL}/${newBill[i].bill_id}`)).data;
            }
            setBills(newBill);
        }
        loadData();
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem(CURRENT_USER));
        const chosenAccount = field.account_options.find(value => value.bank_number === field.bank_number);
        const submitData = {
            customer_id: chosenAccount.customer_id,
            discount: null,
            address: field.address,
            user_id: user.user_id,
            items: carts.map(val => {
                let returnObj = {};
                returnObj.id = val.id;
                returnObj.buyAmount = val.buyAmount;
                return returnObj;
            })
        }
        await axios.post(`${BILL}`,submitData);
        console.log(submitData);
        setCarts([]);
        localStorage.setItem(CART, JSON.stringify([]));
    }

    const handleChange = event => setField({...field, [event.target.id]: event.target.value});


    return (
        <div className={"buy"}>
            {carts.length === 0
                ? <h1>You haven't bought any thing</h1>
                : <Form onSubmit={handleSubmit}>
                    <Form.Label>
                        <h1>Cart</h1>
                    </Form.Label>
                    <CartContext.Provider value={{carts, setCarts}}>
                        {carts.map(cart => (
                            <CartItem key={cart.id} id={cart.id} name={cart.name} buyAmount={cart.buyAmount}
                                      price={cart.price}/>
                        ))}
                    </CartContext.Provider>
                    <Form.Row>
                        <Col>
                            <Form.Label>Paying account</Form.Label>
                        </Col>
                        <Col>
                            <Form.Group controlId={'bank_name'}>
                                <Form.Control as={'select'} onChange={handleChange}>
                                    <option>Choose...</option>
                                    {available.map(val => (
                                        <option>{val.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={'bank_number'}>
                                <Form.Control as={'select'} onChange={handleChange}>
                                    <option>Choose...</option>
                                    {field.account_options.map(val =>
                                        <option>{val.bank_number}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId={'address'}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type={'text'} onChange={handleChange}/>
                    </Form.Group>
                    <Button type={'submit'}>Buy</Button>
                </Form>
            }
            <div className={'buy'}>
                <h1>Bills</h1>
                <CardColumns>
                    {bills.map(bill => (
                        <BillItem id={bill.bill_id} bank_account={bill.bank_number} items={bill.items}
                                  timestamp={bill.timestamp} bank_name={bill.name} address={bill.address}/>
                    ))}
                </CardColumns>
            </div>
        </div>
    );
};

export default Cart;
