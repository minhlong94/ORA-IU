import React from 'react';
import {MDBDataTable} from 'mdbreact';
import table from "../SQL/table";

/*
   * mdbreact table
   * @param label {string}: name of the column
   * @param field {string}: name of the associated field in JSON file, contains cell data
   * @param sort {string}: sort order, 'asc' or 'desc'
   * @param width {int}: width of the column
 */
const DatatablePage = () => {
    const data = {
        columns: [
            {
                label: 'Stock Code', // Column's name
                field: 'StockCode', // json attribute
                sort: 'asc', // ascending sort
                width: 150 // width of the column
            },
            {
                label: 'Item Description',
                field: 'ItemDes',
                sort: 'asc',
                width: 200
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
        ],
        rows: table
    };

    // https://mdbootstrap.com/docs/react/tables/datatables/#docsTabsAPI
    return (
        <MDBDataTable
            bordered
            small
            data={data}
            btn
            noBottomColumns={true}
            className='blueTable'
        />
    );
};
/*
    Comment className row to disable sync with CSS
 */
export default DatatablePage;