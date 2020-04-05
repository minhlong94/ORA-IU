import React from 'react';

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
}