import React from "react";
import Home from "../components/home/home";
// import Join from "../components/account/join";
import JoinContainer from "../container/account/JoinContainer";
import Login from "../components/account/login";
import FindpasswordContainer from "../components/account/find_password";

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
          <JoinContainer />
        </Route>
        <Route path="/reset_password">
          <FindpasswordContainer />
        </Route>
      </Switch>
    </Router>
  );
}