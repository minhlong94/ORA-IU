import React from "react";
import "./styles.css";
import "mdbreact/dist/css/mdb.css"
import DatatablePage from './components/ShoppingTable/ShoppingTableSearchBar';

// All changes in UI should be changed here
export default function App() {
  return (
      <div>
        <DatatablePage />
      </div>
  );
}
