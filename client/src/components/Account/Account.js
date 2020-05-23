import React, {useEffect, useState} from 'react';
import {Button, Card, CardColumns, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import "./Account.css";
import {BANK} from "../../api_config";
import {CURRENT_USER, IS_REGISTERED} from "../../LocalStorageKey";

const AccountItem = ({id, bank_name, bank_number}) => {
    return (
        <Card style={{ width: '21rem' }} key={id}>
            <Card.Body>
                <Card.Text>
                    <b>Bank Name:</b> {bank_name}
                </Card.Text>
                <Card.Text>
                    <b>Bank Number:</b> {bank_number}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

const initialState = {
    options: [],
    registered_bank_account: [],
    bank_name: '',
    first_component: '',
    second_component: '',
    third_component: '',
    forth_component: '',
    errors: {
        bank_number: '',
        bank_name: ''
    }
}

const Account = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const loadData = async () => {
            const optionResponse = await axios.get(`${BANK}/bank_name`);
            const user = JSON.parse(localStorage.getItem(CURRENT_USER));
            const registeredBankAccount = await axios.get(`${BANK}?user_id=${user.user_id}`);
            if (registeredBankAccount.data.length === 0) {
                localStorage.setItem(IS_REGISTERED, false.toString());
            }
            else{
                localStorage.setItem(IS_REGISTERED, true.toString());
            }
            setState({...state, options: optionResponse.data, registered_bank_account: registeredBankAccount.data});
        }
        loadData();
    }, []);

    const handleChange = event => {

        setState({...state,
            errors: {
                bank_number: '',
                bank_name: ''
            },
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let newState = {...state};

        const {first_component, second_component, third_component, forth_component} = state;


        if (state.bank_name === '' || state.bank_name === 'Choose...'){
            newState.errors.bank_name = 'This field is required';
        }

        else if (first_component === '' || second_component === '' || third_component === '' || forth_component === ''){
            newState.errors.bank_number = 'This field is required';
        }

        else {
            const bank_number = `${first_component}-${second_component}-${third_component}-${forth_component}`;
            const chosen_bank = state.options.find(val => val.name === state.bank_name);
            const bank_id = chosen_bank.bank_id;
            const user = JSON.parse(localStorage.getItem(CURRENT_USER));
            const user_id = user.user_id;

            await axios.post(BANK, {bank_number, bank_id, user_id});

            localStorage.setItem(IS_REGISTERED, true.toString());
            window.location.reload();
        }
        newState.first_component = '';
        newState.second_component = '';
        newState.third_component = '';
        newState.forth_component = '';
        newState.bank_name = 'Choose...';
        setState(newState);
    }

    return (
        <div className={'bank-account'}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="bank_name">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control as="select" onChange={handleChange} value={state.bank_name}>
                        <option>Choose...</option>
                        {state.options.map(el => (
                            <option key={el.id}>{el.name}</option>
                        ))}
                    </Form.Control>
                    <div style={{color:"red"}}>
                        {state.errors.bank_name}
                    </div>
                </Form.Group>
                <Form.Label>Bank Number</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId={"first_component"}>
                            <Form.Control onChange={handleChange} value={state.first_component} type={'text'}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"second_component"}>
                            <Form.Control onChange={handleChange} value={state.second_component}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"third_component"}>
                            <Form.Control onChange={handleChange} value={state.third_component}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"forth_component"}>
                            <Form.Control onChange={handleChange} value={state.forth_component}/>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <div style={{color:"red"}}>
                    {state.errors.bank_number}
                </div>
                <Button type={'submit'}>Add</Button>
            </Form>
            <div className={'registered-account'}>
                <h1>Registered Account</h1>
                {state.registered_bank_account.length === 0
                    ? <h2>You haven't provided any account. Please provide at least one to purchase</h2>
                    : <CardColumns>
                        {state.registered_bank_account.map(el =>
                            <AccountItem key={el.customer_id}
                                         id={el.customer_id}
                                         bank_name={el.name}
                                         bank_number={el.bank_number}/>)}
                    </CardColumns>}

            </div>
        </div>
    );
};

export default Account;
