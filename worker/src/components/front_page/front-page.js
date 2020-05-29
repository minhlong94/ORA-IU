import React from 'react';
import {Button} from "react-bootstrap";

const FrontPage = () => {
    return (
        <div className={'front-page'}>
            <Button type={'click'} onClick={() => window.location.replace('/add-product')}>Add new product...</Button>{' '}
            <Button type={'click'} onClick={() => window.location.replace('/add-supplier')}>
                Add Supplier...
            </Button>{' '}
            <Button type={'click'} onClick={() => window.location.replace('/add-class')}>
                Add Category...
            </Button>{' '}
            <Button type={'click'}
                    onClick={() => window.location.replace('/query')}>
                Custom Query...
            </Button>
        </div>

    );
};

export default FrontPage;
