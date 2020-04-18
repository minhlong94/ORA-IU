import React from "react";
import {Button, Form} from "react-bootstrap";

import "./Login.css";
import {useFormFields} from "../Utils/FormFields";

export default function Login() {
    const [user, setUser] = useFormFields({
        email: '',
        password: ''
    });

    const validate = () => {
        return user.email.length > 0 && user.password.length > 0;
    };

    const handleSubmit = event => {
        event.preventDefault();

    };

    return (
        <div className='Login'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email'
                                  placeholder='Your email'
                                  value={user.email}
                                  onChange={setUser}
                                  autoFocus/>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password'
                                  placeholder='Your password'
                                  value={user.password}
                                  onChange={setUser}/>
                </Form.Group>

                <Button type='submit'
                        disabled={!validate()}
                        block>
                    Login
                </Button>
            </Form>
        </div>
    );
}