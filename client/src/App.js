import React, {useState} from "react";

import Routes from "./Routes";
import NavigationBar from "./components/Utils/NavigationBar";
import {UserContext} from "./context";

import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

function App() {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        user_id: '',
        username: '',
        first_name: '',
        last_name: ''
    })
    return (
        <div className="App">
            <UserContext.Provider value={{validated, setValidated, user, setUser}}>
                <NavigationBar/>
                <Routes/>
            </UserContext.Provider>
        </div>
    );
}


export default App;