import React from 'react';
import {MDBBtn, MDBDataTable} from 'mdbreact';
import table from "../SQL/table";

/*TODO: insert button to the AddToCart column*/

const DatatablePage = () => {
    const data = {
        columns: [
            {
                label: 'Stock Code',
                field: 'StockCode',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Item Description',
                field: 'ItemDes',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Unit Price',
                field: 'UnitPrice',
                sort: 'asc',
                width: 200,
            },
            {
                label: 'In Stock',
                field: 'QUANTITY',
                sort: 'asc',
                width: 100
            }
            // ,
            // {
            //     label: 'Add to Cart',
            //     field: <MDBBtn color="purple" size="sm">Button</MDBBtn>,
            //     sort: 'asc',
            //     width: 150,
            // }
        ],
        rows: table
    };

    return (
        <MDBDataTable
            striped
            bordered
            small
            hover
            theadColor="blue lighten-1"
            data={data}
            btn
            className="blueTable"
        />
    );
}

export default DatatablePage;