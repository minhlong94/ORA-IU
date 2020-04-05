import React from "react";

class Shipping extends React.Component {

    render() {
        return (
            <form>
                <label>Full name:</label>
                <input type={"text"} id={"fname"} autoCapitalize={"words"}/>
                <br/><br/>
                <label>Phone number:</label>
                <input type={"tel"} id={"pnumber"}/>
                <br/><br/>
                <label>Address:</label>
                <input type={"text"} id={"address"} autoCapitalize={"words"}/>
                <br/><br/>
                <pre>
                    <button type={"button"}>Cancel</button>
                    &nbsp;
                    <input type={"submit"} value={"Ship to this address"}/>
                    <br/>
                </pre>
            </form>
        );
    }
}

export default Shipping;