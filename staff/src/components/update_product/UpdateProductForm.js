import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {CLASS, ITEM, SUPPLIER} from "../../api_config";

const initForm = {
    id: 'Choose...',
    name: '',
    price: '',
    amount: '',
    supplier_name: 'Choose...',
    class_name: 'Choose...'
}

const UpdateProductForm = () => {
    const [form, setForm] = useState(initForm);

    const [supplier_options, setSupplierOptions] = useState([]);

    const [class_options, setClassOptions] = useState([]);

    const [item_options, setItemOptions] = useState([]);

    const [errors, setErrors] = useState({
        id: '',
        class_name: '',
        supplier_name: ''
    })

    useEffect(() => {
        const getSupplierData = async () => {
            const response = await axios.get(SUPPLIER);
            setSupplierOptions(response.data);
        }
        getSupplierData();
    }, []);

    useEffect(() => {
        const getClassData = async () => {
            const response = await axios.get(CLASS);
            setClassOptions(response.data);
        }
        getClassData();
    },[]);

    useEffect(() => {
        const getItemData = async () => {
            const response = await axios.get(ITEM);
            setItemOptions(response.data);
        }
        getItemData();
    },[]);

    useEffect(() => {
        if (form.id !== 'Choose...'){
            const chosenItem = item_options.find(item => item.item_id === form.id);
            setForm({
                ...form,
                name: chosenItem.item_name,
                price: chosenItem.price,
                amount: chosenItem.amount,
                supplier_name: chosenItem.supplier_name,
                class_name: chosenItem.class_name
            })
        }
        else {
            setForm(initForm);
        }
    }, [form.id])

    const handleChange = event => {
        setErrors({id: '', class_name: '', supplier_name: ''});
        setForm({...form, [event.target.id]: event.target.value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let newError = {...errors}
        if (form.class_name === "Choose...")
            newError.class_name = "This field is required"
        if (form.supplier_name === "Choose...")
            newError.supplier_name = "This field is required"
        if (form.id === "Choose...")
            newError.id = "This field is required";
        if (newError.supplier_name !== '' || newError.class_name !== '' || newError.id !== ''){
            setErrors(newError);
        }
        else{
            const chosen_class = class_options.find(cls => cls.class_name === form.class_name);
            const chosen_supplier = supplier_options.find(supplier => supplier.supplier_name === form.supplier_name);

            const submitForm = {
                id: form.id,
                name: form.name,
                price: form.price,
                amount: form.amount,
                class_id: chosen_class.class_id,
                supplier_id: chosen_supplier.supplier_id
            }

            await axios.put(ITEM, submitForm);
            alert("Update successful!");
            window.location.reload();
        }
    }

    return (
        <div className={'staff-form'}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control as={'select'} id={'id'} onChange={handleChange}>
                        <option>Choose...</option>
                        {item_options.map(item => (
                            <option>{item.item_id}</option>
                        ))}
                    </Form.Control>
                    <div className={'error'}>
                        {errors.id}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control id={'name'} maxLength={25} value={form.name} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control id={'price'} type={'number'} value={form.price} onChange={handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Qty</Form.Label>
                    <Form.Control id={'amount'} type={'number'} value={form.amount} onChange={handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Supplied by</Form.Label>
                    <Form.Control as={'select'} id={'supplier_name'} value={form.supplier_name} onChange={handleChange}>
                        <option>Choose...</option>
                        {supplier_options.map(supplier => (
                            <option>{supplier.supplier_name}</option>
                        ))}
                    </Form.Control>
                    <div className={'error'}>
                        {errors.supplier_name}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Belongs to</Form.Label>
                    <Form.Control as={'select'} id={'class_name'} value={form.class_name} onChange={handleChange}>
                        <option>Choose...</option>
                        {class_options.map(cls => (
                            <option>{cls.class_name}</option>
                        ))}
                    </Form.Control>
                    <div className={'error'}>
                        {errors.class_name}
                    </div>
                </Form.Group>
                <div className={'submit-button'}>
                    <Button type={'submit'}>Update</Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateProductForm;
