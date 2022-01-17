import React, { useState, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginOAuth, RequestData } from "./submit";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function OAuth(props) {
  let query = useQuery();
  let navigate = useNavigate();

  const [result, setValues] = useState({
    provider: "",
    code: "",
  });

  const loginOAuthCallback = (resp) => {
    if (resp.succeed) {
      navigate("/", resp);
    } else {
      navigate("/login", resp);
    }
  };

  let loginOAuth = {
    provider: "github",
    code: query.get("code"),
    service: "amusingx",
  };

  useEffect(() => {
    LoginOAuth(loginOAuth, loginOAuthCallback);
  });

  return <React.Fragment></React.Fragment>;
}

function Onload({ code }) {
  return (
    <div>{code ? <OnSucceed code={code} /> : <OnFailed code={code} />}</div>
  );
}

function OnSucceed({ code }) {
  return (
    <React.Fragment>
      <h3>登录成功 {code}</h3>
    </React.Fragment>
  );
}

function OnFailed() {
  return <React.Fragment>登录失败</React.Fragment>;
}
