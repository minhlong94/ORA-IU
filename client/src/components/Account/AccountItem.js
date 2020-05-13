import React from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";

const AccountItem = ({id, bank_name, bank_number}) => {
    return (
        <Card style={{ width: '21rem' }} key={id}>
            <Card.Body>
                <Card.Text>
                    <b>Bank Name:</b> {bank_name}
                </Card.Text>
                <Card.Text>
                    <b>Bank Number:</b> {bank_number}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default AccountItem;
