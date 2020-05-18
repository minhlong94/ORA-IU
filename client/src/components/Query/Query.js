import React, {useState} from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";

import {QUERY} from "../../api_config";
import "./Query.css";

const initial_state = {
    statement: '',
    result: '',
    errors: {
        statement: 'Please input a query statement!'
    }
};

export default function Query() {
    const [state, setState] = useState(initial_state);

    const handleSubmit = async event => {
        event.preventDefault();
        let newState = {...state};
        setState({
            ...state,
            result: ''
        });

        const response = await axios.post(QUERY, {
            statement: state.statement
        });
        newState.result = JSON.stringify(response.data, undefined, 4);

        setTimeout(() => {
            setState(newState);
        }, 300);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        })
    };

    const reset = () => {
        setState(initial_state);
    };

    return (
        <div className='Query'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='statement'>
                    <Form.Label>Query:</Form.Label>
                    <Form.Control type='text' value={state.statement}
                                  placeholder={'SELECT...'}
                                  onChange={handleChange} required/>
                    <Form.Control.Feedback type={'invalid'}>
                        {state.errors.statement}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Button variant={'secondary'} onClick={reset} block>
                            Reset
                        </Button>
                    </Col>
                    <Col>
                        <Button variant={'primary'} type='submit' block>
                            Execute
                        </Button>
                    </Col>
                </Form.Row>

                <Form.Group controlId='result'>
                    <Form.Label>Result:</Form.Label>
                    <Form.Control as="textarea" rows={'20'} value={state.result} readOnly/>
                </Form.Group>
            </Form>
        </div>
    );
}