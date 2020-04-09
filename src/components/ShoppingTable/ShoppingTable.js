import React from 'react';
import table from "../SQL/table";
import {useTable, usePagination} from 'react-table';
import cart from "../Static/126083.png";

/* Deprecated */

/*Forked from https://github.com/tannerlinsley/react-table/tree/master/examples/pagination */
const cartImage = () => {
    return <img src={cart} />
}

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table class="blueTable" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell,i) => {
                                return i < 4 ?
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    : <button className="addToCart">AddToCart{cartImage()}</button>
                            })
                            }
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                {' '}
                <span>
          Page{' '}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                <span>
          | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '100px'}}
                    />
        </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default function ShoppingTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Shopping Table",
                columns: [
                    {
                        Header: 'Stock Code',
                        accessor: 'StockCode',
                    },
                    {
                        Header: 'Item Name',
                        accessor: 'ItemDes',
                    },
                    {
                        Header: 'Unit Price',
                        accessor: 'UnitPrice',
                    },
                    {
                        Header: 'In Stock',
                        accessor: 'QUANTITY',
                    },
                    {
                        Header: 'Add to cart',
                        accessor: null,
                    }
                ],
            }
        ],
        []
    )
    return (
        <Table columns={columns} data={table}/>
    )
}