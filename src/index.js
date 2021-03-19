import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import TodoApp from "./TodoApp";

import Test from "./components/Test";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <Test/>
  </div>,
  rootElement
);