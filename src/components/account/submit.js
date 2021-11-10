import React, { useState, useCallback } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const SubmitJoinForm = (params, callback) => {
  let body = Object.create({});
  Object.keys(params).map(key => {
    if (key != 'password_show') {
      body[key] = params[key]
    }
  })

  fetch('http://localhost:3000/v1/amusingxwebapiserv/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(resp => resp.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      let result = {
        succeed: false,
        err_info: {
          code: "C0001",
          message: err,
        },
      };
      callback(result)
    });
}

const SubmitLoginForm = (state, callback) => {
  let body = Object.create({});
  let paramsKey = ["phone", "area_code", "password", "type", "verification_code"]

  for (const key of paramsKey) {
    body[key] = state[key]
  }

  fetch('http://localhost:3000/v1/amusingxwebapiserv/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(resp => resp.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      let result = {
        succeed: false,
        err_info: {
          code: "C0001",
          message: err,
        },
      };
      callback(result)
    });
}

const SubmitResetpasswordForm = (state, callback) => {
  let body = Object.create({});
  Object.keys(state).map(key => {
    if (key != `password_show`) {
      body[key] = state[key]
    }
  })

  console.info("body", body)

  fetch('http://localhost:3000/v1/amusingxwebapiserv/reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(resp => resp.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      let result = {
        succeed: false,
        err_info: {
          code: "C0001",
          message: err,
        },
      };
      callback(result)
    });
}

const RequestData = (url, callback) => {
  fetch(`http://localhost:3000/v1/amusingxwebapiserv/${url}`)
    .then(resp => resp.json())
    .then(data => {
      callback(data)
    }).catch(err => {
      let result = {
        succeed: false,
        err_info: {
          code: "C0001",
          message: err,
        },
      };
      callback(result)
    });
}

export { SubmitJoinForm, SubmitLoginForm, SubmitResetpasswordForm, RequestData }
