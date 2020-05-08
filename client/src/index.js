import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";

import './index.css';

// The following 3 imports are for CSS of mdbreact
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
      <Router>
          <App />
      </Router>,
  rootElement
);
