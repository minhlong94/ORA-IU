import React, {useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";

import "./Login.css";
import {UserContext} from "../../context";

const axios = require('axios');

let initial_state = {
    username: '',
    password: '',
    errors: {
        username: 'This field is required',
        password: 'This field is required'
    }
}

export default function Login() {
    const [state, setState] = useState(initial_state);
    const {validated, setValidated, user, setUser} = useContext(UserContext);

    const handleSubmit = async event => {
        event.preventDefault();
        let newState = {...state};
        let newUser = {...user};

        const response = await axios.post("http://localhost:5000/users/login", {
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
        }
        setState(newState);
        localStorage.setItem("valid", response.data.valid.toString());
        localStorage.setItem("user", JSON.stringify(newUser))
        setValidated(response.data.valid);
        setUser(newUser);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        })
    }


    if (validated) {
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