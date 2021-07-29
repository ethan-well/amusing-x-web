import React, { useState, useCallback } from 'react';
import useFetch, { Provider } from 'use-http'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  codeInputEndAdornment: {
    minWidth: '10ch'
  }
}));

const GetCode = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState({})
  const { get, post, response, loading, error } = useFetch({ data: [] })

  const addNewTodo = useCallback(async () => {
    const newTodo = await get('/verification_code')
    if (response.ok) {
      setTodos(newTodo)
    }
  }, [get, todos, response])

  return (
    <Link component="button" variant="body2" className={classes.codeInputEndAdornment} onClick={addNewTodo}>
      获取验证码
    </Link>
  )
}

const VericationCodeApp = () => (
  <Provider url='http://localhost:3000/v1/amusinguserserv' options={{ cachePolicy: 'no-cache' }}>
    <GetCode />
  </Provider>
)

export default VericationCodeApp;
