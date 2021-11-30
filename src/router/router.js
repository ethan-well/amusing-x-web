import React from "react";
import Home from "../components/home/home";
// import Join from "../components/account/join";
// import JoinContainer from "../container/account/JoinContainer";
import Login from "../components/account/login";
import FindpasswordContainer from "../components/account/find_password";
import Join from "../components/account/join";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function AMSRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        <Route path="/login" element={<Login/>}>
        </Route>
        <Route path="/join" element={<Join />} />
        <Route path="/reset_password" element={<FindpasswordContainer />} />
      </Routes>
    </Router>
  );
}