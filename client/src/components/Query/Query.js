import React, {useState} from "react";
import {Button, Col, Form, Table} from "react-bootstrap";
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
    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(true);

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
        setData(response.data);
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

    const changeDisplay = () => {
        setShowTable(!showTable);
    };

    function renderTextbox() {
        return (
            <Form.Group controlId='result'>
                <Form.Control as='textarea' rows='15'
                              value={state.result}
                              placeholder='No results'
                              readOnly/>
            </Form.Group>
        )
    }

    function renderTable() {
        if (!Array.isArray(data) || !data.length) {
            return (
                <Table striped bordered hover>
                    <thead align={'center'}>
                    <tr>
                        <th>NO DATA</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td align={'center'}>NO DATA</td>
                    </tr>
                    </tbody>
                </Table>
            )
        }

        return (
            <Table striped bordered hover>
                <thead align={'center'}>
                <tr>
                    {Object.entries(data[0]).map(element => {
                        return (
                            <th>
                                {element[0]}
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {data.map((item, key) => {
                    return (
                        <tr key={key}>
                            {Object.entries(item).map(element => {
                                return (
                                    <td>
                                        {element[1]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        )
    }

    function renderForm() {
        return (
            <div className='Query'>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId='statement'>
                        <Form.Label>Query:</Form.Label>
                        <Form.Control as="textarea" rows='5' type='text'
                                      value={state.statement}
                                      placeholder={'SELECT...\nFROM...\nWHERE...'}
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

                    <br/><br/>

                    <Form.Row>
                        <Col>
                            <Form.Label>Result:</Form.Label>
                        </Col>
                        <Col align={'right'}>
                            <Button variant={'outline-info'} onClick={changeDisplay}>
                                {!showTable ? <text>Display Table</text> : <text>Display Textbox</text>}
                            </Button>
                        </Col>
                    </Form.Row>

                    {showTable ? renderTable() : renderTextbox()}
                </Form>
            </div>
        )
    }

    return (
        <React.Fragment>
            {renderForm()}
        </React.Fragment>
    );
}