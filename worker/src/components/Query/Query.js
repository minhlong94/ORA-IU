import React, {useState} from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";

import {QUERY} from "../../api_config";
import "./Query.css";
import {MDBDataTable} from "mdbreact";

const initial_state = {
    statement: '',
    result: ''
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

    const iterateKeys = (data) => {
        if (!Array.isArray(data) || !data.length) return;
        let key = Object.keys(data[0]); // get keys of the json file
        let items = [];
        for (let i = 0; i < key.length; ++i) {
            items.push({
                label: key[i],
                field: key[i],
                sort: 'asc'
            });
        }
        return items;
    };

    const getData = () => {
        let columnValue = iterateKeys(data);
        return {
            columns: columnValue,
            rows: data
        };
    };


    const renderTable = () => {
        let dataTable = getData();
        // https://mdbootstrap.com/docs/react/tables/datatables/#docsTabsAPI
        return (
            <MDBDataTable
                striped bordered hover small btn
                noBottomColumns
                data={dataTable}
                className={'blueTable'}
            />
        );
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

    function renderForm() {
        return (
            <div className='Query'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='statement'>
                        <Form.Label>Query:</Form.Label>
                        <Form.Control as="textarea" rows='5' type='text'
                                      value={state.statement}
                                      placeholder={'SELECT...\nFROM...\nWHERE...'}
                                      onChange={handleChange} required/>
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

                    <br/>

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
                </Form>
            </div>
        )
    }

    return (
        <React.Fragment>
            {renderForm()}
            <div align={'center'}>
                {showTable ? <div className={'Table'}>
                    {renderTable()}
                </div> : <div className={'Textbox'}>
                    {renderTextbox()}
                </div>}
            </div>
        </React.Fragment>
    );
}