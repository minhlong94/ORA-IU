import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {SUPPLIER} from "../../api_config";

const initState = {
    id: Date.now(),
    name: ''
}

const SupplierForm = () => {
    const [form, setForm] = useState(initState);

    const handleChange = event => setForm({...form, [event.target.id]: event.target.value});

    const handleSubmit = async event => {
        event.preventDefault();
        await axios.post(SUPPLIER, form);
        alert("Add successful!")
        window.location.reload();
    }

    return (
        <Form className={'staff-form'} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Supplier ID
                </Form.Label>
                <Form.Control id={'id'}
                              onChange={handleChange}
                              type={'text'}
                              value={form.id}
                              maxLength={15}
                              disabled
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Supplier name
                </Form.Label>
                <Form.Control id={'name'}
                              onChange={handleChange}
                              type={'text'}
                              value={form.name}
                              maxLength={25}
                              required
                />
            </Form.Group>
            <div className={'submit-button'}>
                <Button type={'submit'}>Add</Button>
            </div>
        </Form>
    );
};

export default SupplierForm;
