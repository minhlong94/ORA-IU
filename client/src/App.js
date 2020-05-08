import React from "react";
import Routes from "./Routes";

import "./App.css";
import NavigationBar from "./components/Utils/NavigationBar";

function App() {
    return (
        <div className="App container">
            <NavigationBar/>
            <Routes />
        </div>
    );
}

export default App;