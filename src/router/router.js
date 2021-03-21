import React from "react";
import Home from "../components/home/home";
import Join from "../components/account/join";
import Login from "../components/account/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

export default function AMSRouter() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
        </Switch>
    </Router>
  );
}