import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';
import {Link, Redirect} from "react-router-dom";

const axios = require('axios');


export default function Signup() {

    let [fields, setFields] = useState({
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
    });

    let [validated, setValidated] = useState(false);

    const handleFieldChange = event => setFields({...fields, [event.target.id]: event.target.value});

    const handleSubmit = async event => {
        event.preventDefault();
        const res = await axios.get(`http://localhost:5000/users?username=${fields.username}`);
        validated = true;
        if (res.data.length > 0) {
            fields.username = '';
            fields.password = '';
            fields.confirmPassword = '';
            fields.errors.username = 'User has already been taken';

            validated = false;
        }
        if (fields.password.length < 8) {
            fields.password = '';
            fields.confirmPassword = '';
            fields.errors.password = 'Password must be at least 8 characters.'
            validated = false;
        } else if (fields.confirmPassword !== fields.password) {
            fields.password = '';
            fields.confirmPassword = '';
            fields.errors.confirmPassword = 'Password does not match!';
            validated = false;
        }

        setValidated(validated);
        setFields(fields);

        if (validated) {
            await axios.post("http://localhost:5000/users", {
                username: fields.username,
                password: fields.password,
                first_name: fields.first_name,
                last_name: fields.last_name
            })
        }
    };

    function renderForm() {
        if (validated){
            return (
                <Redirect to={'/login'}/>
            )
        }
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
