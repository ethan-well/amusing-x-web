import React from "react";
import ReactDOM from "react-dom";
import Header from './components/header/header';
import Body from './components/body/body';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <Header/>
    <Body />
  </div>,
  rootElement
);