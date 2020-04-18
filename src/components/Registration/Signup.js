import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Form, Row} from 'react-bootstrap';
import {useFormFields} from "./FormFields";
import bcrypt from 'bcryptjs';

import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';


export default function Signup() {

    const [fields, handleFieldChange] = useFormFields({
        email: '',
        userName: '',
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
            await Encryption(fields);
            alert(fields.hashedPassword);
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        setNewUser("test");
    };

    function renderForm() {
        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <b>PASSWORD HASH: {fields.hashedPassword}</b>

                <Form.Group as={Row} controlId='email'>
                    <Form.Label column sm={1}>Email address:</Form.Label>
                    <Col sm={3}>
                        <Form.Control type='email'
                                      placeholder='Enter your email'
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
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='userName'>
                    <Form.Label column sm={1}>User name:</Form.Label>
                    <Col sm={3}>
                        <Form.Control type='text'
                                      placeholder='User name'
                                      value={fields.userName}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='password'>
                    <Form.Label column sm={1}>Password:</Form.Label>
                    <Col sm={3}>
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
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='confirmPassword'>
                    <Form.Label column sm={1}>Confirm password:</Form.Label>
                    <Col sm={3}>
                        <Form.Control type='password'
                                      placeholder='Confirm your password'
                                      value={fields.confirmPassword}
                                      onChange={handleFieldChange}
                                      required/>
                        <Form.Control.Feedback type='invalid'>
                            Password does not match.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <ButtonGroup>
                    <Button variant='primary' type='submit'
                            validated={validated}>
                        Next
                    </Button>
                    <Button variant='secondary' type='reset'>
                        Reset
                    </Button>
                </ButtonGroup>

                <b>Your password: {fields.password}</b>
            </Form>
        );
    }

    return (
        <div className="Signup">
            {renderForm()}
        </div>
    );
}

