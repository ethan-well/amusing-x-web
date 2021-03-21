import React from "react";
import ReactDOM from "react-dom";
import AMSRouter from './router/router';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <AMSRouter />
  </div>,
  rootElement
);