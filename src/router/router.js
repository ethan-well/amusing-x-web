import React from "react";
import Home from "../components/home/home";
import JoinContainer from "../container/account/JoinContainer";
import Login from "../components/account/login";
import FindPasswordContainer from "../components/account/find_password";
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
        {/* <Route path="/join" element={<Join />} /> */}
        <Route path="/reset_password" element={<FindPasswordContainer />} />
        <Route path="/login/oauth" element={<OAuth />} />
        <Route path="/join" element={<JoinContainer />} />
        <Route path="/reset_password" element={<FindPasswordContainer />} />
      </Routes>
    </Router>
  );
}