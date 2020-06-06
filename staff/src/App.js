import React from 'react';
import './App.css';
import FrontPage from "./components/front_page/front-page";
import 'bootstrap/dist/css/bootstrap.css';
import Routes from "./Routes";

function App() {
    return (
        <div className="App">
            <FrontPage/>
            <Routes/>
        </div>
    );
}

export default App;
