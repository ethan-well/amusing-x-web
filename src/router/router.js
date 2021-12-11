import React from "react";
import Home from "../components/home/home";
// import Join from "../components/account/join";
// import JoinContainer from "../container/account/JoinContainer";
import Login from "../components/account/login";
import FindpasswordContainer from "../components/account/find_password";
import Join from "../components/account/join";
import OAuth from "../components/account/oauth";
import OAuthLogin from "../components/account/oauth_login";

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
        <Route path="/login" element={<OAuthLogin/>}>
        </Route>
        <Route path="/join" element={<Join />} />
        <Route path="/reset_password" element={<FindpasswordContainer />} />
        <Route path="/login/oauth" element={<OAuth />} />
      </Routes>
    </Router>
  );
}