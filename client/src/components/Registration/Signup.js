import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';
import {Link, Redirect} from "react-router-dom";
import {IS_LOGGED_IN} from "../../LocalStorageKey";

import axios from "axios";
import {USER} from "../../api_config";

const initial_state = {
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    username: '',
    errors: {
        password: 'This field is required.',
        confirmPassword: 'This field is required.',
        username: 'This field is required.'
    }
}

export default function Signup() {

    const [fields, setFields] = useState(initial_state);

    const [validated, setValidated] = useState(false);

    const handleFieldChange = event => setFields({...fields, [event.target.id]: event.target.value});

    const handleSubmit = async event => {
        event.preventDefault();
        const res = await axios.get(`${USER}?username=${fields.username}`);

        let newField = {...fields};
        let newValidated = true;

        if (res.data.length > 0) {
            newField.username = '';
            newField.password = '';
            newField.confirmPassword = '';
            newField.errors.username = 'User has already been taken';

            newValidated = false;
        }
        if (fields.password.length < 8) {
            newField.password = '';
            newField.confirmPassword = '';
            newField.errors.password = 'Password must be at least 8 characters.'
            newValidated = false;
        } else if (fields.confirmPassword !== fields.password) {
            newField.password = '';
            newField.confirmPassword = '';
            newField.errors.confirmPassword = 'Password does not match!';
            newValidated = false;
        }

        setValidated(newValidated);
        setFields(newField);

        if (newValidated) {
            await axios.post(USER, {
                username: fields.username,
                password: fields.password,
                first_name: fields.first_name,
                last_name: fields.last_name
            });
        }
    };

    function renderForm() {
        if (validated){
            return (
                <Redirect to={'/login'}/>
            )
        }

        if (localStorage.getItem(IS_LOGGED_IN))
            return <Redirect to={'/items'}/>
        return (
            <div className='Signup'>
                <Form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                    <legend>CREATE NEW ACCOUNT</legend>

                    <Form.Group controlId={'first_name'}>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type={'text'}
                                      placeholder={'Your First Name'}
                                      value={fields.first_name}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type={'invalid'}>
                            This field is required.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId={'last_name'}>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type={'text'}
                                      placeholder={'Your Last Name'}
                                      value={fields.last_name}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type={'invalid'}>
                            This field is required.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId={'username'}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type={'text'}
                                      placeholder={'Your Username'}
                                      value={fields.username}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type={'invalid'}>
                            {fields.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password'
                                      placeholder='Password'
                                      value={fields.password}
                                      minLength={8}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            {fields.errors.password}
                        </Form.Control.Feedback>
                        <Form.Text className='text-muted'>
                            Password must be at least 8 characters.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control type='password'
                                      placeholder='Confirm your password'
                                      value={fields.confirmPassword}
                                      minLength={8}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            {fields.errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant='primary' type='submit'
                            validated={validated.toString()}
                            block>
                        Sign Up
                    </Button>
                </Form>
                <div className={'login-redirect'}>
                    Already have an account? <Link to={'/login'}>Login</Link>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {renderForm()}
        </React.Fragment>
    );
}
