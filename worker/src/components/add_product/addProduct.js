import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios  from "axios";
import {CLASS, ITEM, SUPPLIER} from "../../api_config";

const initForm = {
    id: Date.now(),
    name: '',
    price: '',
    amount: '',
    supplier_name: '',
    class_name: ''
}

const AddProductForm = () => {
    const [form, setForm] = useState(initForm);

    const [supplier_options, setSupplierOptions] = useState([]);

    const [class_options, setClassOptions] = useState([]);

    const [errors, setErrors] = useState({
        class_name: '',
        supplier_name: ''
    })

    const handleChange = event => {
        setErrors({class_name: '', supplier_name: ''})
        setForm({...form, [event.target.id]: event.target.value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let newError = {...errors}
        if (form.class_name === "" || form.class_name === "Choose...")
            newError.class_name = "This field is required"
        if (form.supplier_name === "" || form.supplier_name === "Choose...")
            newError.supplier_name = "This field is required"
        if (newError.supplier_name !== '' || newError.class_name !== ''){
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
            await axios.post(ITEM,submitForm);
            alert("Add Successful");
            window.location.reload();
        }
    }

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

    return (
        <div className={'worker-form'}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control id={'id'}
                                  value={form.id}
                                  onChange={handleChange}
                                  disabled
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control id={'name'}
                                  value={form.name}
                                  maxLength={25}
                                  onChange={handleChange}
                                  required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control id={'price'}
                                  type={'number'}
                                  value={form.price}
                                  onChange={handleChange}
                                  required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Qty</Form.Label>
                    <Form.Control id={'amount'}
                                  value={form.amount}
                                  type={'number'}
                                  onChange={handleChange}
                                  required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Supplied by</Form.Label>
                    <Form.Control as={'select'}
                                  id={'supplier_name'}
                                  onChange={handleChange}
                    >
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
                    <Form.Control as={'select'}
                                  id={'class_name'}
                                  onChange={handleChange}
                    >
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
                    <Button type={'submit'}>Add</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProductForm;
