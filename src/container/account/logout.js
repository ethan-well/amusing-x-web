import React, { useState } from "react";
import { RequestData } from "../../components/account/submit";

export default function Logout() {
  const LogoutCallback = (data) => {
    console.log(data);
  }

  RequestData(process.env.REACT_APP_EUROPA_LOGOUT, LogoutCallback);
}