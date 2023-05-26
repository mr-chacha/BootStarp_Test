import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./Router/Router";
import { Provider } from "mobx-react";
import dataStore from "./store";
export default function App() {
  return (
    <Provider dataStore={dataStore}>
      <Router />;
    </Provider>
  );
}
