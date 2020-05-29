import React, {useState} from 'react';
import axios from "axios";
import {CLASS} from "../../api_config";
import {Button, Form} from "react-bootstrap";

const initState = {
    id: Date.now(),
    name: ''
}

const CategoryForm = () => {
    const [form, setForm] = useState(initState);

    const handleChange = event => setForm({...form, [event.target.id]: event.target.value});

    const handleSubmit = async event => {
        event.preventDefault();
        await axios.post(CLASS, form);
        alert("Add successful!")
        window.location.reload();
    }

    return (
        <Form className={'worker-form'} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Category (Class) ID
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
                    Category (Class) name
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

export default CategoryForm;
