import React from 'react';
<<<<<<< Updated upstream

export default class ShoppingTable extends React.Component {
    render() {
        return(
        <table class="blueTable">
            <thead>
            <tr>
                <th>head1</th>
                <th>head2</th>
                <th>head3</th>
                <th>head4</th>
                <th>head5</th>
                <th>head6</th>
                <th>head7</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <td colspan="7">
                    <div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a
                        href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
                </td>
            </tr>
            </tfoot>
            <tbody>
            <tr>
                <td>cell1_1</td>
                <td>cell2_1</td>
                <td>cell3_1</td>
                <td>cell4_1</td>
                <td>cell5_1</td>
                <td>cell6_1</td>
                <td>cell7_1</td>
            </tr>
            <tr>
                <td>cell1_2</td>
                <td>cell2_2</td>
                <td>cell3_2</td>
                <td>cell4_2</td>
                <td>cell5_2</td>
                <td>cell6_2</td>
                <td>cell7_2</td>
            </tr>
            <tr>
                <td>cell1_3</td>
                <td>cell2_3</td>
                <td>cell3_3</td>
                <td>cell4_3</td>
                <td>cell5_3</td>
                <td>cell6_3</td>
                <td>cell7_3</td>
            </tr>
            <tr>
                <td>cell1_4</td>
                <td>cell2_4</td>
                <td>cell3_4</td>
                <td>cell4_4</td>
                <td>cell5_4</td>
                <td>cell6_4</td>
                <td>cell7_4</td>
            </tr>
            </tbody>
        </table>
        )
    }
=======
import table from "../SQL/table";
import { useTable, usePagination } from 'react-table';

/*Forked from https://github.com/tannerlinsley/react-table/tree/master/examples/pagination */

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
      {/*<pre>*/}
      {/*  <code>*/}
      {/*    {JSON.stringify(*/}
      {/*        {*/}
      {/*            pageIndex,*/}
      {/*            pageSize,*/}
      {/*            pageCount,*/}
      {/*            canNextPage,*/}
      {/*            canPreviousPage,*/}
      {/*        },*/}
      {/*        null,*/}
      {/*        2*/}
      {/*    )}*/}
      {/*  </code>*/}
      {/*</pre>*/}
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
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
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
                        style={{ width: '100px' }}
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

    const data = table;

    return (
            <Table columns={columns} data={data} />
    )
>>>>>>> Stashed changes
}