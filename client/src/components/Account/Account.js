import React, {useEffect, useState} from 'react';
import {Button, CardColumns, Col, Form} from "react-bootstrap";
import axios from "axios";
import "./Account.css";
import AccountItem from "./AccountItem";
import {BANK} from "../../api_config";
import {CURRENT_USER} from "../../LocalStorageKey";

const initialState = {
    options: [],
    registered_bank_account: [],
    bank_name: '',
    first_component: '',
    second_component: '',
    third_component: '',
    forth_component: ''
}

const Account = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const loadData = async () => {
            const optionResponse = await axios.get(`${BANK}/bank_name`);
            const user = JSON.parse(localStorage.getItem(CURRENT_USER));
            const registeredBankAccount = await axios.get(`${BANK}?user_id=${user.user_id}`);
            console.log(registeredBankAccount.data);
            setState({...state, options: optionResponse.data, registered_bank_account: registeredBankAccount.data});
        }
        loadData();
    }, []);

    const handleChange = event => setState({...state, [event.target.id]: event.target.value});

    const handleSubmit = async event => {
        event.preventDefault();
        let newState = {...state};

        const {first_component, second_component, third_component, forth_component} = state;
        const bank_number = `${first_component}-${second_component}-${third_component}-${forth_component}`;
        const chosen_bank = state.options.find(val => val.name === state.bank_name);
        const bank_id = chosen_bank.bank_id;
        const user = JSON.parse(localStorage.getItem(CURRENT_USER));
        const user_id = user.user_id;

        const response = await axios.post(BANK, {bank_number, bank_id, user_id});
        newState.first_component = '';
        newState.second_component = '';
        newState.third_component = '';
        newState.forth_component = '';

        newState.registered_bank_account.push(response.data);

        setState(newState);
    }

    return (
        <div className={'bank-account'}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="bank_name">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control as="select" onChange={handleChange}>
                        <option>Choose...</option>
                        {state.options.map(el => (
                            <option key={el.id}>{el.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Label>Bank Number</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId={"first_component"}>
                            <Form.Control onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"second_component"}>
                            <Form.Control onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"third_component"}>
                            <Form.Control onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"forth_component"}>
                            <Form.Control onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Form.Row>


                <Button type={'submit'}>Add</Button>
            </Form>
            <div className={'registered-account'}>
                <h1>Registered Account</h1>
                <CardColumns>
                    {state.registered_bank_account.map(el =>
                        <AccountItem key={el.customer_id}
                                     id={el.customer_id}
                                     bank_name={el.name}
                                     bank_number={el.bank_number}/>)}
                </CardColumns>
            </div>
        </div>
    );
};

export default Account;
