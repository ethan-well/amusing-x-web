import React, { useState, useReducer, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {LoginOAuth, RequestData} from "./submit";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export default function OAuth(props) {
    let query = useQuery();

    const [result, setValues] = useState({
        provider: '',
        code: '',
    });

    const loginOAuthCallback = (resp) => {
        console.log(resp)
    }

    let loginOAuth = {"provider": "github", "code":  query.get("code") }

    useEffect(() => {
        LoginOAuth(loginOAuth, loginOAuthCallback);
        RequestData("pong", loginOAuthCallback);
    });

    return (
        <React.Fragment>
         </React.Fragment>
    )
}

function Onload({code }) {
    return (
      <div>
        {code ? (
            <OnSucceed code={code} />
        ) : (
            <OnFailed code={code} />
        )}
      </div>
    );
}

function OnSucceed({code }) {
    return (
        <React.Fragment>
            <h3>
                登录成功 {code}
            </h3>
        </React.Fragment>
    )
}

function OnFailed() {
    return (
        <React.Fragment>
            登录失败
        </React.Fragment>
    );
}