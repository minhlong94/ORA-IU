import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useFormFields} from "../Utils/FormFields";
import bcrypt from 'bcryptjs';

import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';


export default function Signup() {

    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        hashedPassword: ''
    });

    const [newUser, setNewUser] = useState(null);

    const [validated, setValidated] = useState(false);

    const validForm = () => {
        return (
            fields.email.length > 0 &&
            fields.password.length >= 8 &&
            fields.password === fields.confirmPassword

        );
    };

    const HashedPassword = async user => {

        const password = user.password;
        const saltRounds = 10;

        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    };

    const Encryption = async user => {
        fields.hashedPassword = await HashedPassword(user);
    };

    const handleSubmit = async event => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    function renderForm() {
        return (
            <div className='Signup'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <legend>CREATE NEW ACCOUNT</legend>

                    <Form.Group controlId='email'>
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type='email'
                                      placeholder='email@example.com'
                                      value={fields.email}
                                      onChange={handleFieldChange}
                                      required
                                      autoFocus/>
                        <Form.Control.Feedback type='invalid'>
                            Please enter your email.
                        </Form.Control.Feedback>
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password'
                                      placeholder='Password'
                                      value={fields.password}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid password.
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
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            Password does not match.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant='primary' type='submit'
                            validated={validated}
                            block>
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }

    return (
        <div className="Signup">
            {renderForm()}
        </div>
    );
}
