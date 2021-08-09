import React, { useState, useCallback } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const SubmitJoinForm = (params, callback) => {
  let body = Object.create({});
  Object.keys(params).map(key => {
    body[key] = params[key].value
  })

  fetch('http://localhost:3000/v1/amusinguserserv/join', {
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

  fetch('http://localhost:3000/v1/amusinguserserv/login', {
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

const SubmitResetPasswordForm = (state, callback) => {
  let body = Object.create({});
  Object.keys(state).map(key => {
    body[key] = state[key].value
  })

  fetch('http://localhost:3000/v1/amusinguserserv/reset_password', {
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
  fetch(`http://localhost:3000/v1/amusinguserserv/${url}`)
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

export { SubmitJoinForm, SubmitLoginForm, SubmitResetPasswordForm, RequestData }
