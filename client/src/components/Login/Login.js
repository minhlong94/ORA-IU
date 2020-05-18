import React, {useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import axios from "axios";

import {UserContext} from "../../context";
import {CURRENT_USER, IS_LOGGED_IN} from "../../LocalStorageKey";
import {USER} from "../../api_config";

import "./Login.css";

const initial_state = {
    username: '',
    password: '',
    errors: {
        username: 'This field is required',
        password: 'This field is required'
    }
};

export default function Login() {
    const [state, setState] = useState(initial_state);
    const {validated, setValidated, user, setUser} = useContext(UserContext);

    const handleSubmit = async event => {
        event.preventDefault();
        let newState = {...state};
        let newUser = {...user};

        const response = await axios.post(`${USER}/login`, {
            username: state.username,
            password: state.password
        });

        newState.errors = response.data.errors;

        if (!response.data.valid) {
            newState.username = '';
            newState.password = '';
        }
        else {
            newUser.user_id = response.data.user_id;
            newUser.username = response.data.username;
            newUser.first_name = response.data.first_name;
            newUser.last_name = response.data.last_name;
            localStorage.setItem(CURRENT_USER, JSON.stringify(newUser));
            localStorage.setItem(IS_LOGGED_IN, response.data.valid.toString());
            setValidated(response.data.valid);
            setUser(newUser);
        }
        setState(newState);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        })
    };


    if (localStorage.getItem(IS_LOGGED_IN)) {
        return (
            <Redirect to={'/items'}/>
        )
    }


    return (
        <div className='Login'>
            <Form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <Form.Group controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type='text' value={state.username}
                                  onChange={handleChange} required/>
                    <Form.Control.Feedback type={'invalid'}>
                        {state.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' value={state.password} minLength={8}
                                  onChange={handleChange} required/>
                    <Form.Control.Feedback type={'invalid'}>
                        {state.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant={'primary'} type='submit'
                        validated={validated.toString()}
                        block>
                    Login
                </Button>
            </Form>
        </div>
    );
}